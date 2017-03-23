<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;
    
class PersonographyController extends Controller
{

    public function summary(){
        $dummyData = array(
            'jaddison' => array(
                'role' => 'm',
                'name' => 'Joseph Addison',
                'viaf' => 'http://viaf.org/viaf/7413288',
                'dob'  => '1672-05-01',
                'pob'  => 'Milston, England',
                'dod'  => '1719-06-17',
                'pod'  => 'Kensington, England',
                'numm' => 10,
                'numc' => 1,
                'note' => "An English essayist, poet, playwright, and politician. He founded 'The Spectator' magazine with Richard Steele.",
            ),
            'dadee' => array(
                'role' => 'm',
                'name' => 'Daniel Adee',
                'viaf' => 'http://viaf.org/viaf/22000087',
                'dob'  => '1819',
                'pob'  => 'Pleasant Valley, New York',
                'dod'  => '1892',
                'pod'  => 'New York',
                'numm' => 6,
                'numc' => 0,
                'note' => "A printer in New York, and involved with the New York Press, possibly as editor. He published Newton's 'Principia' and Maunder's 'Treasury of History.'",
            ),
            'whainsworth' => array(
                'role' => 'm',
                'name' => 'William Harrison Ainsworth',
                'viaf' => 'http://viaf.org/viaf/46894596',
                'dob'  => '1805-02-04',
                'pob'  => 'Manchester, England',
                'dod'  => '1882-01-03',
                'pod'  => 'Reigate, England',
                'numm' => 2,
                'numc' => 0,
                'note' => "An English historical novelist. He wrote the novel 'Rookwood,' along with 39 others, and he created 'Ainsworth's Magazine' with illustrator George Cruikshank.",
            ),
            'alolo' => array(
                'role' => 'c',
                'name' => 'Alolo',
                'viaf' => '',
                'dob'  => '',
                'pob'  => '',
                'dod'  => '',
                'pod'  => '',
                'numm' => 1,
                'numc' => 2,
                'note' => "",
            ),
            'pbenjamin' => array(
                'role' => 'c',
                'name' => 'Park Benjamin Sr.',
                'viaf' => 'http://viaf.org/viaf/48313754',
                'dob'  => '1808-08-14',
                'pob'  => 'Demerara, British Guiana',
                'dod'  => '1864-09-12',
                'pod'  => 'Long Island, New York',
                'numm' => 11,
                'numc' => 5,
                'note' => "An American poet, journalist, editor, and founder of several newspapers. He partnered with Rufus Wilmot Griswold to produce 'The Evening Tattler,' and he helped to found 'The New World.' He was friends with Poe.",
            ),
        );
        return response()->json($dummyData);
    }

}