var util = require('util');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fixargs = require('./fixargs');
var escapeargs = require('./escapeargs');

module.exports = function(commandAndArgs){
    var command = commandAndArgs[0];
    var args = fixargs(commandAndArgs.slice(1));

    console.log(util.format('exec ... %s %s', command, JSON.stringify(args)));

    var commandline = escapeargs([command].concat(args)).join(" ");
    exec(commandline);
    //spawn(command, args, {stdio: 'ignore', detached: true});
}
