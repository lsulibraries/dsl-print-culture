<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs">

    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <div>
            <xsl:apply-templates select="TEI/text/body/listPerson"/>
        </div>
    </xsl:template>

    <xsl:variable name="documents" select="collection('Issues')"/>

    <xsl:template match="listPerson">
        <xsl:for-each select="person">
            
            <xsl:variable name="xmlid" select="@xml:id"/>
            <xsl:variable name="totalcontribs">                        
                <xsl:for-each-group select="$documents//listBibl//author" group-by="@ref">
                    <xsl:if test="substring-after(@ref, '#') eq $xmlid">
                        <xsl:value-of select="count(current-group())"/>
                    </xsl:if>
                </xsl:for-each-group>
            </xsl:variable>
            <xsl:variable name="totalmentions">
                <xsl:for-each-group select="$documents//body//persName" group-by="@ref">
                    <xsl:if test="substring-after(@ref, '#') eq $xmlid">
                        <xsl:value-of select="count(current-group())"/>
                    </xsl:if>
                </xsl:for-each-group>
            </xsl:variable>
            
            <xsl:element name="{$xmlid}">
                <name>
                    <xsl:value-of select="persName[not(@type='pseudo')]"/>
                </name>
                <init>
                    <xsl:for-each select="tokenize(persName[not(@type='pseudo')], '\s')">
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
                </init>
                <xsl:for-each select="persName[@type='pseudo']">
                    <pseudo>
                        <xsl:value-of select="."/>
                    </pseudo>
                </xsl:for-each>
                <xsl:if test="@role">
                    <role>
                        <xsl:value-of select="@role"/>
                    </role>
                </xsl:if>
                <xsl:if test="persName/@ref">
                    <viaf>
                        <xsl:value-of select="persName/@ref"/>
                    </viaf>
                </xsl:if>

                <xsl:if test="string-length($totalcontribs) != 0">
                    <issue_contribs>
                        <xsl:for-each select="$documents">
                            <xsl:for-each-group select="//listBibl//author" group-by="@ref">
                                <xsl:choose>
                                    <xsl:when test="substring-after(@ref, '#') eq $xmlid">
                                        <issue>
                                            <num>
                                                <xsl:value-of select="count(current-group())"/>
                                            </num>
                                            <idno>
                                                <xsl:value-of select="//publicationStmt/idno"/>
                                            </idno>
                                        </issue>
                                    </xsl:when>
                                    <xsl:otherwise/>
                                </xsl:choose>
                            </xsl:for-each-group>
                        </xsl:for-each>
                    </issue_contribs>
                    <total_contribs>
                        <num>
                            <xsl:value-of select="$totalcontribs"/>
                        </num>
                    </total_contribs>
                </xsl:if>
                
                <xsl:if test="string-length($totalmentions) != 0">
                    <issue_mentions>
                        <xsl:for-each select="$documents">
                            <xsl:for-each-group select="//body//persName" group-by="@ref">
                                <xsl:choose>
                                    <xsl:when test="substring-after(@ref, '#') eq $xmlid">
                                        <issue>
                                            <num>
                                                <xsl:value-of select="count(current-group())"/>
                                            </num>
                                            <idno>
                                                <xsl:value-of select="//publicationStmt/idno"/>
                                            </idno>
                                        </issue>
                                    </xsl:when>
                                    <xsl:otherwise/>
                                </xsl:choose>
                            </xsl:for-each-group>
                        </xsl:for-each>
                    </issue_mentions>
                    <total_mentions>
                        <num>
                            <xsl:value-of select="$totalmentions"/>
                        </num>
                    </total_mentions>
                </xsl:if>
            </xsl:element>
        </xsl:for-each>
    </xsl:template>

</xsl:stylesheet>
