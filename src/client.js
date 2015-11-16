var net = require('net');
var path = require('path');
var fs = require('fs');

var config = require('./config');
var replacePath = require('./replacePath').replacePath;

function detectRemoteHost()
{
    if (process.env.SSH_CLIENT == null) {
        throw Error("require environment variable \"SSH_CLIENT\"");
    }
    return process.env.SSH_CLIENT.split(/ /)[0];
}

function detectCurrentworkingDirectory()
{
    var orig = process.cwd();
    var cwd = replacePath(orig);

    if (orig === cwd) {
        return null;
    } else {
        return cwd;
    }
}

module.exports = function(args){

    var host = config.host || detectRemoteHost();
    var port = config.port;
    var cwd = detectCurrentworkingDirectory();
    var newArgs = args.concat();
    var command = newArgs.shift();

    newArgs = newArgs.map(function(arg){
        if (fs.existsSync(arg)) {
            return replacePath(fs.realpathSync(arg));
        } else {
            return arg;
        }
    });

    var data = {
        command: command,
        args: newArgs,
        cwd: cwd,
    };

    var payload = JSON.stringify(data) + "\n";

    var sock = net.createConnection(port, host, function(){

        sock.on('error', function(err){
            process.stderr.write(err);
            sock.destroy();
        });

        sock.on('close', function(){
            process.stdin.end();
        });

        sock.pipe(process.stdout);
        process.stdin.pipe(sock);

        sock.write(payload);
    });
};
