<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs">

    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <personography>
            <personIndex>
                <xsl:apply-templates select="personography/personIndex"/>
            </personIndex>
        </personography>
    </xsl:template>

    <xsl:variable name="bibls" select="collection('storage/app/public/bibl_data')"/>
    <xsl:variable name="ppms" select="collection('storage/app/public/ppm')"/>

    <xsl:template match="personography/personIndex">
        <xsl:for-each select="*">
            <xsl:variable name="personId" select="node-name(.)"/>

            <xsl:element name="{$personId}">
                <xsl:copy-of select="personMeta"/>
                <xsl:if test="personListBibl">
                    <personListBibl>
                        <xsl:for-each select="personListBibl/*">
                            <xsl:variable name="biblId" select="node-name(.)"/>
                            <xsl:variable name="issueId" select="issueId"/>
                            <xsl:variable name="pieceId" select="pieceId"/>
                            <xsl:variable name="ppmId" select="personPieceMetaId"/>
                            <xsl:variable name="issue" select="$bibls[//issueId eq $issueId]"/>
                            <xsl:variable name="issueMeta" select="$issue/issue/issueMeta"/>
                            <xsl:variable name="piece"
                                select="$issue/issue/*[string(node-name(.)) eq $pieceId]"/>
                            <xsl:variable name="pieceMeta" select="$piece/pieceMeta"/>
                            <xsl:variable name="sectionMeta" select="$piece/sectionMeta"/>
                            <xsl:variable name="ppm"
                                select="$ppms/personPieceMeta/*[string(node-name(.)) eq $ppmId]"/>

                            <xsl:element name="{$biblId}">
                                <issueMeta>
                                    <issueId>
                                        <xsl:value-of select="$issueId"/>
                                    </issueId>
                                    <xsl:copy-of select="$issueMeta/issueVol"/>
                                    <xsl:copy-of select="$issueMeta/issueNum"/>
                                    <xsl:copy-of select="$issueMeta/issueDate"/>
                                </issueMeta>
                                <xsl:if test="contains($pieceId, 's')">
                                    <sectionMeta>
                                        <sectionId>
                                            <xsl:value-of select="$pieceId"/>
                                        </sectionId>
                                        <xsl:copy-of select="$sectionMeta/sectionTitle"/>
                                        <xsl:copy-of select="$sectionMeta/piecePage"/>
                                        <xsl:copy-of select="$sectionMeta/piecePdfIndex"/>
                                    </sectionMeta>
                                </xsl:if>
                                <xsl:if test="contains($pieceId, 'p')">
                                    <xsl:if test="$piece/sectionId">
                                        <sectionMeta>
                                            <xsl:variable name="section"
                                                select="$issue/issue/*[string(node-name(.)) eq $piece/sectionId]"/>
                                            <xsl:copy-of select="$piece/sectionId"/>
                                            <xsl:copy-of select="$section/sectionMeta/sectionTitle"/>
                                            <xsl:copy-of select="$section/sectionMeta/piecePage"/>
                                            <xsl:copy-of select="$section/sectionMeta/piecePdfIndex"
                                            />
                                        </sectionMeta>
                                    </xsl:if>
                                    <pieceMeta>
                                        <pieceId>
                                            <xsl:value-of select="$pieceId"/>
                                        </pieceId>
                                        <xsl:copy-of select="$pieceMeta/pieceTitle"/>
                                        <xsl:copy-of select="$pieceMeta/piecePage"/>
                                        <xsl:copy-of select="$pieceMeta/piecePdfIndex"/>
                                    </pieceMeta>
                                </xsl:if>
                                <personPieceMeta>
                                    <xsl:copy-of select="$ppm/personPiecePseudo"/>
                                    <xsl:copy-of select="$ppm/personPieceRole"/>
                                    <xsl:copy-of select="$ppm/authorShip"/>
                                </personPieceMeta>
                            </xsl:element>
                        </xsl:for-each>
                    </personListBibl>
                </xsl:if>
            </xsl:element>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>