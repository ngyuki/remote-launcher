var replacePaths = require('./../config').replacePaths;

module.exports = function(path){

    replacePaths.some(function(m){
        var reg = new RegExp(m.pattern);
        if (reg.test(path)) {
            path = path.replace(reg, m.replace);
            path = path.replace(/\//g, '\\');
            return true;
        }
    });

    return path;
};