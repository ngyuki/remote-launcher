var util = require('util');
var net = require('net');
var work = require('./work');
var allowHosts = require('./../config').allowHosts;
var inRange = require('range_check').inRange;

module.exports = function(){

    var port = 38715;

    var server = net.createServer(function(sock){
        var list = [];

        if (inRange(sock.remoteAddress, allowHosts) == false) {

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
