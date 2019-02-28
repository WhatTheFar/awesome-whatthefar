#!/bin/bash

cd generator
yarn start
cd ..

rm -rf content/generated
cp -r generator/src/generated/* .