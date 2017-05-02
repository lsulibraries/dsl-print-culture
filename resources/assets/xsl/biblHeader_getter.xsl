<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs">

    <xsl:output method="xml" indent="yes"/>

    <xsl:variable name="personography" select="document('personography.xml')"/>
    <xsl:variable name="ppms" select="collection('storage/app/public/ppm')"/>

    <xsl:template match="/">
        <issue>
            <xsl:apply-templates select="issue/issueMeta"/>
            <listBibl>
                <xsl:apply-templates select="issue/*[not(self::issueMeta)]"/>
            </listBibl>
        </issue>
    </xsl:template>

    <xsl:template match="issue/issueMeta">
        <xsl:copy-of select="."/>
    </xsl:template>

    <xsl:template match="issue/*[not(self::issueMeta)]">
        <xsl:for-each select=".">
            <xsl:variable name="biblId" select="node-name(.)"/>

            <xsl:element name="{$biblId}">
                <xsl:if test="contains(string($biblId), 's')">
                    <sectionMeta>
                        <xsl:copy-of select="sectionMeta/sectionId"/>
                        <xsl:copy-of select="sectionMeta/sectionTitle"/>
                        <xsl:copy-of select="sectionMeta/sectionPage"/>
                        <xsl:copy-of select="sectionMeta/sectionPdfIndex"/>
                    </sectionMeta>
                    <xsl:if test="sectionMeta/sectionListPerson">
                        <sectionListPerson>
                            <xsl:for-each select="sectionMeta/sectionListPerson/*">
                                <xsl:variable name="ppmId" select="personPieceMetaId"/>
                                <xsl:variable name="ppm"
                                    select="$ppms/personPieceMeta/*[string(node-name(.)) eq $ppmId]"/>
                                <xsl:element name="{personId}">
                                    <xsl:copy-of select="$ppm/personName"/>
                                    <xsl:copy-of select="$ppm/personPiecePseudo"/>
                                    <xsl:copy-of select="$ppm/personPieceRole"/>
                                    <xsl:copy-of select="$ppm/authorShip"/>
                                </xsl:element>
                            </xsl:for-each>
                        </sectionListPerson>
                    </xsl:if>
                </xsl:if>
                <xsl:if test="contains(string($biblId), 'p')">
                    <xsl:for-each select="sectionId">
                        <xsl:variable name="sectionId" select="."/>
                        <xsl:variable name="section"
                            select="//*[string(node-name(.)) eq $sectionId]"/>
                        <sectionMeta>
                            <xsl:copy-of select="$section/sectionMeta/sectionId"/>
                            <xsl:copy-of select="$section/sectionMeta/sectionTitle"/>
                            <xsl:copy-of select="$section/sectionMeta/sectionPage"/>
                            <xsl:copy-of select="$section/sectionMeta/sectionPdfIndex"/>
                        </sectionMeta>
                    </xsl:for-each>
                    <pieceMeta>
                        <xsl:copy-of select="pieceMeta/pieceId"/>
                        <xsl:copy-of select="pieceMeta/pieceTitle"/>
                        <xsl:copy-of select="pieceMeta/piecePage"/>
                        <xsl:copy-of select="pieceMeta/piecePdfIndex"/>
                    </pieceMeta>
                    <xsl:if test="pieceMeta/pieceListPerson">
                        <pieceListPerson>
                            <xsl:for-each select="pieceMeta/pieceListPerson/*">
                                <xsl:variable name="ppmId" select="personPieceMetaId"/>
                                <xsl:variable name="ppm"
                                    select="$ppms/personPieceMeta/*[string(node-name(.)) eq $ppmId]"/>
                                <xsl:element name="{personId}">
                                    <xsl:copy-of select="$ppm/personName"/>
                                    <xsl:copy-of select="$ppm/personPiecePseudo"/>
                                    <xsl:copy-of select="$ppm/personPieceRole"/>
                                    <xsl:copy-of select="$ppm/authorShip"/>
                                </xsl:element>
                            </xsl:for-each>
                        </pieceListPerson>
                    </xsl:if>
                </xsl:if>
            </xsl:element>
        </xsl:for-each>
    </xsl:template>

</xsl:stylesheet>