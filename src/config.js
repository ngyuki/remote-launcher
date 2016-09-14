var _ = require('lodash');
var utils = require('./utils');

var defaults = {
    port: 38715,
    allow: [],
    host: null,
    mapping: [],
};

var home = process.env.HOME || process.env.USERPROFILE;
var config = utils.loadYaml(home, '.temoto_configxx');
module.exports = _.extend(defaults, config);
