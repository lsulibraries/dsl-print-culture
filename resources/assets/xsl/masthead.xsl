<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs xsl">
    
    <xsl:output omit-xml-declaration="yes" method="xhtml" indent="yes" />
    
    <xsl:variable name="personography" select="document('personography.xml')"/>
    
    <xsl:template match="/">    
        <div>
            <div class="issueId">
                <xsl:apply-templates select="TEI/teiHeader/fileDesc/publicationStmt/idno"/>
            </div>
            <div class="masthead">
                <xsl:apply-templates select="//sourceDesc/bibl"/>
            </div>
        </div>
    </xsl:template>
    
    <xsl:template match="TEI/teiHeader/fileDesc/publicationStmt/idno">
        <xsl:value-of select="."/>
    </xsl:template>
    
    <xsl:template match="//sourceDesc/bibl">
        <xsl:text>Title: </xsl:text>
        <xsl:value-of select="title"/>
        <br/>
        <xsl:text>Issue: Volume </xsl:text>
        <xsl:value-of select="biblScope[@unit = 'volume']/@n"/>
        <xsl:text>, Number </xsl:text>
        <xsl:value-of select="biblScope[@unit = 'number']/@n"/>
        <br/>
        <xsl:text>Editor(s): </xsl:text>
        <xsl:for-each select="editor/persName">
            <xsl:variable name="personId" select="substring-after(@ref, '#')"/>
            <xsl:value-of
                select="$personography//listPerson/person[@xml:id eq $personId]/persName[not(@type = 'pseudo')]"/>
            <br/>
        </xsl:for-each>
        <xsl:text>Publication: </xsl:text>
        <xsl:value-of select="pubPlace"/>
        <xsl:text>: </xsl:text>
        <xsl:value-of select="format-date(date/@when, '[MNn] [D], [Y]')"/>
        <br/>
        <xsl:text>Publisher: </xsl:text>
        <xsl:for-each select="publisher/persName">
            <xsl:variable name="personId" select="substring-after(@ref, '#')"/>
            <xsl:value-of
                select="$personography//listPerson/person[@xml:id eq $personId]/persName[not(@type = 'pseudo')]"/>
            <br/>
        </xsl:for-each>   
        <xsl:text>Printer: </xsl:text>
        <xsl:value-of select="respStmt/persName"/>
        <br/>
        <xsl:text>Extent: </xsl:text>
        <xsl:value-of select="extent"/>
    </xsl:template>
    
</xsl:stylesheet>