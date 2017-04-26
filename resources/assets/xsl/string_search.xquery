declare default element namespace "http://www.tei-c.org/ns/1.0";
(:declare namespace functx = "http://www.functx.com";:)



<searchResults>

{
for $issue in collection('Issues')
for $piece in $issue//body/div[@decls]//text()
let $issueId := $issue/TEI/teiHeader/fileDesc/publicationStmt/idno/text()
let $pieceId := substring-after($piece/ancestor::div[@decls][1]/@decls,'#')

    for $bibl in $issue//listBibl//bibl where $bibl/@xml:id eq $pieceId
    let $pieceTitle := $bibl/title/text()
        
let $search_string := 'Bishop'
where fn:contains(upper-case($piece),upper-case($search_string))
return 
    <searchResult>
        <issueMeta>
            <issueId>{$issueId}</issueId>
        </issueMeta>
        <pieceMeta>
            <pieceId>{$pieceId}</pieceId>
            <pieceTitle>{$pieceTitle}</pieceTitle>
        </pieceMeta>
        <context>...</context>
    </searchResult>
}

</searchResults>