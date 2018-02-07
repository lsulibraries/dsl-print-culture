#!/bin/bash

java -jar /opt/saxon9he.jar -s:storage/app/public/broadway-tei/tei/ -o:storage/app/public/issues/ -xsl:resources/assets/xsl/issue_text.xsl

java -jar /opt/saxon9he.jar -xsl:resources/assets/xsl/personography_comprehensive.xsl -s:storage/app/public/broadway-tei/personography.xml -o:storage/app/public/personographyComprehensive.xml

java -jar /opt/saxon9he.jar -xsl:resources/assets/xsl/biblMeta_comprehensive.xsl -s:storage/app/public/broadway-tei/tei/ -o:storage/app/public/bibl/

java -jar /opt/saxon9he.jar -xsl:resources/assets/xsl/masthead.xsl -s:storage/app/public/broadway-tei/tei/ -o:storage/app/public/masthead/

cd /var/www/dsl-print-culture/storage/app/public/broadway-tei && zip -r ../download/tei.zip tei/
cd /var/www/dsl-print-culture/storage/app/public/broadway-tei && zip -r ../download/all.zip tei/

cd /var/www/dsl-print-culture/storage/app/public && zip -r download/intermediate_xml.zip issues/ bibl/ personographyComprehensive.xml
cd /var/www/dsl-print-culture/storage/app/public && zip -r download/all.zip issues/ bibl/ personographyComprehensive.xml

cd /var/www/dsl-print-culture/storage/app/public/broadway-tei && zip -r ../download/pdf.zip pdf/
cd /var/www/dsl-print-culture/storage/app/public/broadway-tei && zip -r ../download/all.zip pdf/
