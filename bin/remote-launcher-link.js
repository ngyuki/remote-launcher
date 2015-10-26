#!/usr/bin/env node

var path = require('path');
var args = process.argv.slice(1);
args[0] = path.basename(args[0]);
require('../src/client')(args);
