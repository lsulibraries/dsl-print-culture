<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"  
    xpath-default-namespace="http://www.tei-c.org/ns/1.0"> 

<xsl:output method="html"/>

<xsl:template match="/">
        <html> 
            <head> 
                <title>Personography Data</title>
            </head>
            <body>
                <div>
                    <xsl:apply-templates select="TEI/text/body/listPerson"/>
                </div>
            </body>
        </html>
    </xsl:template>

<xsl:template match="listPerson">
    <xsl:for-each select="person">
            <div class="{@role}" id="{@xml:id}">
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
                <span class="name">
                    <xsl:value-of select="persName"/>
                </span>
                <span class="viaf">
                    <a href="{persName/@ref}"><xsl:value-of select="persName/@ref"/></a>
                </span>
                <span class="dob">
                    <xsl:value-of select="birth/@when"/>
                </span>
                <span class="pob">
                    <xsl:value-of select="birth/placeName"/>
                </span>
                <span class="dod">
                    <xsl:value-of select="death/@when"/>
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
