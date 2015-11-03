var util = require('util');
var net = require('net');
var events = require('events');

var config = require('./config');
var work = require('./work');

function isAllowAddress(addr)
{
    return config.allow.some(function(ip){
        if (ip == addr) {
            return true;
        }
        return false;
    });
}

function connectionHandler(sock)
{
    if (isAllowAddress(sock.remoteAddress) == false) {
        console.log(util.format('deny ... %s:%s', sock.remoteAddress, sock.remotePort));
        sock.destroy();
        return;
    }

    console.log(util.format('allow ... %s:%s', sock.remoteAddress, sock.remotePort));

    var list = [];

    var handler = function(data){
        var str = data.toString();
        var pos = str.indexOf('\n');
        if (pos < 0) {
            list.push(str);
            return;
        }

        handler = function(data){};

        list.push(str.substr(0, pos));
        if (list.length == 0) {
            sock.destroy();
            return;
        }

        var param = JSON.parse(list.join(''));

        work(param, sock);

        str = str.substr(pos);

        if (str.length > 0) {
            sock.emit('data', str);
        }
    };

    sock.on('error', function(err){
        console.log(util.format('error ... ' + err));
    });

    sock.on('data', function(data){
        handler(data);
    });
}

module.exports = function(){
    var server = net.createServer({allowHalfOpen:true}, connectionHandler);
    server.listen(config.port, '0.0.0.0', function() {
        console.log(util.format('listening ... %s', config.port));
    });
}
