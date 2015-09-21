var util = require('util');
var net = require('net');
var work = require('./work');
var allowHosts = require('./../config').allowHosts;

module.exports = function(){

    var port = 12345;

    var server = net.createServer(function(sock){
        var list = [];

        if (allowHosts.indexOf(sock.remoteAddress) < 0) {

            console.log(util.format('deny ... %s:%s', sock.remoteAddress, sock.remotePort));
            sock.destroy();

        } else {

            console.log(util.format('allow ... %s:%s', sock.remoteAddress, sock.remotePort));

            sock.on('data', function(data){
                //console.log(JSON.stringify(data.toString()));
                list.push(data.toString());
            });

            sock.on('end', function() {
                if (list.length > 0) {
                    //work(list.join('').replace(/\r?\n$/, '').split(/\r?\n/));
                    work(JSON.parse(list.join('')));
                }
            });
        }
    });

    server.listen(port, function() {
        console.log(util.format('listening ... %s', port));
    });
}
