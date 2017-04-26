
<searchResults>

{
for $issue in collection('issue_text')
for $piece in $issue//div[@class='piece' or @class='section']
for $text in $piece//text()
let $issueId := $issue//div[@class='issueId']/text()
let $pieceId := substring-after($piece/@id,'#')
let $pieceTitle := $piece/div[@class='biblTitle']/text()
        
let $search_string := 'Bishop'
where contains(upper-case($text),upper-case($search_string))

    let $posBegin :=  
        string-length(substring-before($text, $search_string)) + 1
    let $posEnd :=
        string-length(substring-before($text, $search_string)) +
        string-length($search_string)
    let $contextBegin := $posBegin - 100
    let $contextEnd := $posEnd + 100
    let $context :=
        substring($text,$contextBegin,$contextEnd)
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