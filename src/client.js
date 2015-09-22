var net = require('net');
var path = require('path');
var fs = require('fs');

module.exports = function(){

    if (process.env.SSH_CLIENT == null) {
        console.error("require environment variable \"SSH_CLIENT\"");
        process.exit(1);
    }

    var host = process.env.SSH_CLIENT.split(/ /)[0];
    var port = 38715;
    var cwd = process.cwd();
    var command = process.argv[2];

    var args = process.argv.slice(3).map(function(arg){
        if (fs.existsSync(arg)) {
            return path.resolve(arg);
        } else {
            return arg;
        }
    });

    var data = {
        command: command,
        args: args,
        cwd: cwd,
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
