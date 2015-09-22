module.exports = function(args){

    return args.map(function(arg){
        return '"' + arg + '"';
    });
};
