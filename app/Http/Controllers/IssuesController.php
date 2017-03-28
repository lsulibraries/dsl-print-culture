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

    function show($year, $month, $day){
        $id = $year . $month . $day;

	$url = 'app/public/broadway-tei/tei/' . $this->getFilenameForID($id);
	$xml = Storage::get($this->getFilePathForID($id));
	return response()->file(storage_path($url));
    }

    function toc($year, $month, $day){
        $id  = $year . $month . $day;
        $xml = new \SimpleXMLElement(
            Storage::get($this->getFilePathForID($id))
        );
        $toc = [];
//        foreach($xml->xpath("//bibl[@type='section']") as $section){
        foreach($xml->teiHeader->fileDesc->sourceDesc->listBibl->bibl as $bibl){
            $toc[] = (string)$bibl->title;
        }
        return response()->json($toc);
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

    public function pdf($year, $month, $day) {
        $pdf = Storage::url("BroadwayJournal_18450201.pdf");
        return <<<EOF
<html>
<head><title>hello</title></head>
<body>

<script src="//mozilla.github.io/pdf.js/build/pdf.js"></script>

<h1>PDF.js 'Hello, world!' example</h1>
<canvas id="the-canvas"></canvas>
<script>
// If absolute URL from the remote server is provided, configure the CORS
// header on that server.

var url = '$pdf';
console.log('$pdf');

// var pdfData = atob($pdf);

// Disable workers to avoid yet another cross-origin issue (workers need
// the URL of the script to be loaded, and dynamically loading a cross-origin
// script does not work).
// PDFJS.disableWorker = true;

// The workerSrc property shall be specified.
PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

// Asynchronous download of PDF
var loadingTask = PDFJS.getDocument(url);
loadingTask.promise.then(function(pdf) {
  console.log('PDF loaded');
  
  // Fetch the first page
  var pageNumber = 1;
  pdf.getPage(pageNumber).then(function(page) {
    console.log('Page loaded');
    
    var scale = 1.5;
    var viewport = page.getViewport(scale);

    // Prepare canvas using PDF page dimensions
    var canvas = document.getElementById('the-canvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);
    renderTask.then(function () {
      console.log('Page rendered');
    });
  });
}, function (reason) {
  // PDF loading error
  console.error(reason);
});

</script>
</body>
</html>

EOF;

    }

}
