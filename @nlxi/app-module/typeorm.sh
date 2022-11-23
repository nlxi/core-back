#!/usr/bin/env bash
npx ts-node -P ./tsconfig.json --esm ../../node_modules/.bin/typeorm -d src/data-source.js $@
