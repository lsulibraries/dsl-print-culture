<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs">

    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <personography>
            <personIndex>
                <xsl:apply-templates select="TEI/text/body/listPerson[@type = 'Authors']"/>
            </personIndex>
            <credits>
                <xsl:apply-templates select="TEI/text/body/listPerson[@type = 'ProjectStaff']"/>
            </credits>
        </personography>
    </xsl:template>

    <!-- <xsl:variable name="documents" select="collection('/var/www/dsl-print-culture/storage/app/public/broadway-tei/tei/')"/> -->
    <xsl:variable name="documents" select="collection('test_issues')"/>
    
    <xsl:template match="listPerson">
        <xsl:for-each select="person">
            
            <xsl:variable name="personId" select="@xml:id"/>
            <xsl:variable name="totalcontribs">                        
                <xsl:for-each-group select="$documents//listBibl//author" group-by="@ref">
                    <xsl:if test="substring-after(@ref, '#') eq $personId">
                        <xsl:value-of select="count(current-group())"/>
                    </xsl:if>
                </xsl:for-each-group>
            </xsl:variable>
            <xsl:variable name="totalmentions">
                <xsl:for-each-group select="$documents//body//persName[@ref][not(parent::byline)]" group-by="@ref">
                    <xsl:if test="substring-after(@ref, '#') eq $personId">
                        <xsl:value-of select="count(current-group())"/>
                    </xsl:if>
                </xsl:for-each-group>
            </xsl:variable>
    
            <xsl:element name="{$personId}">
                <personMeta>
                    <personId>
                        <xsl:value-of select="$personId"/>
                    </personId>
                    <personName>
                        <xsl:value-of select="persName[not(@type = 'pseudo')]"/>
                    </personName>
                    <personInit>
                        <xsl:for-each select="tokenize(persName[not(@type = 'pseudo')], '\s')">
                            <xsl:choose>
                                <xsl:when test="matches(., 'Sir')"/>
                                <xsl:when test="matches(., 'Lady')"/>
                                <xsl:when test="matches(., 'Mr.')"/>
                                <xsl:when test="matches(., 'Mrs.')"/>
                                <xsl:when test="matches(., 'Miss')"/>
                                <xsl:when test="matches(., 'Sr.')"/>
                                <xsl:when test="matches(., 'Jr.')"/>
                                <xsl:when test="matches(., '\(+')"/>
                                <xsl:otherwise>
                                    <xsl:value-of select="substring(., 1, 1)"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:for-each>
                    </personInit>
                    <xsl:for-each select="persName[@type = 'pseudo']">
                        <personPseudo>
                            <xsl:value-of select="."/>
                        </personPseudo>
                    </xsl:for-each>
                    <xsl:if test="@role">
                        <personRole>
                            <xsl:value-of select="replace(@role,'Author','')"/>
                        </personRole>
                    </xsl:if>
                    <xsl:if test="persName/@ref">
                        <personViaf>
                            <xsl:value-of select="persName/@ref"/>
                        </personViaf>
                    </xsl:if>

                    <xsl:if test="birth or death or affiliation">
                        <personBio>
                            <xsl:if test="birth">
                                <personBirth>
                                    <xsl:text>Born</xsl:text>
                                    <xsl:for-each select="birth/@when">
                                        <xsl:text> </xsl:text>
                                        <xsl:call-template name="dateNatural"/>
                                    </xsl:for-each>
                                    <xsl:choose>
                                        <xsl:when test="birth/placeName">
                                            <xsl:text> in </xsl:text>
                                            <xsl:value-of select="birth/placeName"/>
                                        </xsl:when>
                                    </xsl:choose>
                                    <xsl:text>.</xsl:text>
                                </personBirth>
                            </xsl:if>
                            <xsl:if test="death">
                                <personDeath>
                                    <xsl:text>Died</xsl:text>
                                    <xsl:for-each select="death/@when">
                                        <xsl:text> </xsl:text>
                                        <xsl:call-template name="dateNatural"/>
                                    </xsl:for-each>
                                    <xsl:choose>
                                        <xsl:when test="death/placeName">
                                            <xsl:text> in </xsl:text>
                                            <xsl:value-of select="death/placeName"/>
                                        </xsl:when>
                                    </xsl:choose>
                                    <xsl:text>.</xsl:text>
                                </personDeath>
                            </xsl:if>
                            <xsl:if test="../@type = 'ProjectStaff'">
                                <personAffiliation>
                                    <xsl:value-of select="affiliation"/>
                                </personAffiliation>
                                <personNote>
                                    <xsl:value-of select="note"/>
                                </personNote>
                            </xsl:if>
                        </personBio>
                    </xsl:if>

                    <xsl:if test="string-length($totalcontribs) != 0">
                        <personTotalContrib>
                            <xsl:value-of select="$totalcontribs"/>
                        </personTotalContrib>
                    </xsl:if>

                    <xsl:if test="string-length($totalmentions) != 0">
                        <personTotalMention>
                            <xsl:value-of select="$totalmentions"/>
                        </personTotalMention>
                    </xsl:if>
                </personMeta>


                <xsl:if test="string-length($totalmentions) or string-length($totalcontribs) != 0">
                    <personListBibl>
                        <xsl:for-each select="$documents//listBibl//author">
                            <xsl:if test="substring-after(@ref, '#') eq $personId">
                                
                                <xsl:variable name="issueId" select="ancestor::fileDesc/publicationStmt/idno"/>
                                <xsl:variable name="pieceId" select="parent::bibl/@xml:id"/>
                                <xsl:variable name="biblId" select="string-join(('bibl',$issueId,$pieceId),'-')"/>
                                
                                <xsl:element name="{$biblId}">
                                    <issueId>
                                        <xsl:value-of
                                            select="$issueId"/>
                                    </issueId>
                                    <pieceId>
                                        <xsl:value-of select="$pieceId"/>
                                    </pieceId>
                                    <personPieceMetaId>
                                        <xsl:value-of select="string-join(('ppm',$issueId,$pieceId,$personId),'-')"/>
                                    </personPieceMetaId>                                    
                                </xsl:element>
                            </xsl:if>
                        </xsl:for-each>
                        <xsl:for-each-group select="$documents//body//persName[@ref][not(parent::byline)]" group-by="@ref">
                            <xsl:if test="substring-after(@ref, '#') eq $personId">
                                <xsl:variable name="issueId" select="ancestor::TEI//fileDesc/publicationStmt/idno"/>
                                <xsl:variable name="pieceId" select="substring-after(ancestor::div[@decls][1]/@decls, '#')"/>
                                <xsl:element name="{string-join(('bibl',$issueId,$pieceId),'-')}">
                                    <issueId>
                                        <xsl:value-of select="$issueId"/>
                                    </issueId>
                                    <pieceId>
                                        <xsl:value-of select="$pieceId" />
                                    </pieceId>
                                    <personPieceMetaId>
                                        <xsl:value-of select="string-join(('ppm',$issueId,$pieceId,$personId),'-')"/>
                                    </personPieceMetaId>
                                    <xsl:if test="count(current-group()) > 1">
                                        
                                    <personPieceTotalMention>
                                        <xsl:value-of select="count(current-group())"/>
                                    </personPieceTotalMention>
                                    </xsl:if>
                                </xsl:element>
                            </xsl:if>
                        </xsl:for-each-group>
                    </personListBibl>
                </xsl:if>


            </xsl:element>
        </xsl:for-each>
    </xsl:template>

<xsl:template name="dateNatural">
    <xsl:choose>
        <xsl:when test="starts-with(., '-')">
            <xsl:value-of select="abs(number(.))"/>
            <xsl:text> B.C.</xsl:text>
        </xsl:when>
        <xsl:when test="string-length(.) eq 10">
            <xsl:value-of
                select="format-date(., '[MNn] [D], [Y]')"/>
        </xsl:when>
        <xsl:when test="string-length(.) eq 7">
            <xsl:value-of
                select="format-date(xs:date(concat(., '-01')), '[MNn] [Y]')"
            />
        </xsl:when>
        <xsl:otherwise>
            <xsl:value-of select="."/>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>

</xsl:stylesheet>
