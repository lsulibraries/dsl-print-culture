<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs">

    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <people class="Authors">
            <xsl:apply-templates select="TEI/text/body/listPerson[@type='Authors']"/>
        </people>
        <people class="ProjectStaff">
            <xsl:apply-templates select="TEI/text/body/listPerson[@type='ProjectStaff']"/>
        </people>
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
                <personName>
                    <xsl:value-of select="persName[not(@type='pseudo')]"/>
                </personName>
                <personInit>
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
                </personInit>
                <xsl:for-each select="persName[@type='pseudo']">
                    <personPseudo>
                        <xsl:value-of select="."/>
                    </personPseudo>
                </xsl:for-each>
                <xsl:if test="@role">
                    <personRole>
                        <xsl:value-of select="@role"/>
                    </personRole>
                </xsl:if>
                <xsl:if test="persName/@ref">
                    <personViaf>
                        <xsl:value-of select="persName/@ref"/>
                    </personViaf>
                </xsl:if>
                
                <personBio>
                    <xsl:if test="birth">
                        <personBirth>
                            <xsl:text>Born</xsl:text>
                            <xsl:for-each select="birth/@when">
                                <xsl:text> </xsl:text>
                                <xsl:choose>
                                    <xsl:when test="starts-with(., '-')">
                                        <xsl:value-of select="abs(number(.))"/>
                                        <xsl:text> B.C.</xsl:text>
                                    </xsl:when>
                                    <xsl:when test="string-length(.) eq 10">
                                        <xsl:value-of select="format-date(., '[MNn] [D], [Y]')"/>
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
                                <xsl:choose>
                                    <xsl:when test="starts-with(., '-')">
                                        <xsl:value-of select="abs(number(.))"/>
                                        <xsl:text> B.C.</xsl:text>
                                    </xsl:when>
                                    <xsl:when test="string-length(.) eq 10">
                                        <xsl:value-of select="format-date(., '[MNn] [D], [Y]')"/>
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
                    
                    <xsl:if test="../@type='ProjectStaff'">
                        <personAffiliation>
                            <xsl:value-of select="affiliation"/>
                        </personAffiliation>
                        <personNote>
                            <xsl:value-of select="note"/>
                        </personNote>
                    </xsl:if>
                    
                </personBio>
                
                
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
