var exec = require('child_process').exec;
var fixargs = require('./fixargs');
var escapeargs = require('./escapeargs');
var sublime_bin = require('../config').sublime_bin;

module.exports = function(args){
    //console.log(args);

    var cmds = [sublime_bin].concat(fixargs(args));
    var commandline = escapeargs(cmds).join(" ");

    console.log(commandline);
    exec(commandline);
}
