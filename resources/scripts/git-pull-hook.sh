#!/bin/bash

git -C /var/www/dsl-print-culture/storage/app/public/broadway-tei checkout personography -- personography.xml
java -jar /opt/saxon9he.jar -s:storage/app/public/broadway-tei/personography.xml -xsl:resources/assets/xsl/personography_to_html.xsl -o:storage/app/public/personography.xml
