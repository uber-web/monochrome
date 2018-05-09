#!/bin/bash
# Script to build the module for publish

set -e

rm -rf dist

# transpile modules
BABEL_ENV=es5 babel src --out-dir dist/es5 --source-maps
BABEL_ENV=es6 babel src --out-dir dist/es6 --source-maps
BABEL_ENV=esm babel src --out-dir dist/esm --source-maps

# compile stylesheets
cd './src'
for input in `find . -name style.scss`
do
  output=`echo $input | sed -e 's/\.scss$/.css/'`

  echo $output

  node-sass $input --output-style compressed | \
    tee ../dist/es5/$output | \
    tee ../dist/es6/$output | \
    tee ../dist/esm/$output > /dev/null
done
cd -

node-sass src/main.scss --output-style compressed > dist/main.css
