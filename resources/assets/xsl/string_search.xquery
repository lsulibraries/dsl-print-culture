declare namespace xs = "http://www.w3.org/2001/XMLSchema";
declare variable $search_string as xs:string+ external;

<searchResults>

{

(: fake search_string for testing... :)
(: let $search_string := 'bishop' :)

(: match search string within text :)
for $issue in collection('issue_text')
for $text in $issue//text()[not(parent::div[@class='biblTitle'])] 
where contains(upper-case($text),upper-case($search_string))

(: get identifying metadata :)
let $piece := $text/ancestor::div[@class='piece' or @class='section'][1]
let $issueId := $issue//div[@class='issueId']/text()
let $pieceId := substring-after($piece/@id,'#')
let $pieceTitle := $piece/div[@class='biblTitle']/text()

(: calculate pdfIndex :)
let $page1 := xs:integer($issue//div[@id = '#p1']/div[@class='biblPage']) - 1
let $pdfIndex := xs:integer($piece/div[@class='biblPage']) - $page1    
        
(: calculate context to show :)    
let $hitBegin := string-length(substring-before(upper-case($text),upper-case($search_string))) + 1
let $hitLength := string-length($search_string)
let $beforeBegin := 
    if ($hitBegin > 100) then $hitBegin - 100
    else 1
let $beforeLength := $hitBegin - $beforeBegin
let $afterBegin := $hitBegin + $hitLength
let $afterLength := 200 - $beforeLength


let $contextBefore :=
    substring($text,$beforeBegin,$beforeLength)
let $searchHit := 
    substring($text,$hitBegin,$hitLength)
let $contextAfter := 
    substring($text,$afterBegin,$afterLength)

(: return search results list :)
return 
    <searchResult>
        <issueMeta>
            <issueId>{$issueId}</issueId>
        </issueMeta>
        <pieceMeta>
            <pieceId>{$pieceId}</pieceId>
            <piecePdfIndex>{$pdfIndex}</piecePdfIndex>
            <pieceTitle>{$pieceTitle}</pieceTitle>
        </pieceMeta>
        <context>...{$contextBefore}<span class='searchHit'>{$searchHit}</span>{$contextAfter}...</context>
        
    </searchResult>
}

</searchResults>