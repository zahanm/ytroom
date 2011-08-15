
var path = require('path'),
    express = require('express');
//    io = require('socket.io');

var server = express.createServer();

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

// server.get('/*.js', static_require.getHandler({
//   searchPaths: [ path.resolve(__dirname,'../client') ]
// }));

server.listen(8080);

console.log('Listening at http://localhost:8080/');
