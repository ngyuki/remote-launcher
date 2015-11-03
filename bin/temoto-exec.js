#!/usr/bin/env node

var path = require('path');
var args;

if (path.basename(process.argv[1], '.js') === path.basename(__filename, '.js')) {
    args = process.argv.slice(2);
} else {
    args = process.argv.slice(1);
    args[0] = path.basename(args[0]);
}

require('../src/client')(args);
