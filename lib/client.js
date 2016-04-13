'use strict';

var sys = require('util');
var fs = require('fs');
var client = require('socket.io-client');

var config = require('./config');
var mapper = require('./mapper');

function mapToLocal(path) {
    return mapper.mapToLocal(path, config.mapping);
}

function detectRemoteHost() {
    if (process.env.SSH_CLIENT == null) {
        throw Error("require environment variable \"SSH_CLIENT\"");
    }
    return process.env.SSH_CLIENT.split(/ /)[0];
}

function detectCurrentworkingDirectory() {
    var orig = process.cwd();
    var cwd = mapToLocal(orig);

    if (orig === cwd) {
        return null;
    } else {
        return cwd;
    }
}

function execCommand(socket, commandArgs, cwd) {
    return function () {
        var exitcode = 255;

        socket.emit("exec", commandArgs, cwd);

        ['SIGHUP', 'SIGINT', 'SIGTERM'].forEach(function (sig) {
            process.on(sig, function () {
                socket.emit('signal', sig);
            });
        });

        process.stdin.on('data', function (data) {
            socket.emit('stdin', data);
        });

        process.stdin.on('end', function () {
            socket.emit('stdin.end');
        });

        process.stdin.on('close', function () {});

        process.stdin.on('error', function (err) {
            console.error(err.message);
            socket.disconnect();
        });

        process.stdout.on('error', function (err) {
            console.error(err.message);
            socket.disconnect();
        });

        process.stderr.on('error', function (err) {
            console.error(err.message);
            socket.disconnect();
        });

        socket.on('stdout', function (data) {
            process.stdout.write(data);
        });

        socket.on('stderr', function (data) {
            process.stderr.write(data);
        });

        socket.on('exit', function (code) {
            exitcode = code;
            socket.disconnect();
        });

        socket.on('disconnect', function () {
            process.exit(exitcode);
        });
    };
}

module.exports = function (args) {

    var host = config.host || detectRemoteHost();
    var port = config.port;
    var cwd = detectCurrentworkingDirectory();
    var newArgs = args.concat();
    var command = newArgs.shift();

    newArgs = newArgs.map(function (arg) {
        if (fs.existsSync(arg)) {
            return mapToLocal(fs.realpathSync(arg));
        } else {
            return arg;
        }
    });

    var commandArgs = [command].concat(newArgs);

    var url = 'http://' + host + ':' + port;

    var socket = client.connect(url, { reconnection: false });

    socket.on('connect', execCommand(socket, commandArgs, cwd));
};