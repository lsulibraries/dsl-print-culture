declare namespace xs = "http://www.w3.org/2001/XMLSchema";
declare variable $search_string as xs:string+ external;

<searchResults>

{
(: get search string input == PLACEHOLDER :)
(:let $search_string := 'Bishop' :)

(: match search string within text :)
for $issue in collection('issue_text')
for $text in $issue//text()[not(parent::div[@class='biblTitle'])] 
where contains(upper-case($text),upper-case($search_string))

(: get identifying metadata :)
let $piece := $text/ancestor::div[@class='piece' or @class='section'][1]
let $issueId := $issue//div[@class='issueId']/text()
let $pieceId := substring-after($piece/@id,'#')
let $pieceTitle := $piece/div[@class='biblTitle']/text()
    
(: calculate context to show :)    
let $posBegin :=  
    string-length(substring-before($text, $search_string)) + 1
let $posEnd :=
    string-length(substring-before($text, $search_string)) +
    string-length($search_string)
let $contextStart := 
    if ($posBegin > 100) then $posBegin - 100
    else 1
let $contextLength := 
    string-length($search_string) + 200
let $context :=
    substring($text,$contextStart,$contextLength)

(: return search results list :)
return 
    <searchResult>
        <issueMeta>
            <issueId>{$issueId}</issueId>
        </issueMeta>
        <pieceMeta>
            <pieceId>{$pieceId}</pieceId>
            <pieceTitle>{$pieceTitle}</pieceTitle>
        </pieceMeta>
        <context>...{$context}...</context>
    </searchResult>
}

</searchResults>