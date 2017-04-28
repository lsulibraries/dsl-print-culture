<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs">
    
    <xsl:output method="xml" indent="yes"/>
    
    <xsl:variable name="personography" select="document('personography.xml')"/>
    
    <xsl:template match="/">
        <personPieceMeta>
            <xsl:apply-templates select="//listBibl//bibl/author"/>
            <xsl:apply-templates select="//body//div[@decls]"/>
        </personPieceMeta>
    </xsl:template>
    
    <xsl:template match="listBibl//bibl/author">
        <xsl:variable name="issueId" select="//fileDesc/publicationStmt/idno"/>
        <xsl:variable name="bibl" select="parent::bibl"/>
        <xsl:variable name="biblId" select="$bibl/@xml:id"/>
        <xsl:variable name="textId" select="concat('#', $biblId)"/>
        <xsl:variable name="authorId" select="substring-after(@ref, '#')"/>
        <xsl:variable name="personPieceId" select="string-join(('ppm',$issueId,$biblId,$authorId),'-')"/>
        <xsl:variable name="authorName" select="$personography//listPerson/person[@xml:id eq $authorId]/persName[not(@type = 'pseudo')]"/>
        
        <xsl:element name="{$personPieceId}">
            <issueId>
                <xsl:value-of select="$issueId"/>
            </issueId>
            <xsl:if test="contains($biblId,'s')">
                <sectionId>
                    <xsl:value-of select="$biblId"/>
                </sectionId>
            </xsl:if>
            <xsl:if test="contains($biblId,'p')">
                <pieceId>
                    <xsl:value-of select="$biblId"/>
                </pieceId>
            </xsl:if>
            <personId>
                <xsl:value-of select="$authorId"/>
            </personId>
            <personName>
                <xsl:value-of select="$authorName"/>
            </personName>
            <xsl:if test="@status='supplied' or @status='inferred'">
                <xsl:if test="//text//div[@decls eq $textId]/byline/persName">
                    <xsl:variable name="pseudo" select="//text//div[@decls eq $textId]/byline/persName"/>
                    <personPiecePseudo>
                        <xsl:for-each select="tokenize($pseudo,' ')">
                            <xsl:value-of select="string-join((
                                upper-case(substring(., 1, 1)),
                                lower-case((substring(.,2)))),
                                '')"/>
                            <xsl:if test="position() != last()">
                                <xsl:text> </xsl:text>
                            </xsl:if>
                        </xsl:for-each>
                    </personPiecePseudo>
                </xsl:if>
            </xsl:if>
            <personPieceRole>
                <xsl:text>Contributor</xsl:text>
            </personPieceRole>
            <authorShip>
                <authorStatus><xsl:value-of select="@status"/></authorStatus>
                <xsl:if test="@cert">
                    <authorCertainty><xsl:value-of select="@cert"/></authorCertainty>
                </xsl:if>
                <xsl:if test="contains($bibl/note,'ref=')">
                    <authorReference>
                        <xsl:text>(Reference: </xsl:text>
                        <xsl:value-of select="substring-before(substring-after($bibl/note,'ref=&quot;'),'&quot;)')"/>
                        <xsl:text>)</xsl:text>
                    </authorReference>
                </xsl:if>
            </authorShip>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="body//div[@decls]">
        <xsl:for-each-group select=".//persName[@ref][not(parent::byline)]" group-by="@ref">
            <xsl:call-template name="persName"/>
        </xsl:for-each-group>
    </xsl:template>
    
    <xsl:template name="persName">
        <xsl:variable name="issueId" select="//fileDesc/publicationStmt/idno"/>
        <xsl:variable name="div" select="ancestor::div[@decls][1]"/>
        <xsl:variable name="textId" select="$div/@decls"/>
        <xsl:variable name="biblId" select="substring-after($textId,'#')"/>
        <xsl:variable name="authorId" select="substring-after(@ref, '#')"/>
        <xsl:variable name="personPieceId" select="string-join(('ppm',$issueId,$biblId,$authorId),'-')"/>
        <xsl:variable name="authorName" select="$personography//listPerson/person[@xml:id eq $authorId]/persName[not(@type = 'pseudo')]"/>
        
        <xsl:element name="{$personPieceId}">
            <issueId>
                <xsl:value-of select="$issueId"/>
            </issueId>
            <xsl:if test="contains($biblId,'s')">
                <sectionId>
                    <xsl:value-of select="$biblId"/>
                </sectionId>
            </xsl:if>
            <xsl:if test="contains($biblId,'p')">
                <pieceId>
                    <xsl:value-of select="$biblId"/>
                </pieceId>
            </xsl:if>
            <personId>
                <xsl:value-of select="$authorId"/>
            </personId>
            <personName>
                <xsl:value-of select="$authorName"/>
            </personName>
            <personPieceRole>
                <xsl:text>Mentioned</xsl:text>
            </personPieceRole>
        </xsl:element>
    </xsl:template>
    
    </xsl:stylesheet>