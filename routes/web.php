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

Route::get('/about', function () {
    return view('welcome',[
    	'route'=>'context-about'
    	]);
});

Route::get('/technical', function () {
    return view('welcome',[
    	'route'=>'context-technical'
    	]);
});

Route::get('/credits', function () {
    return view('welcome',[
    	'route'=>'context-credits'
    	]);
});

Route::get('/api/personography/summary', 'PersonographyController@summary');

Route::get('/issue-01-04-45', function () {
    return view('welcome',['route'=>'issue-01-04-45']);
});
Route::get('/issue-01-11-45', function () {
    return view('welcome',['route'=>'issue-01-11-45']);
});
Route::get('/issue-01-18-45', function () {
    return view('welcome',['route'=>'issue-01-18-45']);
});
Route::get('/issue-01-25-45', function () {
    return view('welcome',['route'=>'issue-01-25-45']);
});
Route::get('/issue-02-01-45', function () {
    return view('welcome',['route'=>'issue-02-01-45']);
});
Route::get('/issue-02-08-45', function () {
    return view('welcome',['route'=>'issue-02-08-45']);
});
Route::get('/issue-02-15-45', function () {
    return view('welcome',['route'=>'issue-02-15-45']);
});
Route::get('/issue-02-22-45', function () {
    return view('welcome',['route'=>'issue-02-22-45']);
});
Route::get('/issue-03-01-45', function () {
    return view('welcome',['route'=>'issue-03-01-45']);
});
Route::get('/issue-03-08-45', function () {
    return view('welcome',['route'=>'issue-03-08-45']);
});
Route::get('/issue-03-15-45', function () {
    return view('welcome',['route'=>'issue-03-15-45']);
});
Route::get('/issue-03-22-45', function () {
    return view('welcome',['route'=>'issue-03-22-45']);
});
Route::get('/issue-03-29-45', function () {
    return view('welcome',['route'=>'issue-03-29-45']);
});
Route::get('/issue-04-05-45', function () {
    return view('welcome',['route'=>'issue-04-05-45']);
});
Route::get('/issue-04-12-45', function () {
    return view('welcome',['route'=>'issue-04-12-45']);
});
Route::get('/issue-04-19-45', function () {
    return view('welcome',['route'=>'issue-04-19-45']);
});
Route::get('/issue-04-26-45', function () {
    return view('welcome',['route'=>'issue-04-26-45']);
});
Route::get('/issue-05-03-45', function () {
    return view('welcome',['route'=>'issue-05-03-45']);
});
Route::get('/issue-05-10-45', function () {
    return view('welcome',['route'=>'issue-05-10-45']);
});
Route::get('/issue-05-17-45', function () {
    return view('welcome',['route'=>'issue-05-17-45']);
});
Route::get('/issue-05-24-45', function () {
    return view('welcome',['route'=>'issue-05-24-45']);
});
Route::get('/issue-05-31-45', function () {
    return view('welcome',['route'=>'issue-05-31-45']);
});
Route::get('/issue-06-07-45', function () {
    return view('welcome',['route'=>'issue-06-07-45']);
});
Route::get('/issue-06-14-45', function () {
    return view('welcome',['route'=>'issue-06-14-45']);
});
Route::get('/issue-06-21-45', function () {
    return view('welcome',['route'=>'issue-06-21-45']);
});
Route::get('/issue-06-28-45', function () {
    return view('welcome',['route'=>'issue-06-28-45']);
});
Route::get('/issue-07-12-45', function () {
    return view('welcome',['route'=>'issue-07-12-45']);
});
Route::get('/issue-07-19-45', function () {
    return view('welcome',['route'=>'issue-07-19-45']);
});
Route::get('/issue-07-26-45', function () {
    return view('welcome',['route'=>'issue-07-26-45']);
});
Route::get('/issue-08-02-45', function () {
    return view('welcome',['route'=>'issue-08-02-45']);
});
Route::get('/issue-08-09-45', function () {
    return view('welcome',['route'=>'issue-08-09-45']);
});
Route::get('/issue-08-16-45', function () {
    return view('welcome',['route'=>'issue-08-16-45']);
});
Route::get('/issue-08-23-45', function () {
    return view('welcome',['route'=>'issue-08-23-45']);
});
Route::get('/issue-08-30-45', function () {
    return view('welcome',['route'=>'issue-08-30-45']);
});
Route::get('/issue-09-06-45', function () {
    return view('welcome',['route'=>'issue-09-06-45']);
});
Route::get('/issue-09-13-45', function () {
    return view('welcome',['route'=>'issue-09-13-45']);
});
Route::get('/issue-09-20-45', function () {
    return view('welcome',['route'=>'issue-09-20-45']);
});
Route::get('/issue-09-27-45', function () {
    return view('welcome',['route'=>'issue-09-27-45']);
});
Route::get('/issue-10-04-45', function () {
    return view('welcome',['route'=>'issue-10-04-45']);
});
Route::get('/issue-10-11-45', function () {
    return view('welcome',['route'=>'issue-10-11-45']);
});
Route::get('/issue-10-18-45', function () {
    return view('welcome',['route'=>'issue-10-18-45']);
});
Route::get('/issue-10-25-45', function () {
    return view('welcome',['route'=>'issue-10-25-45']);
});
Route::get('/issue-11-01-45', function () {
    return view('welcome',['route'=>'issue-11-01-45']);
});
Route::get('/issue-11-08-45', function () {
    return view('welcome',['route'=>'issue-11-08-45']);
});
Route::get('/issue-11-15-45', function () {
    return view('welcome',['route'=>'issue-11-15-45']);
});
Route::get('/issue-11-22-45', function () {
    return view('welcome',['route'=>'issue-11-22-45']);
});
Route::get('/issue-11-29-45', function () {
    return view('welcome',['route'=>'issue-11-29-45']);
});
Route::get('/issue-12-06-45', function () {
    return view('welcome',['route'=>'issue-12-06-45']);
});
Route::get('/issue-12-13-45', function () {
    return view('welcome',['route'=>'issue-12-13-45']);
});
Route::get('/issue-12-20-45', function () {
    return view('welcome',['route'=>'issue-12-20-45']);
});
Route::get('/issue-12-27-45', function () {
    return view('welcome',['route'=>'issue-12-27-45']);
});
Route::get('/issue-01-03-46', function () {
    return view('welcome',['route'=>'issue-01-03-46']);
});
