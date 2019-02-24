#!/bin/bash

cd generator
yarn start
cd ..

rm -rf content
cp -r generator/src/generated/* .