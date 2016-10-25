'use strict';

var _ = require('lodash');
var utils = require('./utils');

var defaults = {
    port: 38715,
    allow: [],
    host: null,
    bash_path: 'bash.exe',
    mapping: []
};

var home = process.env.HOME || process.env.USERPROFILE;
var config = utils.loadYamlTry(home, '.temoto_config');
module.exports = _.extend(defaults, config);