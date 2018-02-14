<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs xsl">

    <xsl:output omit-xml-declaration="yes" method="xhtml" indent="yes" />

    <xsl:template match="/">    
        <div>
            <div class="issueId">
                <xsl:apply-templates select="TEI/teiHeader/fileDesc/publicationStmt/idno"/>
            </div>
            <div class="front">
                <xsl:apply-templates select="TEI/text/front"/>
            </div>
            <div class="body">
                <xsl:apply-templates select="TEI/text/body"/>
            </div>
            <div class="back">
                <xsl:apply-templates select="TEI/text/back"/>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="TEI/teiHeader/fileDesc/publicationStmt/idno">
        <xsl:value-of select="."/>
    </xsl:template>
    
    <xsl:template match="div" >
        <xsl:element name="div">
            <xsl:choose>
                <xsl:when test="contains(@decls, 's')">
                    <xsl:attribute name="class">section</xsl:attribute></xsl:when>
                <xsl:when test="contains(@decls, 'p')">
                    <xsl:attribute name="class">piece</xsl:attribute></xsl:when>
                <xsl:otherwise/>
            </xsl:choose>
            <xsl:if test="@decls">
                <xsl:variable name="decls" select="@decls"/>
                <xsl:attribute name="id" select="$decls"/>
                <div class="biblTitle">
                    <xsl:value-of select="//listBibl//bibl[@xml:id eq substring-after($decls,'#')]/title/text()"/>
                </div>
                <xsl:for-each
                    select="//listBibl//bibl[@xml:id eq substring-after($decls, '#')]/biblScope">
                    <div class="biblPage">
                        <xsl:if test="@from">
                            <xsl:value-of select="@from"/>
                        </xsl:if>
                        <xsl:if test="@n">
                            <xsl:value-of select="@n"/>
                        </xsl:if>
                    </div>
                </xsl:for-each>
            </xsl:if>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>

    <xsl:template match="p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="//*[not(ancestor-or-self::ab)]/text()[following-sibling::lb[@break='no']][ends-with(normalize-space(.),'-')]">
        <xsl:if test="preceding-sibling::persName">
            <xsl:if test="starts-with(., ' ')">
                <xsl:text> </xsl:text>
            </xsl:if>
        </xsl:if>
        <xsl:value-of select="substring(normalize-space(.),1,string-length(normalize-space(.))-1)"/>
    </xsl:template> 

    <xsl:template match="ab">
        <div class="ab">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="lg">
        <div class="lg">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="l">
        <br/>
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="ab/lb">
        <br/>
    </xsl:template>
    
    <xsl:template match="cit">
        <div class="cit">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="quote">
        <span class="quote">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="figure">
        <div class="figure">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="bibl">
        <div class="bibl">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="head">
        <div class="head">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="byline">
        <div class="byline">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="anchor">
        <xsl:variable name="corresp" select="substring-after(@corresp,'#')"/>
        <div class="footnote" id="{$corresp}">
            <div class="footnoteLink">
                <xsl:choose>
                    <xsl:when test="matches($corresp, '00')">
                        <xsl:value-of select="substring($corresp, 4)"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="substring($corresp, 3)"/>
                    </xsl:otherwise>
                </xsl:choose>
            </div>
            <div class="footnoteText">
                <xsl:value-of select="/TEI/text/back/note[@xml:id eq $corresp]/text()"/>
            </div>
        </div>
    </xsl:template>
    
    <xsl:template match="note">
        <xsl:variable name="anchorId" select="substring-after(./@target, '#')"/>
        <xsl:variable name="issueId" select="/TEI/teiHeader/fileDesc/publicationStmt/idno"/>
        <xsl:variable name="pieceId"
            select="/TEI/text/body//anchor[@xml:id eq $anchorId]/ancestor::div[@decls][1]/substring-after(@decls, '#')"/>
        <xsl:element name="div">
            <xsl:attribute name="class">note</xsl:attribute>
            <xsl:if test="@xml:id">
                <xsl:attribute name="id">
                    <xsl:value-of select="@xml:id"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@type">
                <xsl:attribute name="type">
                    <xsl:value-of select="@type"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:choose>
                <xsl:when test="@target">
                    <a href="/issues/{$issueId}/{$pieceId}">
                        <xsl:apply-templates/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template>

    <xsl:template match="persName">
        <xsl:element name="span">
            <xsl:attribute name="class">person</xsl:attribute>
            <xsl:if test="@ref">
                <xsl:attribute name="id"><xsl:value-of select="substring-after(@ref,'#')"/></xsl:attribute>
            </xsl:if>
            <xsl:value-of select="replace(.,'\-\s+','')"/>
        </xsl:element>
    </xsl:template>

</xsl:stylesheet>
