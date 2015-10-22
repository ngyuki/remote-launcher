var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;

function isNetworkDrive(p)
{
    if (path.normalize(p).substr(0, 2) == '\\\\') {
        return true;
    } else {
        return false;
    }
}

module.exports = function(data){
    var command = data.command;
    var args = data.args;
    var cwd = data.cwd;

    var opts = {
        stdio: 'ignore',
        detached: true,
    };

    if (isNetworkDrive(cwd)) {
        cwd = null;
    } else {
        opts.cwd = cwd;
    }

    console.log(util.format('spawn ... (%s) %s %s', cwd, command, JSON.stringify(args)));

    var proc = spawn('cmd.exe', ['/S', '/C', command].concat(args), opts);

    proc.on('error', function(err){
        console.log(util.format('error ... ' + err));
    })
}
