#!/bin/bash

cd packages/generator
rm -rf src/generated
mkdir -p src/generated/content
cp -r ../../content/* src/generated/content
rm -rf src/generated/content/generated

yarn start
cd ../..

rm -rf content/generated
cp -r packages/generator/src/generated/README.md .
cp -r packages/generator/src/generated/content/generated content/generated

rm -rf temp
mkdir -p temp
cp -r content temp/content
cp README.md temp