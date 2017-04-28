<credits>
    <personList>
{
for $person in doc('storage/app/public/personography-json.xml')/personography/credits/*
let $personName := $person/personMeta/personName
let $personBio := $person/personMeta/personBio
return
    (element {node-name($person)}
        {<personMeta>
            {$personName}
            {$personBio}
        </personMeta>})  
        
}
    </personList>
</credits>