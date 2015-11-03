var _ = require('lodash');
var utils = require('./utils');

var defaults = {
    port: 38715,
    allow: [],
    host: null,
    mapping: [],
};

var config = utils.loadYamlTry(process.env.HOME, '.temoto_config');

module.exports = _.extend(defaults, config);
