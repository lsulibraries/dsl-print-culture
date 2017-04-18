<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs">

    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <div class="Authors">
            <xsl:apply-templates select="TEI/text/body/listPerson[@type='Authors']"/>
        </div>
        <div class="ProjectStaff">
            <xsl:apply-templates select="TEI/text/body/listPerson[@type='ProjectStaff']"/>
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
                <xsl:if test="affiliation">
                    <affil>
                        <xsl:value-of select="affiliation"/>
                    </affil>
                </xsl:if>
                <xsl:if test="../@type='ProjectStaff'">
                    <note>
                        <xsl:value-of select="note"/>
                    </note>
                </xsl:if>
                <xsl:if test="string-length($totalcontribs) != 0">
                    <contrib_issues>
                        <xsl:for-each select="$documents">
                            <xsl:for-each-group select="//listBibl//author" group-by="@ref">
                                <xsl:choose>
                                    <xsl:when test="substring-after(@ref, '#') eq $xmlid">
                                        <c_issue>
                                            <c_issue_total>
                                                <xsl:value-of select="count(current-group())"/>
                                            </c_issue_total>
                                            <c_issue_idno>
                                                <xsl:value-of select="//publicationStmt/idno"/>
                                            </c_issue_idno>
                                        </c_issue>
                                    </xsl:when>
                                    <xsl:otherwise/>
                                </xsl:choose>
                            </xsl:for-each-group>
                        </xsl:for-each>
                    </contrib_issues>
                    <contrib_total>
                        <xsl:value-of select="$totalcontribs"/>
                    </contrib_total>
                </xsl:if>
                
                <xsl:if test="string-length($totalmentions) != 0">
                    <mention_issues>
                        <xsl:for-each select="$documents">
                            <xsl:for-each-group select="//body//persName" group-by="@ref">
                                <xsl:choose>
                                    <xsl:when test="substring-after(@ref, '#') eq $xmlid">
                                        <m_issue>
                                            <m_issue_total>
                                                <xsl:value-of select="count(current-group())"/>
                                            </m_issue_total>
                                            <m_issue_idno>
                                                <xsl:value-of select="//publicationStmt/idno"/>
                                            </m_issue_idno>
                                        </m_issue>
                                    </xsl:when>
                                    <xsl:otherwise/>
                                </xsl:choose>
                            </xsl:for-each-group>
                        </xsl:for-each>
                    </mention_issues>
                    <mention_total>
                        <xsl:value-of select="$totalmentions"/>
                    </mention_total>
                </xsl:if>
            </xsl:element>
        </xsl:for-each>
    </xsl:template>

</xsl:stylesheet>
