#!/bin/bash

day=$1

if [ -d src/$day ]
then
  echo "$day day already exists!"
  return 1
fi

mkdir src/$day && touch src/$day/index.ts && touch src/$day/input.txt && touch src/$day/README.md && touch src/$day/test.txt && touch src/$day/index.test.ts
