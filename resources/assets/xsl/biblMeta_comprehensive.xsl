<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs">

    <xsl:output method="xml" indent="yes"/>

    <xsl:variable name="personography" select="document('personography.xml')"/>

    <xsl:template match="/">
        <issue>
            <toc>
                <xsl:apply-templates select="//listBibl" mode="toc"/>
            </toc>
            <xsl:apply-templates select="//sourceDesc/bibl"/>
            <listBibl>
                <xsl:apply-templates select="//listBibl//bibl" mode="listBibl"/>
            </listBibl>
        </issue>
    </xsl:template>

    <xsl:template match="listBibl" mode="toc">
        <xsl:for-each select="bibl">
            <xsl:call-template name="tocBibl"/>
        </xsl:for-each>
    </xsl:template>
    
    <xsl:template name="tocBibl">
        <xsl:variable name="biblId" select="@xml:id"/>
        <xsl:element name="{$biblId}">
            <decsl_id>
                <xsl:value-of select="$biblId"/>
            </decsl_id>
            <type>
                <xsl:value-of select="@type"/>
            </type>
            <title>
                <xsl:value-of select="title"/>
            </title>
            <xsl:for-each select="author">
                <xsl:variable name="personId" select="substring-after(@ref, '#')"/>
                <auth_id>
                    <xsl:value-of select="$personId"/>
                </auth_id>
                <auth_name>
                    <xsl:value-of
                        select="$personography//listPerson/person[@xml:id eq $personId]/persName[not(@type = 'pseudo')]"
                    />
                </auth_name>
            </xsl:for-each>
            <xsl:for-each select="biblScope">
                <page>
                    <xsl:call-template name="getPage"/>
                </page>
                <pdf_index>
                    <xsl:call-template name="getPdfIndex"/>
                </pdf_index>
            </xsl:for-each>
            <xsl:if test="bibl">
                <pieces>
                    <xsl:for-each select="bibl">
                        <xsl:call-template name="tocBibl"/>
                    </xsl:for-each>
                </pieces>
            </xsl:if>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="sourceDesc/bibl">
        <issueMeta>
            <issueId>
                <xsl:value-of select="//fileDesc/publicationStmt/idno"/>
            </issueId>
            <issueTitle>
                <xsl:value-of select="title"/>
            </issueTitle>
            <issueVol>
                <xsl:value-of select="biblScope[@unit = 'volume']/@n"/>
            </issueVol>
            <issueNum>
                <xsl:value-of select="biblScope[@unit = 'number']/@n"/>
            </issueNum>
            <issueDate>
                <xsl:value-of select="format-date(date/@when, '[MNn] [D], [Y]')"/>
            </issueDate>
            <issueListPerson>
                <xsl:for-each select="//sourceDesc/bibl//persName">
                    <xsl:choose>
                        <xsl:when test="@ref">
                            <xsl:variable name="personId" select="substring-after(@ref, '#')"/>
                            <xsl:element name="{$personId}">
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
                            </xsl:element>
                        </xsl:when>
                        <xsl:when test="contains(text(),'John Douglas')">
                                <jdouglas>
                                    <personId>
                                        <xsl:text>jdouglas</xsl:text>
                                    </personId>
                                    <personName>
                                        <xsl:value-of select="."/>
                                    </personName>
                                    <personIssueRole>
                                        <xsl:text>Printer</xsl:text>
                                    </personIssueRole>
                                </jdouglas>
                        </xsl:when>
                    </xsl:choose>
                </xsl:for-each>
            </issueListPerson>
        </issueMeta>
    </xsl:template>
    
    <xsl:template match="listBibl//bibl" mode="listBibl">
        <xsl:variable name="biblId" select="@xml:id"/>
        
        <xsl:element name="{$biblId}">
            
            <xsl:if test="@type = 'section'">
                <sectionMeta>
                    <sectionId>
                        <xsl:value-of select="$biblId"/>
                    </sectionId>
                    <sectionTitle>
                        <xsl:value-of select="title"/>
                    </sectionTitle>
                    <xsl:for-each select="biblScope">
                        <sectionPage>
                            <xsl:call-template name="getPage"/>
                        </sectionPage>
                        <sectionPdfIndex>
                            <xsl:call-template name="getPdfIndex"/>
                        </sectionPdfIndex>
                    </xsl:for-each>
                    <xsl:if test="author">
                        <sectionListPerson>
                            <xsl:for-each select="author">
                                <xsl:call-template name="personMeta"/>
                            </xsl:for-each>
                        </sectionListPerson>
                    </xsl:if>
                </sectionMeta>
            </xsl:if>
            
            <xsl:if test="@type = 'piece'">
                <xsl:choose>
                    <xsl:when test="parent::bibl">
                        <xsl:variable name="parentSectionMeta" select="parent::bibl"/>
                        <sectionMeta>
                            <sectionId>
                                <xsl:value-of select="$parentSectionMeta/@xml:id"/>
                            </sectionId>
                            <sectionTitle>
                                <xsl:value-of select="$parentSectionMeta/title"/>
                            </sectionTitle>
                            <xsl:if test="$parentSectionMeta/biblScope">
                                <sectionPage>
                                    <xsl:call-template name="getPage"/>
                                </sectionPage>
                                <sectionPdfIndex>
                                    <xsl:call-template name="getPdfIndex"/>
                                </sectionPdfIndex>
                            </xsl:if>
                        </sectionMeta>
                    </xsl:when>
                </xsl:choose>
                <pieceMeta>
                    <pieceId>
                        <xsl:value-of select="$biblId"/>
                    </pieceId>
                    <pieceTitle>
                        <xsl:value-of select="title"/>
                    </pieceTitle>
                    <xsl:for-each select="biblScope">
                        <piecePage>
                            <xsl:call-template name="getPage"/>
                        </piecePage>
                        <piecePdfIndex>
                            <xsl:call-template name="getPdfIndex"/>
                        </piecePdfIndex>
                    </xsl:for-each>
                    <xsl:if test="author">
                        <pieceListPerson>
                            <xsl:for-each select="author">
                                <xsl:call-template name="personMeta"/>
                            </xsl:for-each>
                        </pieceListPerson>
                    </xsl:if>
                </pieceMeta>
            </xsl:if>
        </xsl:element>
    </xsl:template>
    
    <xsl:template name="personMeta">
        <xsl:variable name="personId" select="substring-after(@ref, '#')"/>
        <xsl:variable name="personName" select="$personography//listPerson/person[@xml:id eq $personId]/persName[not(@type = 'pseudo')]"/>
        <xsl:variable name="textId" select="concat('#', string(../@xml:id))"/>
        <xsl:element name="{$personId}">
            <personName>
                <xsl:value-of select="$personName"/>
                <xsl:if test="@status = 'supplied' or @status = 'inferred'">
                    <xsl:if test="//text//div[@decls eq $textId]/byline/persName">
                        <xsl:variable name="pseudo"
                            select="//text//div[@decls eq $textId]/byline/persName"/>
                        <xsl:text> writing as </xsl:text>
                        <xsl:for-each select="tokenize($pseudo, ' ')">
                            <xsl:value-of
                                select="
                                string-join((
                                upper-case(substring(., 1, 1)),
                                lower-case((substring(., 2)))),
                                '')"/>
                            <xsl:if test="position() != last()">
                                <xsl:text> </xsl:text>
                            </xsl:if>
                        </xsl:for-each>
                        <xsl:text>.</xsl:text>
                    </xsl:if>
                </xsl:if>
            </personName>
            <personPieceRole>Contributor</personPieceRole>
            <xsl:if test="@status != 'attested'">
                <authorShip>
                    <xsl:text>Authorship is </xsl:text>
                    <xsl:value-of select="@status"/>
                    <xsl:choose>
                        <xsl:when test="@cert">
                            <xsl:text>, with </xsl:text>
                            <xsl:value-of select="@cert"/>
                            <xsl:text> certainty.</xsl:text>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text>.</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
                    <xsl:if test="contains(../note, 'ref=')">
                        <xsl:text> (Reference: </xsl:text>
                        <xsl:value-of
                            select="substring-before(substring-after(../note, 'ref=&quot;'), '&quot;)')"/>
                        <xsl:text>)</xsl:text>
                    </xsl:if>
                </authorShip>
            </xsl:if>
        </xsl:element>
    </xsl:template>
    
    <xsl:template name="getPage">
        <xsl:if test="@from">
            <xsl:value-of select="@from"/>
            <xsl:text>-</xsl:text>
            <xsl:value-of select="@to"/>
        </xsl:if>
        <xsl:if test="@n">
            <xsl:value-of select="@n"/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template name="getPdfIndex">
        <xsl:variable name="page1">
            <xsl:if test="//bibl[@xml:id = 'p1']/biblScope/@from">
                <xsl:value-of select="xs:integer(//bibl[@xml:id = 'p1']/biblScope/@from) - 1"/>
            </xsl:if>
            <xsl:if test="//bibl[@xml:id = 'p1']/biblScope/@n">
                <xsl:value-of select="xs:integer(//bibl[@xml:id = 'p1']/biblScope/@n) - 1"/>
            </xsl:if>
        </xsl:variable>
        <xsl:if test="@from">
            <xsl:value-of select="xs:integer(@from) - $page1"/>
        </xsl:if>
        <xsl:if test="@n">
            <xsl:value-of select="xs:integer(@n) - $page1"/>
        </xsl:if>
    </xsl:template>
</xsl:stylesheet>
