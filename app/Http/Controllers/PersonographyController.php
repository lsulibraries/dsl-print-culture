<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;
    
class PersonographyController extends Controller
{

    public function summary() {
        return response()->file(storage_path('app/public/personography.xml'));
    }
    public function summary_json() {
        $file = file_get_contents(storage_path('app/public/personography-json.xml'));
        $xml  = simplexml_load_string($file);
        return response()->json($xml);
    }

}