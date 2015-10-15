#!/usr/bin/env node

var args = process.argv.slice(2);
require('../src/client')(args);
