#!/bin/bash

day=$1

npx tsc src/$day/index.ts && node src/$day/index.js
