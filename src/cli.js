var parser = require('nomnom');

parser.command('server')
    .help("run server")
    .callback(function(opts){
        require('./server')();
    });

parser.command('local')
    .help("set replace to local directory")
    .callback(function(opts) {
        require('./replacePath.js').writeLocal(process.cwd());
    });

module.exports = function(){
    parser.parse();
}
