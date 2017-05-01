declare default element namespace "http://www.tei-c.org/ns/1.0";

<issue>
  <mentionList>  
{
for $person in //body//persName[@ref][not(parent::byline)]
let $personId := substring-after($person/@ref, '#')
group by $personId
let $personography := document(

return

    element {$personId}
    {''}
    
    
}
    </mentionList>
</issue>