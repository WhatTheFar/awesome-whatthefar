#!/bin/bash

cd packages/generator
yarn start
cd ..

rm -rf content/generated
cp -r packages/generator/src/generated/* .