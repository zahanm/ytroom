
var express = require('express');
//    io = require('socket.io');

var server = express.createServer();

server.get('/', function(req, res) {
  res.send('Hello World!\n');
});
server.listen(1337);

console.log('Listening at http://localhost:1337/');
