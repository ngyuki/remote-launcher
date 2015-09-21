var replacePaths = require('./../config').replacePaths;

module.exports = function(args){

    return args.map(function(arg){

        replacePaths.some(function(m){
            var reg = new RegExp(m.pattern);
            if (reg.test(arg)) {
                arg = arg.replace(reg, m.replace);
                arg = arg.replace(/\//g, '\\');
                return true;
            }
        });

        return arg;
    });
};
