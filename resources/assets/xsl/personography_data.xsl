<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs"
    > 

<xsl:output method="xml" indent="yes"/>

<xsl:template match="/">
    <xsl:apply-templates select="TEI/text/body/listPerson"/>
</xsl:template>

<xsl:template match="listPerson">
    <xsl:for-each select="person">
        <div class="{@role}" id="{@xml:id}">
                <span class="name">
                    <xsl:value-of select="persName"/>
                </span>
                <span class="initials">
                    <xsl:for-each select="tokenize(persName,'\s')">
                        <xsl:choose>
                            <xsl:when test="matches(.,'Sir')"/>
                            <xsl:when test="matches(.,'Lady')"/>
                            <xsl:when test="matches(.,'Mr.')"/>
                            <xsl:when test="matches(.,'Mrs.')"/>
                            <xsl:when test="matches(.,'Miss')"/>
                            <xsl:when test="matches(.,'Sr.')"/>
                            <xsl:when test="matches(.,'Jr.')"/>
                            <xsl:when test="matches(.,'\(+')"></xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="substring(., 1, 1)"/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:for-each>
                </span>
                <span class="role">
                    <xsl:value-of select="@role"/>
                </span>
                <span class="viaf">
                    <a href="{persName/@ref}"><xsl:value-of select="persName/@ref"/></a>
                </span>
                <span class="dob">
                    <xsl:for-each select="birth/@when">
                        <xsl:choose>
                            <xsl:when test="starts-with(.,'-')">
                                <xsl:value-of select="abs(number(.))"/><xsl:text> B.C.</xsl:text>
                            </xsl:when>
                            <xsl:when test="string-length(.) eq 10">
                                <xsl:value-of select="format-date(.,'[MNn] [D], [Y]')"/>
                            </xsl:when>
                            <xsl:when test="string-length(.) eq 7">
                                <xsl:value-of select="format-date(xs:date(concat(.,'-01')),'[MNn] [Y]')"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="."/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:for-each>    
                </span>
                <span class="pob">
                    <xsl:value-of select="birth/placeName"/>
                </span>
                <span class="dod">
                    <xsl:for-each select="death/@when">
                        <xsl:choose>
                            <xsl:when test="starts-with(.,'-')">
                                <xsl:value-of select="abs(number(.))"/><xsl:text> B.C.</xsl:text>
                            </xsl:when>
                            <xsl:when test="string-length(.) eq 10">
                                <xsl:value-of select="format-date(.,'[MNn] [D], [Y]')"/>
                            </xsl:when>
                            <xsl:when test="string-length(.) eq 7">
                                <xsl:value-of select="format-date(xs:date(concat(.,'-01')),'[MNn] [Y]')"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="."/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:for-each>   
                </span>
                <span class="pod">
                    <xsl:value-of select="death/placeName"/>
                </span>
                <span class="note">
                    <xsl:value-of select="note"/>
                </span>
            </div>
    </xsl:for-each>    
</xsl:template>

</xsl:stylesheet>