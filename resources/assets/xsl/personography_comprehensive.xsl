<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xpath-default-namespace="http://www.tei-c.org/ns/1.0" exclude-result-prefixes="xs">

    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <personography>
            <personIndex>
                <xsl:apply-templates select="TEI/text/body/listPerson[@type = 'Authors']"/>
            </personIndex>
            <projectStaff>
                <xsl:apply-templates select="TEI/text/body/listPerson[@type = 'ProjectStaff']"/>
            </projectStaff>
        </personography>
    </xsl:template>

    <!--<xsl:variable name="teiIssues" select="collection('/var/www/dsl-print-culture/storage/app/public/broadway-tei/tei/')"/>--> 
    <!-- substitute variable with different path for local testing with small subset of issues -->
    <xsl:variable name="teiIssues" select="collection('issues-mention')"/> 

    <xsl:template match="listPerson">
        <xsl:for-each select="person">

            <xsl:variable name="personId" select="@xml:id"/>
            
            <!-- calculate number of total contributions by author ref ID in issue headers -->
            <xsl:variable name="totalcontribs">
                <xsl:for-each-group select="$teiIssues//listBibl//author" group-by="@ref">
                    <xsl:if test="substring-after(@ref, '#') eq $personId">
                        <xsl:value-of select="count(current-group())"/>
                    </xsl:if>
                </xsl:for-each-group>
            </xsl:variable>
            
            <!-- construct xpaths for handling mentions -->
            <xsl:variable name="mentions" select="$teiIssues/TEI/text/body//persName[not(parent::byline)][substring-after(@ref, '#') eq $personId]"/>
            <xsl:variable name="mentioningPieces" select="$mentions/ancestor::div[@decls][1]/@decls"/>
            
            <!-- calculate number of total mentions by author ref ID in text, excluding bylines -->
            <xsl:variable name="totalMentionsOverall">
                <xsl:if test="$mentions">
                    <xsl:value-of select="count($mentions)"/>
                </xsl:if>
            </xsl:variable>
            
            <!-- calculate number of pieces in which an author is mentioned -->
            <xsl:variable name="totalMentioningPieces">
                <xsl:if test="$mentions">
                    <xsl:value-of select="count($mentioningPieces)"/>                   
                </xsl:if>
            </xsl:variable>

            <xsl:element name="{$personId}">
                <personMeta>
                    <personId>
                        <xsl:value-of select="$personId"/>
                    </personId>
                    <personName>
                        <xsl:value-of select="persName[not(@type = 'pseudo')]/text()"/>
                    </personName>
                    
                    <!-- get role name; used to group staff listing -->
                    <xsl:if test="persName/roleName">
                        <personRoleName>
                            <xsl:value-of select="persName/roleName"/>
                        </personRoleName>
                    </xsl:if>

                    <!-- construct initials-->
                    <!--<personInit>
                        <xsl:for-each select="tokenize(persName[not(@type = 'pseudo')], '\s')">
                            <xsl:choose>
                                <xsl:when test="matches(., 'Sir')"/>
                                <xsl:when test="matches(., 'Lady')"/>
                                <xsl:when test="matches(., 'Mr.')"/>
                                <xsl:when test="matches(., 'Mrs.')"/>
                                <xsl:when test="matches(., 'Miss')"/>
                                <xsl:when test="matches(., 'Sr.')"/>
                                <xsl:when test="matches(., 'Jr.')"/>
                                <xsl:when test="matches(., '\(+')"/>
                                <xsl:otherwise>
                                    <xsl:value-of select="substring(., 1, 1)"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:for-each>
                    </personInit>-->

                    <!-- list all pseudonyms -->
                    <xsl:for-each select="persName[@type = 'pseudo']">
                        <personPseudo>
                            <xsl:value-of select="."/>
                        </personPseudo>
                    </xsl:for-each>
                    
                    <!-- get role; if role is 'ContributingAuthor' then use 'Contributor'-->
                    <xsl:if test="@role">
                        <personRole>
                            <xsl:value-of
                                select="replace(replace(@role, 'Contributing', 'Contributor'), 'Author', '')"
                            />
                        </personRole>
                    </xsl:if>
                    
                    <!-- get viaf url from ref attribute -->
                    <xsl:if test="persName/@ref">
                        <personViaf>
                            <xsl:value-of select="persName/@ref"/>
                        </personViaf>
                    </xsl:if>

                    <!-- construct birth and death statements -->
                    <xsl:if test="birth or death or note or affiliation">
                        <personBio>
                            <xsl:if test="birth">
                                <personBirth>
                                    <xsl:text>Born</xsl:text>
                                    <xsl:for-each select="birth/@when">
                                        <xsl:text> </xsl:text>
                                        <xsl:call-template name="dateNatural"/>
                                    </xsl:for-each>
                                    <xsl:choose>
                                        <xsl:when test="birth/placeName">
                                            <xsl:text> in </xsl:text>
                                            <xsl:value-of select="birth/placeName"/>
                                        </xsl:when>
                                    </xsl:choose>
                                    <xsl:text>.</xsl:text>
                                </personBirth>
                            </xsl:if>
                            <xsl:if test="death">
                                <personDeath>
                                    <xsl:text>Died</xsl:text>
                                    <xsl:for-each select="death/@when">
                                        <xsl:text> </xsl:text>
                                        <xsl:call-template name="dateNatural"/>
                                    </xsl:for-each>
                                    <xsl:choose>
                                        <xsl:when test="death/placeName">
                                            <xsl:text> in </xsl:text>
                                            <xsl:value-of select="death/placeName"/>
                                        </xsl:when>
                                    </xsl:choose>
                                    <xsl:text>.</xsl:text>
                                </personDeath>
                            </xsl:if>
                            <xsl:if test="affiliation">
                                <personAffiliation>
                                    <xsl:value-of select="affiliation/text()"/>
                                </personAffiliation>
                                <xsl:if test="affiliation/orgName">
                                    <personOrg>
                                        <xsl:value-of select="affiliation/orgName"/>
                                    </personOrg>
                                </xsl:if>
                            </xsl:if>
                            <xsl:if test="note">
                                <personNote>
                                    <xsl:value-of select="note"/>
                                </personNote>
                            </xsl:if>
                        </personBio>
                    </xsl:if>
                    
                    <!-- list total contributions and/or total mentions if not zero -->
                    <xsl:if test="string-length($totalcontribs) != 0">
                        <personTotalContrib>
                            <xsl:value-of select="$totalcontribs"/>
                        </personTotalContrib>
                    </xsl:if>
                    <xsl:if test="string-length($totalMentionsOverall) != 0">
                        <personTotalMentionsOverall>
                            <xsl:value-of select="$totalMentionsOverall"/>
                        </personTotalMentionsOverall>
                        <personTotalMentioningPieces>
                            <xsl:value-of select="$totalMentioningPieces"/>
                        </personTotalMentioningPieces>
                        <personTotalMentionStatement>
                            <xsl:text>This author is mentioned </xsl:text>
                        <xsl:choose>
                            <xsl:when test="$totalMentionsOverall > 1">
                                <xsl:value-of select="$totalMentionsOverall"/>
                                <xsl:text> times </xsl:text>
                                <xsl:choose>
                                    <xsl:when test="$totalMentioningPieces > 1">
                                        <xsl:text>across </xsl:text>
                                        <xsl:value-of select="$totalMentioningPieces"/>
                                        <xsl:text> contributions.</xsl:text>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:text>in a single contribution.</xsl:text>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:when>
                            <xsl:otherwise>once.</xsl:otherwise>
                        </xsl:choose>
                        </personTotalMentionStatement>
                    </xsl:if>
                </personMeta>

                <!-- if an author has contributions or mentions, create personListBibl section -->
                <xsl:if test="string-length($totalMentionsOverall) or string-length($totalcontribs) != 0">
                    <personListBibl>
                        
                        <!-- get bibls for Contributors -->
                        <xsl:for-each select="$teiIssues//listBibl//author">
                            <xsl:if test="substring-after(@ref, '#') eq $personId">
                                <xsl:call-template name="biblMeta"/>
                            </xsl:if>
                        </xsl:for-each>

                        <!-- get bibls for Mentions -->
                        <xsl:for-each-group select="$mentions" group-by="concat(ancestor::TEI//fileDesc/publicationStmt/idno, ancestor::div[@decls][1]/@decls)">
                            <xsl:call-template name="biblMeta"/>
                        </xsl:for-each-group>
                    </personListBibl>
                </xsl:if>
                
            </xsl:element>
        </xsl:for-each>
    </xsl:template>

    <xsl:template name="biblMeta">

        <!-- assign biblId by the parent bibl for author or the closest ancecstor div for mentioned -->
        <xsl:variable name="biblId">
            <xsl:if test="self::author">
                <xsl:value-of select="parent::bibl/@xml:id"/>
            </xsl:if>
            <xsl:if test="self::persName">
                <xsl:value-of select="substring-after(ancestor::div[@decls][1]/@decls, '#')"/>
            </xsl:if>
        </xsl:variable>
        
        <!-- construct variables for source text relationships -->
        <xsl:variable name="issueId" select="ancestor::TEI//fileDesc/publicationStmt/idno"/>
        <xsl:variable name="listBiblId" select="string-join(('bibl', $issueId, $biblId), '-')"/>
        <xsl:variable name="textId" select="concat('#', $biblId)"/>

        <xsl:variable name="issueMeta" select="ancestor::TEI//fileDesc/sourceDesc/bibl"/>
        <xsl:variable name="biblMeta" select="ancestor::TEI//listBibl//bibl[@xml:id eq $biblId]"/>

        <!-- create element for each bibl -->
        
        <xsl:element name="{$listBiblId}">
            
            <!-- get issue-level metadata -->
            <issueMeta>
                <issueId>
                    <xsl:value-of select="$issueId"/>
                </issueId>
                <issueVol>
                    <xsl:value-of select="$issueMeta/biblScope[@unit = 'volume']/@n"/>
                </issueVol>
                <issueNum>
                    <xsl:value-of select="$issueMeta/biblScope[@unit = 'number']/@n"/>
                </issueNum>
                <issueDate>
                    <xsl:for-each select="$issueMeta/date/@when">
                        <xsl:call-template name="dateNatural"/>
                    </xsl:for-each>
                </issueDate>
            </issueMeta>

            <!-- get section-level metadata when the bibl is a section -->
            <xsl:if test="contains($biblId, 's')">
                <sectionMeta>
                    <sectionId>
                        <xsl:value-of select="$biblId"/>
                    </sectionId>
                    <sectionTitle>
                        <xsl:value-of select="$biblMeta/title"/>
                    </sectionTitle>
                    <xsl:for-each select="$biblMeta/biblScope">
                        <sectionPage>
                            <xsl:call-template name="getPage"/>
                        </sectionPage>
                        <sectionPdfIndex>
                            <xsl:call-template name="getPdfIndex"/>
                        </sectionPdfIndex>
                    </xsl:for-each>
                </sectionMeta>
            </xsl:if>

            <!-- get both section- and piece-leve metadata when the bibl is a piece -->
            <xsl:if test="contains($biblId, 'p')">
                <xsl:if test="$biblMeta[parent::bibl]">
                    <xsl:variable name="parentSectionMeta" select="$biblMeta/parent::bibl"/>
                    <sectionMeta>
                        <sectionId>
                            <xsl:value-of select="$parentSectionMeta/@xml:id"/>
                        </sectionId>
                        <sectionTitle>
                            <xsl:value-of select="$parentSectionMeta/title"/>
                        </sectionTitle>
                        <xsl:for-each select="$parentSectionMeta/biblScope">
                            <sectionPage>
                                <xsl:call-template name="getPage"/>
                            </sectionPage>
                            <sectionPdfIndex>
                                <xsl:call-template name="getPdfIndex"/>
                            </sectionPdfIndex>
                        </xsl:for-each>
                    </sectionMeta>
                </xsl:if>
                <pieceMeta>
                    <pieceId>
                        <xsl:value-of select="$biblId"/>
                    </pieceId>
                    <pieceTitle>
                        <xsl:value-of select="$biblMeta/title"/>
                    </pieceTitle>
                    <xsl:for-each select="$biblMeta/biblScope">
                        <piecePage>
                            <xsl:call-template name="getPage"/>
                        </piecePage>
                        <piecePdfIndex>
                            <xsl:call-template name="getPdfIndex"/>
                        </piecePdfIndex>
                    </xsl:for-each>
                </pieceMeta>
            </xsl:if>

            <!-- construct statements about person's relationship to bibl -->
            <personPieceMeta>
                
                <!-- for contributor -->
                <xsl:if test="self::author">
                    <personPieceRole>Contributor</personPieceRole>
                    
                    <!-- if authorship is supplied or inferred and a pseudonym appears in the byline, 
                        construct pseudonym statement, else an anonymity statement -->
                    <xsl:if test="@status = 'supplied' or @status = 'inferred'">
                        <personPiecePseudo>
                            <xsl:choose>
                                <xsl:when test="//text//div[@decls eq $textId]/byline/persName">
                                    <xsl:variable name="pseudo"
                                        select="//text//div[@decls eq $textId]/byline/persName"/>

                                    <xsl:text>Writing as </xsl:text>
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
                                    <xsl:if test="not(ends-with($pseudo, '.'))">
                                        <xsl:text>.</xsl:text>
                                    </xsl:if>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:text>Writing anonymously.</xsl:text>
                                </xsl:otherwise>
                            </xsl:choose>
                        </personPiecePseudo>
                    </xsl:if>
                    
                    <!-- if authorship is not attested, construct authorship statement -->
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
                            <!--<xsl:if test="contains($biblMeta/note, 'ref=')">
                                <xsl:text> (Reference: </xsl:text>
                                <xsl:value-of
                                    select="substring-before(substring-after($biblMeta/note, 'ref=&quot;'), '&quot;)')"/>
                                <xsl:text>)</xsl:text>
                            </xsl:if>-->
                        </authorShip>
                    </xsl:if>
                </xsl:if>
                
                <!-- for mentioned -->
                <xsl:if test="self::persName">
                    <personPieceRole>Mentioned</personPieceRole>
                    
                    <!-- if name appears more than once in a bibl, count occurrences for that bibl -->
                    <xsl:choose>
                        <xsl:when test="count(current-group()) > 1">
                        <personPieceTotalMention>
                            <xsl:value-of select="count(current-group())"/>
                        </personPieceTotalMention>
                        <personPieceMentionStatement>
                            <xsl:text>This name appears </xsl:text>
                            <xsl:value-of select="count(current-group())"/>
                            <xsl:text> times.</xsl:text>
                        </personPieceMentionStatement>
                        </xsl:when>
                        <xsl:otherwise>
                            <personPieceMentionStatement>
                                <xsl:text>This name appears once.</xsl:text>
                            </personPieceMentionStatement>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:if>
                
            </personPieceMeta>
        </xsl:element>
    </xsl:template>

    <!-- format dates for use in birth and death statements -->
    <xsl:template name="dateNatural">
        <xsl:choose>
            <xsl:when test="starts-with(., '-')">
                <xsl:value-of select="abs(number(.))"/>
                <xsl:text> B.C.</xsl:text>
            </xsl:when>
            <xsl:when test="string-length(.) eq 10">
                <xsl:value-of select="format-date(., '[MNn] [D], [Y]')"/>
            </xsl:when>
            <xsl:when test="string-length(.) eq 7">
                <xsl:value-of select="format-date(xs:date(concat(., '-01')), '[MNn] [Y]')"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="."/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <!-- get absolute page number or numbers -->
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

    <!-- get relative page number or numbers within individual issue PDF -->
    <xsl:template name="getPdfIndex">
        <xsl:variable name="page1">
            <xsl:if test="ancestor::TEI//bibl[@xml:id = 'p1']/biblScope/@from">
                <xsl:value-of select="xs:integer(//bibl[@xml:id = 'p1']/biblScope/@from) - 1"/>
            </xsl:if>
            <xsl:if test="ancestor::TEI//bibl[@xml:id = 'p1']/biblScope/@n">
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
