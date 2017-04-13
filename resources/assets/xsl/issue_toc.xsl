<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs">

    <xsl:output method="xml" indent="yes"/>

    <xsl:variable name="personography" select="document('personography.xml')"/>

    <xsl:template match="/">
        <div>
            <head>
                <xsl:apply-templates select="//sourceDesc/bibl" mode="head"/>
            </head>
            <toc>
                <xsl:apply-templates select="//listBibl" mode="toc"/>
            </toc>
        </div>
    </xsl:template>

    <xsl:template match="sourceDesc/bibl" mode="head">
        <title>
            <xsl:value-of select="title"/>
        </title>
        <xsl:for-each select="biblScope">
            <xsl:if test="@unit = 'volume'">
                <volume>
                    <xsl:value-of select="@n"/>
                </volume>
            </xsl:if>
            <xsl:if test="@unit = 'number'">
                <number>
                    <xsl:value-of select="@n"/>
                </number>
            </xsl:if>
        </xsl:for-each>
        <date>
            <xsl:value-of select="format-date(date/@when, '[MNn] [D], [Y]')"/>
        </date>
        <xsl:for-each select="editor">
            <xsl:variable name="ed_id" select="substring-after(persName/@ref, '#')"/>
            <editor>
                <xsl:value-of select="$personography//listPerson/person[@xml:id eq $ed_id]/persName"
                />
            </editor>
        </xsl:for-each>
        <xsl:for-each select="publisher">
            <xsl:variable name="pub_id" select="substring-after(persName/@ref, '#')"/>
            <publisher>
                <xsl:value-of
                    select="$personography//listPerson/person[@xml:id eq $pub_id]/persName"/>
            </publisher>
        </xsl:for-each>
        <printer>
            <xsl:value-of select="respStmt/persName"/>
        </printer>
    </xsl:template>

    <xsl:template match="listBibl" mode="toc">
        <xsl:variable name="page1">
            <xsl:if test="//bibl[@xml:id = 'p1']/biblScope/@from">
                <xsl:value-of select="xs:integer(//bibl[@xml:id = 'p1']/biblScope/@from) - 1"/>
            </xsl:if>
            <xsl:if test="//bibl[@xml:id = 'p1']/biblScope/@n">
                <xsl:value-of select="xs:integer(//bibl[@xml:id = 'p1']/biblScope/@n) - 1"/>
            </xsl:if>
        </xsl:variable>
        <xsl:for-each select="bibl">
            <xsl:element name="{@xml:id}">
                <decls_id>
                    <xsl:value-of select="@xml:id"/>
                </decls_id>
                <type>
                    <xsl:value-of select="@type"/>
                </type>
                <title>
                    <xsl:value-of select="title"/>
                </title>
                <xsl:if test="title/@type">
                    <t_type>
                        <xsl:value-of select="title/@type"/>
                    </t_type>
                </xsl:if>
                <xsl:if test="author">
                    <xsl:variable name="auth_id" select="substring-after(author/@ref, '#')"/>
                        <auth_id>
                            <xsl:value-of select="$auth_id"/>
                        </auth_id>
                        <auth_name>
                            <xsl:value-of select="$personography//listPerson/person[@xml:id eq $auth_id]/persName[not(@type='pseudo')]"/>
                        </auth_name>
                        <xsl:if test="author/@status">
                            <auth_stat>
                                <xsl:value-of select="author/@status"/>
                            </auth_stat>
                        </xsl:if>
                        <xsl:if test="author/@cert">
                            <auth_cert>
                                <xsl:value-of select="author/@cert"/>
                            </auth_cert>
                        </xsl:if>
                    </xsl:if>
                <xsl:if test="biblScope/@from">
                    <start>
                        <xsl:value-of select="biblScope/@from"/>
                    </start>
                    <end>
                        <xsl:value-of select="biblScope/@to"/>
                    </end>
                    <pages>
                        <xsl:value-of select="biblScope/@from"/>
                        <xsl:text>-</xsl:text>
                        <xsl:value-of select="biblScope/@to"/>
                    </pages>
                    <pdf_index>
                        <xsl:value-of select="xs:integer(biblScope/@from) - $page1"/>
                    </pdf_index>
                </xsl:if>
                <xsl:if test="biblScope/@n">
                    <page>
                        <xsl:value-of select="biblScope/@n"/>
                    </page>
                    <pdf_index>
                        <xsl:value-of select="xs:integer(biblScope/@n) - $page1"/>
                    </pdf_index>
                </xsl:if>
                <xsl:if test="bibl">
                    <pieces>
                        <xsl:for-each select="bibl">
                            <xsl:element name="{@xml:id}">
                                <decls_id>
                                    <xsl:value-of select="@xml:id"/>
                                </decls_id>
                                <type>
                                    <xsl:value-of select="@type"/>
                                </type>
                                <title>
                                    <xsl:value-of select="title"/>
                                </title>
                                <xsl:if test="title/@type">
                                    <t_type>
                                        <xsl:value-of select="title/@type"/>
                                    </t_type>
                                </xsl:if>
                                <xsl:if test="author">
                                    <xsl:variable name="auth_id" select="substring-after(author/@ref, '#')"/>
                                    <auth_id>
                                        <xsl:value-of select="$auth_id"/>
                                    </auth_id>
                                    <auth_name>
                                        <xsl:value-of select="$personography//listPerson/person[@xml:id eq $auth_id]/persName"/>
                                    </auth_name>
                                    <xsl:if test="author/@status">
                                        <auth_stat>
                                            <xsl:value-of select="author/@status"/>
                                        </auth_stat>
                                    </xsl:if>
                                    <xsl:if test="author/@cert">
                                        <auth_cert>
                                            <xsl:value-of select="author/@cert"/>
                                        </auth_cert>
                                    </xsl:if>
                                </xsl:if>
                                <xsl:if test="biblScope/@from">
                                    <start>
                                        <xsl:value-of select="biblScope/@from"/>
                                    </start>
                                    <end>
                                        <xsl:value-of select="biblScope/@to"/>
                                    </end>
                                    <pages>
                                        <xsl:value-of select="biblScope/@from"/>
                                        <xsl:text>-</xsl:text>
                                        <xsl:value-of select="biblScope/@to"/>
                                    </pages>
                                    <pdf_index>
                                        <xsl:value-of select="xs:integer(biblScope/@from) - $page1"/>
                                    </pdf_index>
                                </xsl:if>
                                <xsl:if test="biblScope/@n">
                                    <page>
                                        <xsl:value-of select="biblScope/@n"/>
                                    </page>
                                    <pdf_index>
                                        <xsl:value-of select="xs:integer(biblScope/@n) - $page1"/>
                                    </pdf_index>
                                </xsl:if>
                            </xsl:element>
                        </xsl:for-each>
                    </pieces>
                </xsl:if>
            </xsl:element>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>
