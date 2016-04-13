var path = require('path');

const usageString = `
Usage: temoto [options...] [command...]

Examples:
    temoto --server           # Run temoto server
    temoto --local            # Save local path setting
    temoto command [args...]  # Execute temoto command
`;

function usage()
{
    return usageString.trim();
}

function applySymlink(argv, main)
{
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

function parse(argv, main)
{
    argv = argv || process.argv;
    main = main || process.mainModule.filename;

    let args = applySymlink(argv, main);

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
    parse: parse,
};
