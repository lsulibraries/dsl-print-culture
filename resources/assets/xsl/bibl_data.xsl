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

        <xsl:element name="{@xml:id}">
            <xsl:if test="@type = 'section'">
                <xsl:element name="sectionMeta">
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
                                <xsl:element name="{substring-after(@ref, '#')}">
                                    <personId>
                                        <xsl:value-of select="substring-after(@ref, '#')"/>
                                    </personId>
                                    <personPieceMetaId>
                                        <xsl:value-of select="string-join(('ppm',ancestor::fileDesc/publicationStmt/idno,parent::bibl/@xml:id,substring-after(@ref, '#')),'-')"/>
                                    </personPieceMetaId>
                                </xsl:element>
                            </xsl:for-each>
                        </sectionListPerson>
                    </xsl:if>
                </xsl:element>
            </xsl:if>


            <xsl:if test="@type = 'piece'">
                <xsl:choose>
                    <xsl:when test="parent::bibl">
                        <sectionId>
                            <xsl:value-of select="parent::bibl/@xml:id"/>
                        </sectionId>
                    </xsl:when>
                </xsl:choose>
                <xsl:element name="pieceMeta">
                    <pieceId>
                        <xsl:value-of select="@xml:id"/>
                    </pieceId>
                    <pieceTitle>
                        <xsl:value-of select="title"/>
                    </pieceTitle>
                    <xsl:if test="biblScope/@from">
                        <piecePage>
                            <xsl:value-of select="biblScope/@from"/>
                            <xsl:text>-</xsl:text>
                            <xsl:value-of select="biblScope/@to"/>
                        </piecePage>
                        <piecePdfIndex>
                            <xsl:value-of select="xs:integer(biblScope/@from) - $page1"/>
                        </piecePdfIndex>
                    </xsl:if>
                    <xsl:if test="biblScope/@n">
                        <piecePage>
                            <xsl:value-of select="biblScope/@n"/>
                        </piecePage>
                        <piecePdfIndex>
                            <xsl:value-of select="xs:integer(biblScope/@n) - $page1"/>
                        </piecePdfIndex>
                    </xsl:if>
                    <xsl:if test="author">
                        <pieceListPerson>
                            <xsl:for-each select="author">
                                <xsl:element name="{substring-after(@ref, '#')}">
                                    <personId>
                                        <xsl:value-of select="substring-after(@ref, '#')"/>
                                    </personId>
                                    <personPieceMetaId>
                                        <xsl:value-of select="string-join(('ppm',ancestor::fileDesc/publicationStmt/idno,parent::bibl/@xml:id,substring-after(@ref, '#')),'-')"/>
                                    </personPieceMetaId>
                                </xsl:element>
                            </xsl:for-each>
                        </pieceListPerson>
                    </xsl:if>
                </xsl:element>
            </xsl:if>
        </xsl:element>

    </xsl:template>
</xsl:stylesheet>
