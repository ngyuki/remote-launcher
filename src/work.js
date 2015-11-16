var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;

var config = require('./config');
var utils = require('./utils');

module.exports = function(param, sock){

    var command = param.command;
    var args = param.args;
    var cwd = param.cwd;

    if (!utils.isLocalDrive(cwd)) {
        cwd = process.env.HOME;
    }

    console.log(util.format('exec ... (%s) %s %s', cwd, command, JSON.stringify(args)));

    //var proc = spawn('cmd.exe', ['/S', '/C', command].concat(args), {});
    var proc = spawn('bash', ['-c', 'cd "$1" && shift && "$@"',
        '--', cwd, command].concat(args), {});

    proc.on('error', function(err){
        console.log(util.format('error ... ' + err));
    });

    proc.on('close', function(code){
        sock.end();
    });

    proc.stdout.pipe(sock);
    proc.stderr.pipe(sock);
    sock.pipe(proc.stdin);
}
