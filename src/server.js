var sys = require('util');
var http = require('http');
var fs = require('fs');

var config = require('./config');
var exec = require('./work');
var random = require('./random');

var alowAddress = config.allow.concat();

function isAllowAddress(addr)
{
    return alowAddress.some(function(ip){
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

    function allow()
    {
        log('allow ...', addr);
        socket.on('exec', function(commandArgs, cwd){
            exec(commandArgs, cwd, socket, log);
        });
        socket.emit('allow');
    }

    socket.on('disconnect', function(){
        log('disconnect');
        socket.disconnect();
    });

    if (isAllowAddress(addr) != false) {
        allow();
        return;
    }

    log('deny ...', addr);

    var time = setTimeout(function(){
        socket.disconnect();
        log('timeout ...');
    }, 3000);

    var token = random(32);
    log('generate token ...', token);

    socket.emit('deny', token);

    socket.on('login', function(filename){
        log('login ...', filename);
        try {
            var read = fs.readFileSync(filename);
            if (token === read.toString().trim()) {
                log('token ... ok');
                clearTimeout(time);
                alowAddress.push(addr);
                allow();
            } else {
                socket.disconnect();
                log('token ... invalid');
            }
        } catch (ex) {
            socket.disconnect();
            log(ex);
        }
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
