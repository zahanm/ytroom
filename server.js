
var express = require('express');
//    io = require('socket.io');

var server = express.createServer();

server.configure(function() {
  server.use(express.bodyParser());
  server.use(express.methodOverride());
  server.use(server.router);
  server.use(express.static(__dirname + '/client'));
  server.use(function(req, res) {
    res.send(404);
  })
});

server.configure('dev', function() {
  server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

server.listen(1337);

console.log('Listening at http://localhost:1337/');
