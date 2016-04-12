var sys = require('util');
var http = require('http');

var config = require('./config');
var exec = require('./work');

function isAllowAddress(addr)
{
    return config.allow.some(function(ip){
        if (ip == addr) {
            return true;
        }
        return false;
    });
}

function connectionHandler(socket)
{
    var addr = socket.conn.remoteAddress;
    var logprefix = sys.format('[%s]', addr);

    function log(str)
    {
        console.log.apply(console, [logprefix].concat(
            Array.apply(null, arguments)
        ));
    }

    if (isAllowAddress(addr) == false) {
        log('deny ...', addr);
        socket.disconnect();
        return;
    }

    log('allow ...', addr);

    socket.on('disconnect', function(){
        log('disconnect');
        socket.disconnect();
    });

    socket.on('exec', function(commandArgs, cwd){
        exec(commandArgs, cwd, socket, log);
    });
}

module.exports = function(){

    var server = require('http').createServer();

    server.listen(config.port, '0.0.0.0', function() {
        console.log('listening ...', config.port);
    });

    var io = require('socket.io').listen(server);

    io.sockets.on('connection', connectionHandler);
}
