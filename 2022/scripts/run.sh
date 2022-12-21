#!/bin/bash

day=$1

npx tsc -t es5 --downlevelIteration src/$day/index.ts && node src/$day/index.js
