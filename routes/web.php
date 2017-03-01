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
  return view('welcome');
});

Route::get('/broadwayjournal/issues/{year?}/{month?}/{day?}', 'IssuesController@index');

Route::get('/broadwayjournal/issue/{year}/{month}/{day}', 'IssuesController@show');

Route::get('/broadwayjournal/issue/{year}/{month}/{day}/toc', 'IssuesController@toc');

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