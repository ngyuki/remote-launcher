var path = require('path');
var fs = require('fs');
var args = require('./args');

function help()
{
    var fn = path.join(path.dirname(__dirname), 'res/temoto_config.yml');

    var text = `\nConfiguration file (~/.temoto_config):\n`;
    var example = fs.readFileSync(fn).toString();

    console.error(args.usage());
    console.error(text);
    console.error(example.replace(/^/gm, '    '));
}

function version()
{
    let version = require(path.resolve(__dirname, '..', 'package.json')).version;
    console.error(`temoto.js ${version}`);
}

(function(){
    var opts = require('./args').parse();

    if (opts == false) {
        console.error(args.usage());
        return;
    }

    switch (opts.command) {
        case 'exec':
            require('../src/client')(opts.args);
            return

        case 'server':
            require('../src/server')();
            return;

        case 'local':
            require('../src/mapper.js').writeLocal(process.cwd());
            return;

        case 'help':
            help();
            return;

        case 'version':
            version();
            return;

        default:
            console.error(args.usage());
            return;
    }
}())
