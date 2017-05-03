#!/bin/bash



java -jar /vagrant/saxon9he.jar -xsl:resources/assets/xsl/issue_toc.xsl -s:/var/www/dsl-print-culture/storage/app/public/broadway-tei/tei/ -o:/var/www/dsl-print-culture/storage/app/public/toc/

java -jar /vagrant/saxon9he.jar -s:storage/app/public/broadway-tei/tei/ -o:storage/app/public/issues/ -xsl:resources/assets/xsl/issue_text.xsl

java -jar /vagrant/saxon9he.jar -xsl:resources/assets/xsl/personography_data.xsl -s:storage/app/public/broadway-tei/personography.xml -o:storage/app/public/personography-json.xml

java -jar /vagrant/saxon9he.jar -xsl:resources/assets/xsl/bibl_data.xsl -s:storage/app/public/broadway-tei/tei -o:storage/app/public/bibl_data/

java -jar /vagrant/saxon9he.jar -xsl:resources/assets/xsl/personPieceMeta_data.xsl -s:storage/app/public/broadway-tei/tei -o:storage/app/public/ppm

java -jar /vagrant/saxon9he.jar -xsl:resources/assets/xsl/personIndex_getter.xsl -s:storage/app/public/personography-json.xml -o:storage/app/public/personographyComprehensive.xml

java -jar /vagrant/saxon9he.jar -xsl:resources/assets/xsl/biblHeader_getter.xsl -s:storage/app/public/bibl_data/ -o:storage/app/public/biblHeader/

