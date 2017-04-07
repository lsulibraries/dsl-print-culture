<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs xsl"> 
    
    <xsl:output omit-xml-declaration="yes" method="xml" indent="yes"/>
    
    
    <xsl:template match="/">
        <div>
            <div class="front"><xsl:apply-templates select="TEI/text/front"/></div>
            <div class="body"><xsl:apply-templates select="TEI/text/body"/></div>
            <div class="back"><xsl:apply-templates select="TEI/text/back"/></div>
        </div>
    </xsl:template>
        
    <xsl:template match="div">
        <xsl:element name="div">
            <xsl:if test="@decls">
                <xsl:attribute name="id" select="@decls"/>
            </xsl:if>
            <xsl:choose>
                <xsl:when test="contains(@decls,'s')">
                    <xsl:attribute name="class">section</xsl:attribute>
                </xsl:when>
                <xsl:when test="contains(@decls,'p')">
                    <xsl:attribute name="class">piece</xsl:attribute>
                </xsl:when>
                <xsl:otherwise/>
            </xsl:choose>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>

    <xsl:template match="p">
        <p>
           <xsl:apply-templates/> 
        </p>
    </xsl:template>
    
    <xsl:template match="ab">
        <div class="ab">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="head">
        <div class="head">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="persName">
        <span class="person" id="{substring-after(@ref,'#')}"><xsl:value-of select="."/></span>
    </xsl:template>
    
    <xsl:template match="lb">
        <br/>
    </xsl:template>

    <xsl:template match="pb">
        <br/><div class="pagebreak" id="#page{@n}"/>
    </xsl:template>

</xsl:stylesheet>