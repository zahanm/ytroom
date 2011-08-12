
var path = require('path'),
    express = require('express'),
    requireServer = require('require/server');
//    io = require('socket.io');

var server = express.createServer();

server.configure(function() {
  // server.use(express.logger());
  server.use(express.bodyParser());
  server.use(express.methodOverride());
  server.use(server.router);
  server.use(express.static(path.resolve(__dirname,'../client')));
  server.use(requireServer.connect({
    root: 'require',
    path: path.resolve(__dirname,'../client'),
    port: 8080,
    host: 'localhost'
  }));
});

server.configure('dev', function() {
  server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// server.get('/', function(req, res) {
//   res.send('Hello World!');
// });

server.listen(8080);

console.log('Listening at http://localhost:8080/');

