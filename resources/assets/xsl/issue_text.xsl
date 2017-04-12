<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs xsl">

    <xsl:output omit-xml-declaration="yes" method="xml" indent="yes"/>

    <xsl:template match="/">
        <div>
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

    <xsl:template match="div">
        <xsl:element name="div">
            <xsl:choose>
                <xsl:when test="contains(@decls, 's')">
                    <xsl:attribute name="class">section</xsl:attribute>
                </xsl:when>
                <xsl:when test="contains(@decls, 'p')">
                    <xsl:attribute name="class">piece</xsl:attribute>
                </xsl:when>
                <xsl:otherwise/>
            </xsl:choose>
            <xsl:if test="@decls">
                <xsl:attribute name="id" select="@decls"/>
            </xsl:if>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>

    <xsl:template match="p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="p/text()[following-sibling::lb]">
        <xsl:value-of select="replace(.,'\-\s+','')"/>
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
        <span class="anchor" id="{@xml:id}"><a href="{@corresp}"> Link </a></span>
    </xsl:template>
    
    <xsl:template match="note">
        <xsl:if test="@target">
            <a href="{@target}"> Link </a>
        </xsl:if>
        <xsl:element name="div">
            <xsl:attribute name="class">note</xsl:attribute>
            <xsl:if test="@xml:id">
                <xsl:attribute name="id"><xsl:value-of select="@xml:id"/></xsl:attribute>
            </xsl:if>
            <xsl:if test="@type">
                <xsl:attribute name="type"><xsl:value-of select="@type"/></xsl:attribute>
            </xsl:if>
            <xsl:apply-templates/>
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

    <xsl:template match="pb">
        <div class="pagebreak" id="#page{@n}"></div>
    </xsl:template>
    
    <xsl:template match="cb">
        <br/>
        <div class="columnbreak"></div>
    </xsl:template>

</xsl:stylesheet>
