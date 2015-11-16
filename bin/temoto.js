#!/usr/bin/env node

function usage()
{
    /************************************************************
     * Usage: temoto [options...] [command...]
     *
     * Examples:
     *   temoto --server           # Run temoto server
     *   temoto --local            # Save local path setting
     *   temoto command [args...]  # Execute temoto command
     ************************************************************/

     var text = arguments.callee.toString()
        .match(/\/\*\*+\s*$([\s\S]+)^\s*\*+\//m)[1]
        .replace(/^\s+\* ?/gm, '');

    console.log(text);
}

function server()
{
    require('../src/server')();
}

function local()
{
    require('../src/replacePath.js').writeLocal(process.cwd());
}

function exec()
{
    var path = require('path');
    var args;

    if (path.basename(process.argv[1], '.js') === path.basename(__filename, '.js')) {
        args = process.argv.slice(2);
    } else {
        args = process.argv.slice(1);
        args[0] = path.basename(args[0]);
    }

    require('../src/client')(args);
}

var opt = process.argv[2];

if ((opt == null) || (opt[0] != '-')) {
    exec();
    return;
}

switch (opt) {
    case '--server':
    case '-s':
        server();
        return;

    case '--local':
    case '-l':
        local();
        return;

    default:
        usage();
        return;
}
