#!/bin/bash
# Script to build the module for publish

set -e

rm -rf dist

# transpile modules
BABEL_ENV=es5 babel src --out-dir dist/es5 --source-maps --ignore '**/stories.js'
BABEL_ENV=es6 babel src --out-dir dist/es6 --source-maps --ignore '**/stories.js'
BABEL_ENV=esm babel src --out-dir dist/esm --source-maps --ignore '**/stories.js'
