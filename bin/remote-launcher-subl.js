#!/usr/bin/env node

var net = require('net');
var path = require('path');
var fs = require('fs');

if (process.env.SSH_CLIENT == null) {
    console.error("require environment variable \"SSH_CLIENT\"");
    process.exit(1);
}

var host = process.env.SSH_CLIENT.split(/ /)[0];
var port = 12345;

var args = process.argv.slice(2).map(function(arg){
    if (fs.existsSync(arg)) {
        return path.resolve(arg);
    } else {
        return arg;
    }
});

var sock = net.createConnection(port, host, function(){

    sock.on('error', function(err){
        console.log(err);
        sock.destroy();
    });

    sock.write(JSON.stringify(args), function(){
        sock.end();
    });
});