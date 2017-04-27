#! /bin/bash
OUTFILE=$1
QUERY=$2

java -cp /vagrant/saxon9he.jar net.sf.saxon.Query -o:$OUTFILE  -q:/var/www/dsl-print-culture/re\
sources/assets/xsl/string_search.xquery search_string=$QUERY
