var net = require('net');
var path = require('path');
var fs = require('fs');
var replacePath = require('./replacePath');

module.exports = function(args){

    if (process.env.SSH_CLIENT == null) {
        console.error("require environment variable \"SSH_CLIENT\"");
        process.exit(1);
    }

    var config = [];

    var fn = path.join(process.env.HOME, '.remote-launcher');

    if (fs.existsSync(fn)) {
        config = require(fn);
    }

    var host = config.host || process.env.SSH_CLIENT.split(/ /)[0];
    var port = 38715;
    var cwd = process.cwd();
    var map = config.map || {};

    var newArgs = args.map(function(arg){
        if (fs.existsSync(arg)) {
            return replacePath(map, fs.realpathSync(arg));
        } else {
            return arg;
        }
    });

    var command = newArgs.shift();

    var data = {
        command: command,
        args: newArgs,
        cwd: replacePath(map, cwd),
    };

    var sock = net.createConnection(port, host, function(){

        sock.on('error', function(err){
            console.log(err);
            sock.destroy();
        });

        sock.write(JSON.stringify(data), function(){
            sock.end();
        });
    });

};
