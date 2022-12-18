#!/bin/bash

day=$1

npx tsc -t es5 src/$day/index.ts && node src/$day/index.js
