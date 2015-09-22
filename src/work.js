var util = require('util');
var spawn = require('child_process').spawn;
var fixargs = require('./fixargs');
var escapeargs = require('./escapeargs');
var sublime_bin = require('../config').sublime_bin;

module.exports = function(args){
    args = fixargs(args);
    console.log(util.format('spawn ... %s %s', sublime_bin, JSON.stringify(args)));
    spawn(sublime_bin, args, {stdio: 'ignore', detached: true});
}
