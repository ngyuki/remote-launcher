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

function help()
{
    usage();

    var path = require('path');
    var fs = require('fs');
    var fn = path.join(path.dirname(__dirname), 'res/temoto_config.yml');

    /************************************************************
     * Example configuration file (~/.temoto_config):
     ************************************************************/

     var text = arguments.callee.toString()
        .match(/\/\*\*+\s*$([\s\S]+)^\s*\*+\//m)[1]
        .replace(/^\s+\* ?/gm, '');

    var example = fs.readFileSync(fn).toString();

    console.log(text);
    console.log(example.replace(/^/gm, '    '));
}

function parseArguments()
{
    var path = require('path');
    var args;

    if (path.basename(process.argv[1], '.js') === path.basename(__filename, '.js')) {
        args = process.argv.slice(2);
    } else {
        args = process.argv.slice(1);
        args[0] = path.basename(args[0]);
    }

    return args;
}

var args = parseArguments();

var opt = args[0];

if (opt == null) {
    usage();
    return;
}

if (opt[0] != '-') {
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

    case '--help':
    case '-h':
        help();
        return;

    default:
        usage();
        return;
}
