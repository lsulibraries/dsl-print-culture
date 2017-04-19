<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs">

    <xsl:output method="xml" indent="yes"/>

    <xsl:variable name="personography" select="document('personography.xml')"/>

    <xsl:template match="/">
        <div>
            <readerHeader>
                <xsl:apply-templates select="//sourceDesc/bibl"/>
                <xsl:apply-templates select="//listBibl//bibl"/>
            </readerHeader>
            <!--<authorDrawer>
                <xsl:apply-templates/>
            </authorDrawer>-->
        </div>
    </xsl:template>

    <xsl:template match="sourceDesc/bibl">
        <rhIssue>
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
                    <xsl:value-of
                        select="$personography//listPerson/person[@xml:id eq $ed_id]/persName[not(@type = 'pseudo')]"
                    />
                </editor>
            </xsl:for-each>
            <xsl:for-each select="publisher">
                <xsl:variable name="pub_id" select="substring-after(persName/@ref, '#')"/>
                <publisher>
                    <xsl:value-of
                        select="$personography//listPerson/person[@xml:id eq $pub_id]/persName[not(@type = 'pseudo')]"
                    />
                </publisher>
            </xsl:for-each>
            <printer>
                <xsl:value-of select="respStmt/persName[not(@type = 'pseudo')]"/>
            </printer>
        </rhIssue>
    </xsl:template>


    <xsl:template match="listBibl//bibl">

        <xsl:variable name="page1">
            <xsl:if test="//bibl[@xml:id = 'p1']/biblScope/@from">
                <xsl:value-of select="xs:integer(//bibl[@xml:id = 'p1']/biblScope/@from) - 1"/>
            </xsl:if>
            <xsl:if test="//bibl[@xml:id = 'p1']/biblScope/@n">
                <xsl:value-of select="xs:integer(//bibl[@xml:id = 'p1']/biblScope/@n) - 1"/>
            </xsl:if>
        </xsl:variable>
        <xsl:variable name="decls_id" select="concat('#', string(@xml:id))"/>
        <xsl:variable name="auth_id" select="substring-after(author/@ref, '#')"/>

        <rhBibl id="{@xml:id}">
            <rhSection>
                <decls_id>
                    <xsl:value-of select="$decls_id"/>
                </decls_id>

                <xsl:choose>
                    <xsl:when test="parent::bibl">
                        <section_title>
                            <xsl:value-of select="parent::bibl/title"/>
                        </section_title>
                        <section_id>
                            <xsl:value-of select="parent::bibl/@xml:id"/>
                        </section_id>
                    </xsl:when>
                </xsl:choose>

                <title>
                    <xsl:value-of select="title"/>
                </title>
                <xsl:if test="biblScope/@from">
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

            </rhSection>

            <xsl:if test="author">
                <rhAuthor>

                    <auth_id>
                        <xsl:value-of select="$auth_id"/>
                    </auth_id>

                    <auth_name>
                        <xsl:choose>
                            <xsl:when
                                test="author/@status = 'attested' or author/@status = 'unknown'">
                                <xsl:value-of
                                    select="$personography//listPerson/person[@xml:id eq $auth_id]/persName[not(@type = 'pseudo')]"
                                />
                            </xsl:when>

                            <xsl:when test="author/@status = 'inferred'">
                                <xsl:choose>
                                    <xsl:when
                                        test="//text//div[@decls eq $decls_id]//byline/persName">
                                        <xsl:value-of
                                            select="$personography//listPerson/person[@xml:id eq $auth_id]/persName[not(@type = 'pseudo')]"/>
                                        <xsl:text> writing as </xsl:text>
                                        <xsl:value-of
                                            select="//text//div[@decls eq $decls_id]//byline/persName"
                                        />
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:value-of
                                            select="$personography//listPerson/person[@xml:id eq $auth_id]/persName[not(@type = 'pseudo')]"
                                        />
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:when>
                            <xsl:when test="author/@status = 'supplied'">
                                <xsl:choose>
                                    <xsl:when
                                        test="//text//div[@decls eq $decls_id]//byline/persName">
                                        <xsl:value-of
                                            select="$personography//listPerson/person[@xml:id eq $auth_id]/persName[not(@type = 'pseudo')]"/>
                                        <xsl:text> writing as </xsl:text>
                                        <xsl:value-of
                                            select="//text//div[@decls eq $decls_id]//byline/persName"
                                        />
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:value-of
                                            select="$personography//listPerson/person[@xml:id eq $auth_id]/persName[not(@type = 'pseudo')]"
                                        />
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:when>

                            <xsl:otherwise/>
                        </xsl:choose>
                    </auth_name>
                    <auth_status>
                        <xsl:text>Authorship is </xsl:text><xsl:value-of select="author/@status"/>
                        <xsl:choose>
                            <xsl:when test="author/@cert">
                                <xsl:text>, with </xsl:text>
                                <xsl:value-of select="author/@cert"/>
                                <xsl:text> certainty.</xsl:text>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:text>.</xsl:text>
                            </xsl:otherwise>
                        </xsl:choose>
                        <xsl:if test="contains(note,'ref=')">
                            <xsl:text>(Reference: </xsl:text>
                            <xsl:value-of select="substring-before(substring-after(note,'ref=&quot;'),'&quot;)')"/>
                            <xsl:text>)</xsl:text>
                        </xsl:if>
                    </auth_status>

                   
                </rhAuthor>
            </xsl:if>
        </rhBibl>
    </xsl:template>
</xsl:stylesheet>
