
var path = require('path'),
    express = require('express');

var server = express.createServer();
    io = require('socket.io').listen(server);
    
server.configure(function() {
  // server.use(express.logger());
  server.use(express.bodyParser());
  server.use(express.methodOverride());
  server.use(server.router);
  server.use(express.static(path.resolve(__dirname,'../client')));
  server.use(require('browserify')({
    require: path.resolve(__dirname,'../client/uki'),
    entry: path.resolve(__dirname,'../client/index.js'),
    watch: true
  }));
});

server.configure('dev', function() {
  server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

server.listen(8080);
io.sockets.on('connection', function (socket) {
  socket.emit('startup','hello from SFTO');
  
  socket.on('startupack',function (data) {
    console.log('#ACK MSG',data);
  });
  
  socket.on('regmsg', function (data) {
    console.log('#Register message from client ',data);
  });
  
  socket.on('playmsg', function (data) {
    console.log('#Play message from client ',data);
  });
  });
  
console.log('Listening at http://localhost:8080/');