<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs">

    <xsl:output method="xml" indent="yes"/>

    <xsl:variable name="personography" select="document('personography.xml')"/>

    <xsl:template match="/">
        <issue>
            <xsl:apply-templates select="//sourceDesc/bibl"/>
            <xsl:apply-templates select="//listBibl//bibl"/>
        </issue>
    </xsl:template>

    <xsl:template match="sourceDesc/bibl">
        <issueMeta>
            <issueId>
                <xsl:value-of select="//fileDesc/publicationStmt/idno"/>
            </issueId>
            <issueTitle>
                <xsl:value-of select="title"/>
            </issueTitle>
            <xsl:for-each select="biblScope">
                <xsl:if test="@unit = 'volume'">
                    <issueVol>
                        <xsl:value-of select="@n"/>
                    </issueVol>
                </xsl:if>
                <xsl:if test="@unit = 'number'">
                    <issueNum>
                        <xsl:value-of select="@n"/>
                    </issueNum>
                </xsl:if>
            </xsl:for-each>
            <issueDate>
                <xsl:value-of select="format-date(date/@when, '[MNn] [D], [Y]')"/>
            </issueDate>
            <issueListPerson>
                <xsl:for-each select="//sourceDesc/bibl//persName">
                    <xsl:choose>
                        <xsl:when test="@ref">
                            <xsl:variable name="personId" select="substring-after(@ref, '#')"/>
                            <person>
                                <personId>
                                    <xsl:value-of select="$personId"/>
                                </personId>
                                <personName>
                                    <xsl:value-of
                                        select="$personography//listPerson/person[@xml:id eq $personId]/persName[not(@type = 'pseudo')]"
                                    />
                                </personName>
                                <personIssueRole>
                                    <xsl:if test="parent::editor">
                                        <xsl:text>Editor</xsl:text>
                                    </xsl:if>
                                    <xsl:if test="parent::publisher">
                                        <xsl:text>Publisher</xsl:text>
                                    </xsl:if>
                                </personIssueRole>
                            </person>
                        </xsl:when>
                        <xsl:otherwise>
                            <person>
                                <personName>
                                    <xsl:value-of select="."/>
                                </personName>
                                <xsl:if test="parent::respStmt/resp[@ref='http://id.loc.gov/vocabulary/relators/prt.html']">
                                    <personIssueRole>
                                        <xsl:text>Printer</xsl:text>
                                    </personIssueRole>
                                </xsl:if>
                            </person>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:for-each>
           </issueListPerson>
        </issueMeta>
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
        
        <xsl:if test="@type='section'">
            <xsl:element name="sectionMeta">
                <xsl:attribute name="id" select="@xml:id"/>
                <sectionId>
                    <xsl:value-of select="@xml:id"/>
                </sectionId>
                <sectionTitle>
                    <xsl:value-of select="title"/>
                </sectionTitle>
                <xsl:if test="biblScope/@from">
                    <sectionPage>
                        <xsl:value-of select="biblScope/@from"/>
                        <xsl:text>-</xsl:text>
                        <xsl:value-of select="biblScope/@to"/>
                    </sectionPage>
                    <sectionPdfIndex>
                        <xsl:value-of select="xs:integer(biblScope/@from) - $page1"/>
                    </sectionPdfIndex>
                </xsl:if>
                <xsl:if test="biblScope/@n">
                    <sectionPage>
                        <xsl:value-of select="biblScope/@n"/>
                    </sectionPage>
                    <sectionPdfIndex>
                        <xsl:value-of select="xs:integer(biblScope/@n) - $page1"/>
                    </sectionPdfIndex>
                </xsl:if>
                <xsl:if test="author">
                    <sectionListPerson>
                        <xsl:for-each select="author">
                            <person>
                                <personId>
                                    <xsl:value-of select="substring-after(@ref, '#')"/>
                                </personId>
                            </person>
                        </xsl:for-each>
                    </sectionListPerson>
                </xsl:if>
            </xsl:element>
        </xsl:if> 
        <!-- 

                <xsl:choose>
                    <xsl:when test="parent::bibl">
                        <parent_title>
                            <xsl:value-of select="parent::bibl/title"/>
                        </parent_title>
                        <parent_id>
                            <xsl:value-of select="parent::bibl/@xml:id"/>
                        </parent_id>
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
                                test="author/@status = 'attested' or 'unknown'">
                                <xsl:value-of
                                    select="$personography//listPerson/person[@xml:id eq $auth_id]/persName[not(@type = 'pseudo')]"
                                />
                            </xsl:when>
                            <xsl:when test="author/@status = 'supplied' or 'inferred'">
                                <xsl:choose>
                                    <xsl:when
                                        test="//text//div[@decls eq $decls_id]//byline/persName">
                                        <xsl:value-of
                                            select="$personography//listPerson/person[@xml:id eq $auth_id]/persName[not(@type = 'pseudo')]"/>
                                        <xsl:text>, writing as </xsl:text>
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
        </xsl:element>
         -->    
    </xsl:template>
</xsl:stylesheet>
