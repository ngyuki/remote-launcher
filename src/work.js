var util = require('util');
var spawn = require('child_process').spawn;

module.exports = function(data){
    var command = data.command;
    var args = data.args;
    var cwd = data.cwd;

    console.log(util.format('spawn ... (%s) %s %s', cwd, command, JSON.stringify(args)));

    var proc = spawn('cmd.exe', ['/S', '/C', command].concat(args), {
        stdio: 'ignore',
        detached: true,
        cwd: cwd
    });

    proc.on('error', function(err){
        console.log(util.format('error ... ' + err));
    })
}
