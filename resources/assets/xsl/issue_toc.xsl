<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs"> 
    
    <xsl:output method="xml" indent="yes"/>
    
    <xsl:template match="/">
        <div>
            <head>
                <xsl:apply-templates select="TEI/teiHeader/fileDesc/sourceDesc/bibl" mode="head"/>    
            </head>
            <toc>
                <xsl:apply-templates select="TEI/teiHeader/fileDesc/sourceDesc/listBibl" mode="toc"/>
            </toc>
        </div>
    </xsl:template>
    
    <xsl:template match="sourceDesc/bibl" mode="head">
        <title><xsl:value-of select="title"/></title>
        <xsl:for-each select="biblScope">
            <xsl:if test="@unit='volume'">
                <volume><xsl:value-of select="@n"/></volume>
            </xsl:if>
            <xsl:if test="@unit='number'">
                <number><xsl:value-of select="@n"/></number>
            </xsl:if>
        </xsl:for-each>
        <date><xsl:value-of select="format-date(date/@when,'[MNn] [D], [Y]')"/></date>
        <xsl:for-each select="editor">
            <editor><xsl:value-of select="substring-after(persName/@ref,'#')"/></editor>
        </xsl:for-each>
        <publisher><xsl:value-of select="substring-after(publisher/persName/@ref,'#')"/></publisher>
        <printer><xsl:value-of select="respStmt/persName"/></printer>
    </xsl:template>
    
    <xsl:template match="listBibl" mode="toc">
        <xsl:for-each select="bibl">
            <xsl:element name="{@xml:id}">
                <type><xsl:value-of select="@type"/></type>
                <title><xsl:value-of select="title"/></title>
                <t_type><xsl:value-of select="title/@type"/></t_type>
                <author><xsl:value-of select="substring-after(author/@ref,'#')"/></author>
                <a_stat><xsl:value-of select="author/@status"/></a_stat>
                <a_cert><xsl:value-of select="author/@cert"/></a_cert>
                <xsl:if test="biblScope/@from">
                    <start><xsl:value-of select="biblScope/@from"/></start>
                    <end><xsl:value-of select="biblScope/@to"/></end>
                    <pages><xsl:value-of select="biblScope/@from"/><xsl:text>-</xsl:text><xsl:value-of select="biblScope/@to"/></pages>
                </xsl:if>
                <xsl:if test="biblScope/@n">
                    <page><xsl:value-of select="biblScope/@n"/></page>
                </xsl:if>
                <xsl:for-each select="bibl">
                    <xsl:element name="{@xml:id}">
                        <type><xsl:value-of select="@type"/></type>
                        <title><xsl:value-of select="title"/></title>
                        <t_type><xsl:value-of select="title/@type"/></t_type>
                        <author><xsl:value-of select="substring-after(author/@ref,'#')"/></author>
                        <a_stat><xsl:value-of select="author/@status"/></a_stat>
                        <a_cert><xsl:value-of select="author/@cert"/></a_cert>
                        <xsl:if test="biblScope/@from">
                            <start><xsl:value-of select="biblScope/@from"/></start>
                            <end><xsl:value-of select="biblScope/@to"/></end>
                            <pages><xsl:value-of select="biblScope/@from"/><xsl:text>-</xsl:text><xsl:value-of select="biblScope/@to"/></pages>
                        </xsl:if>
                        <xsl:if test="biblScope/@n">
                            <page><xsl:value-of select="biblScope/@n"/></page>
                        </xsl:if>
                    </xsl:element>
                </xsl:for-each>
            </xsl:element>
        </xsl:for-each>
    </xsl:template>        
</xsl:stylesheet>