<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;
    
class PersonographyController extends Controller
{

    public function summary(){
        return response()->file(storage_path('app/public/personography.html'));
    }

}