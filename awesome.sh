#!/bin/bash

cd packages/generator
rm -rf src/generated
mkdir -p src/generated/content
cp -r ../../content/* src/generated/content

yarn start
cd ../..

rm -rf content/generated
cp -r packages/generator/src/generated/README.md .
cp -r packages/generator/src/generated/content/generated content/generated