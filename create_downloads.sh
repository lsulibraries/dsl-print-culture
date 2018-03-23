#!/bin/bash
cd /var/www/dsl-print-culture/storage/app/public/broadway-tei && zip -r ../download/tei.zip tei/
cd /var/www/dsl-print-culture/storage/app/public/broadway-tei && zip -r ../download/all.zip tei/

cd /var/www/dsl-print-culture/storage/app/public && zip -r download/intermediate_xml.zip issues/ bibl/ personographyComprehensive.xml
cd /var/www/dsl-print-culture/storage/app/public && zip -r download/all.zip issues/ bibl/ personographyComprehensive.xml

cd /var/www/dsl-print-culture/storage/app/public/broadway-tei && zip -r ../download/pdf.zip pdf/
cd /var/www/dsl-print-culture/storage/app/public/broadway-tei && zip -r ../download/all.zip pdf/
