'use strict';

var path = require('path');

var usageString = '\nUsage: temoto [options...] [command...]\n\nExamples:\n    temoto --server           # Run temoto server\n    temoto --local            # Save local path setting\n    temoto command [args...]  # Execute temoto command\n';

function usage() {
    return usageString.trim();
}

function applySymlink(argv, main) {
    var args;

    if (path.basename(argv[1], '.js') === path.basename(main, '.js')) {
        args = argv.slice(2);
    } else {
        // for symlink
        args = argv.slice(1);
        args[0] = path.basename(args[0]);
    }

    return args;
}

function parse(argv, main) {
    argv = argv || process.argv;
    main = main || process.mainModule.filename;

    var args = applySymlink(argv, main);

    var opt = args[0];

    if (opt == null) {
        return false;
    }

    if (opt[0] != '-') {
        return { command: 'exec', args: args };
    }

    switch (opt) {
        case '--server':
        case '-s':
            return { command: 'server' };
        case '--local':
        case '-l':
            return { command: 'local' };

        case '--help':
        case '-h':
            return { command: 'help' };

        case '--version':
            return { command: 'version' };

        default:
            return false;
    }
}

module.exports = {
    usage: usage,
    parse: parse
};