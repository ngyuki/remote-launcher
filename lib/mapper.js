'use strict';

var path = require('path');
var fs = require('fs');
var utils = require('./utils');

function replacePrefix(input, from, to) {
    var from = from.replace(/\/+$/, '');
    var to = to.replace(/\\+$/, '');

    var len = from.length;
    var first = input.substr(0, len);
    var second = input.substr(len);

    if (first != from) {
        return null;
    }

    if (second.length != 0 && second[0] != '/') {
        return null;
    }

    return to + second.replace(/\//g, '\\');
}

function mapToLocal(input, mapping) {
    var file = '.temoto_local';
    var from = utils.findUp(input, file);

    if (from != null) {
        var data = utils.loadYaml(from, file);
        var ret = replacePrefix(input, from, data.local);
        if (ret != null) {
            return ret;
        }
    }

    if (mapping) {
        mapping.some(function (item) {
            var ret = replacePrefix(input, item.from, item.to);
            if (ret != null) {
                input = ret;
                return true;
            }
        });
    }

    return input;
}

function writeLocal(cwd) {
    var file = path.join(cwd, '.temoto_local');

    utils.promptFileOverwrite(file, function () {
        utils.saveYaml(file, { local: cwd });
    });
}

module.exports = {
    replacePrefix: replacePrefix,
    mapToLocal: mapToLocal,
    writeLocal: writeLocal
};