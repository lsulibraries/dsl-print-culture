<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return view('welcome',[
    	'route'=>'welcome'
    	]);
});

Route::get('/broadwayjournal/issue/{year}/{month}/{day}/pdf', 'IssuesController@pdf');

Route::get('/broadwayjournal/issues/{year?}/{month?}/{day?}', 'IssuesController@index');

Route::get('/broadwayjournal/issue/{year}/{month}/{day}/{format}', 'IssuesController@download');

Route::get('/api/broadwayjournal/{id}/toc', 'IssuesController@toc');

Route::get('/api/broadwayjournal/{id}/bibl_data', 'IssuesController@bibl_data');

Route::get('/api/broadwayjournal/{id}/ppm', 'IssuesController@ppm');

Route::get('/api/broadwayjournal/{id}/issue-text', 'IssuesController@issueText');

Route::get('/api/broadwayjournal/{id}/piece-text/{pid}', 'IssuesController@pieceText');

Route::get('/broadwayjournal/', function () {
 	return "<html><head/><body><script type='text/javascript'>
	       
	       var xhttp =  new XMLHttpRequest();
	       var data = [];
	       xhttp.onreadystatechange = function() {
    	         if (this.readyState == 4 && this.status == 200) {
		     data = JSON.parse(this.responseText);

	             for(i = 0; i < data.length; i++){
	               var row = data[i];
		       for(var key in row){
		          console.log(row[key]);
                     }
	       	   }
    		 }
  	       };
	       xhttp.open('GET', '/broadwayjournal/issues', true);
	       xhttp.send();  
	       

</script></body></html>";
});

Route::get('/api/all-issues/json', 'IssuesController@all_json');

Route::get('/api/all-issues-grouped/json', 'IssuesController@all_grouped_json');

Route::get('/api/personography/summary/json', 'PersonographyController@summary_json');

Route::get('/api/personography/summary', 'PersonographyController@summary');

Route::get('/api/issue/search/{searchString}', 'IssuesController@search');

Route::get('/issue-{month}-{day}-{year}', 'IssuesController@mainWindow');

Route::get('/author-{authID}', 'PersonographyController@authorNav');
