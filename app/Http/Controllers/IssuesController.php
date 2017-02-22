<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;
    
class IssuesController extends Controller
{
    private $storage_root = "public/broadway-tei/tei/";
    private $file_prefix  = "BroadwayJournal_";
    private $uri          = "/broadwayjournal/issue/";

    function index($year = NULL, $month = NULL, $day = NULL){
        $issues = $this->getIssues($year, $month, $day);
        return response()->json($issues);
    }

    function show($year, $month, $day){
        $id = $year . $month . $day;

	$url = 'app/public/broadway-tei/tei/' . $this->getFilenameForID($id);
	$xml = Storage::get($this->getFilePathForID($id));
	return response()->file(storage_path($url));
    }

    private function getFilenameForID($id){
      return $this->file_prefix . $id . '.xml';
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
        $date  = $this->timestampForID($id);
        $uri   = $this->teiForID($id, 'uri');
        $path  = $this->teiForID($id, 'path');
        $out[] = compact('date', 'uri', 'path');
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
}
