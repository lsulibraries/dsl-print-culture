<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;
    
class IssuesController extends Controller
{
    private $storage_root = "public/broadway-tei/tei/";
    private $file_prefix  = "BroadwayJournal_";
    private $uri          = "/broadwayjournal/issue/";


    function mainWindow($month, $day, $year){
            return view('welcome',['route' => "issue-$month-$day-$year"]);
    }
    
    function index($year = NULL, $month = NULL, $day = NULL){
        $issues = $this->getIssues($year, $month, $day);
        return response()->json($issues);
    }

    function issueHeader($issueId) {
        $xml = simplexml_load_string(Storage::get("public/bibl/BroadwayJournal_$issueId.xml"));
        return response()->json($xml);        
    }
    
    function all_json($year = NULL, $month = NULL, $day = NULL){
        $issues = $this->getIssues($year, $month, $day);
        return response()->json($issues);
    }

    function abouts($about){
        if(!in_array($about, array('about', 'tech', 'credits', 'personography'))){
            return "No data found for $about";
        }
        if($about == 'credits'){
            return $this->credits();
        }
        $xml = Storage::get('public/broadway-tei/projectInfo/' .$about. '.html');
        return $xml;// response()->json($toc);        
    }
    
    function credits(){
        $xml = simplexml_load_string(Storage::get('public/credits.xml'));
        return response()->json($xml);
    }

    function search($searchString){
        $outfile = '/tmp/results.xml';
        $cmd = "sh " . storage_path('app/public/search.sh') . " " . $outfile . " " . $searchString;
        exec($cmd);
        $xml = simplexml_load_string(file_get_contents('/tmp/results.xml'));
        return response()->json($xml);
    }
    
    function download($year, $month, $day, $format){
        $fileFormat = $format == 'tei' ? 'xml' : $format;
        $id = $year . $month . $day;
            $url = "app/public/broadway-tei/$format/" . $this->getFilenameForID($id,$fileFormat);
            $xml = Storage::get($this->getFilePathForID($id));
            return response()->file(storage_path($url));
    }

    function all_grouped_json($year = NULL, $month = NULL, $day = NULL){
        $issues = $this->getIssues($year, $month, $day);
        $ret = array();
        $out = '';
        foreach($issues as $issue){
            $year  = substr($issue, 0, 4);
            $month = substr($issue, 4, 2);
            $d   = substr($issue, 6, 2);

            if(!array_key_exists($year, $ret)){
                $ret[$year] = array();
            }
            if(!array_key_exists($month, $ret[$year])){
                $ret[$year][$month] = array();
            }
            $ret[$year][$month][] = $d;
        }
        return response()->json($ret);
    }
    
    function toc($id){
        $xml = simplexml_load_string(Storage::get('public/bibl/' . $this->getFilenameForID($id)));
        return response()->json($xml);// response()->json($toc);
    }

    function bibl_data($id){
        $xml = simplexml_load_string(Storage::get('public/bibl/' . $this->getFilenameForID($id)));
        return response()->json($xml);// response()->json($toc);
    }

    function ppm($id){
        $xml = simplexml_load_string(Storage::get('public/bibl/' . $this->getFilenameForID($id)));
        return response()->json($xml);// response()->json($toc);
    }
        
    function issueText($id){
        $xml = Storage::get('public/issues/' . $this->getFilenameForID($id));
        return $xml;
    }

    function issueMasthead($id){
        $xml = Storage::get('public/masthead/' . $this->getFilenameForID($id));
        return $xml;
    }
    
    function pieceText($id, $pid){
        $issue =  simplexml_load_string(Storage::get('public/issues/' . $this->getFilenameForID($id)));
        $piece = $issue->xpath("//div[@id='#$pid']");
        $txt   = '';
        foreach($piece as $pisces){
            $txt .= $pisces->asXML();
        }
        return response($txt);
    }
    
    private function getFilenameForID($id, $format = 'xml'){
      return $this->file_prefix . $id . '.' . $format;
    }

    private function getFilePathForID($id){
      return $this->storage_root . $this->getFilenameForID($id);
    }

    private function getIssues($year = '', $month = '', $day = ''){
      $issues = Storage::files($this->storage_root);
      $filter = $year.$month.$day;
      $out = [];

      foreach($issues as $issue_path) {
        $id = $this->parseFileNameForID($issue_path);
        if(strlen($filter) && !strstr($id, $filter)){
          continue;
        }
        $out[] = $id;
      }
      return $out;
    }

    private function teiForID($id, $mode){
      if($mode === 'path'){
        return $this->getFilePathForID($id);
      }
      return $this->uri . implode('/', $this->parseIssueIDForDateParts($id));
    }
    
    private function timestampForID($id){
      list($year, $month, $day) = $this->parseIssueIDForDateParts($id);
      return mktime(0, 0, 0, $month, $day, $year);
    }
    
    private function parseIssueIDForDateParts($id){
        $year  = substr($id, 0, 4);
        $month = substr($id, 4, 2);
        $day   = substr($id, 6, 2);
        return array($year, $month, $day);
    }

    private function parseFileNameForID($filename){
      return explode('.', explode('_', $filename)[1])[0];
    }

    public function pdf($year, $month, $day) {
        
        $pdf = Storage::url("BroadwayJournal_$year$month$day.pdf");
        return view('welcome', ['pdf' => $pdf, 'route' => 'hello ROUTE']);
    }

}
