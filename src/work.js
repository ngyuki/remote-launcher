var exec = require('child_process').exec;
var fixargs = require('./fixargs');
var escapeargs = require('./escapeargs');

module.exports = function(args){
    //console.log(args);

    var cmds = [process.env.SUBLIME_BIN].concat(fixargs(args));
    var commandline = escapeargs(cmds).join(" ");

    console.log(commandline);
    exec(commandline);
}
