#!/bin/bash


java -jar /opt/saxon9he.jar -s:storage/app/public/broadway-tei/tei/ -o:storage/app/public/issues/ -xsl:resources/assets/xsl/issue_text.xsl

java -jar /opt/saxon9he.jar -xsl:resources/assets/xsl/personography_comprehensive.xsl -s:storage/app/public/broadway-tei/personography.xml -o:storage/app/public/personographyComprehensive.xml

java -jar /opt/saxon9he.jar -xsl:resources/assets/xsl/biblMeta_comprehensive.xsl -s:storage/app/public/broadway-tei/tei/ -o:storage/app/public/bibl/

