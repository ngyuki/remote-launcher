var util = require('util');
var spawn = require('child_process').spawn;
var fixargs = require('./fixargs');
var sublime_bin = require('../config').sublime_bin;

module.exports = function(commandAndArgs){
    var command = commandAndArgs[0];
    var args = fixargs(commandAndArgs.slice(1));
    var path = null;

    switch (command) {
        case 'subl':
            path = sublime_bin;
            break;
        case 'open':
            path = "explorer";
            break;
        default:
            console.log(util.format("unknown command ... %s", command));
            return;
    }

    console.log(util.format('spawn ... %s %s', path, JSON.stringify(args)));
    spawn(path, args, {stdio: 'ignore', detached: true});
}
