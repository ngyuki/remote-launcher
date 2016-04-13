'use strict';

var util = require('util');
var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');
var inquirer = require("inquirer");

function findUp(dir, file) {
    var fn = path.join(dir, file);

    if (fs.existsSync(fn)) {
        return dir;
    }

    var parent = path.dirname(dir);

    if (parent == dir) {
        return null;
    }

    return findUp(parent, file);
}

function loadYaml() {
    var file = path.join.apply(null, arguments);
    var data = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    return data;
}

function loadYamlTry() {
    var file = path.join.apply(null, arguments);

    if (fs.existsSync(file) == false) {
        return null;
    }

    var data = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    return data;
}

function saveYaml(file, data) {
    fs.writeFileSync(file, yaml.safeDump(data));
}

function isLocalDrive(p) {
    if (path.normalize(p).substr(0, 2) == '\\\\') {
        // Windows Network Drive
        return true;
    } else if (path.normalize(p).substr(0, 2) == '/') {
        // Linux Directory
        return true;
    } else {
        return false;
    }
}

function promptFileOverwrite(fn, callback) {
    if (fs.existsSync(fn) == false) {
        callback(fn);
        return;
    }

    var question = {
        type: 'confirm',
        name: 'confirm',
        message: util.format('override \"%s\" ?', fn),
        default: false
    };

    inquirer.prompt([question], function (answers) {
        if (answers.confirm) {
            callback(fn);
        }
    });
}

module.exports = {
    findUp: findUp,
    loadYaml: loadYaml,
    loadYamlTry: loadYamlTry,
    saveYaml: saveYaml,
    isLocalDrive: isLocalDrive,
    promptFileOverwrite: promptFileOverwrite
};