var express = require('express');

var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

var port = process.env.PORT || 8080;

require('./router/middleware.js')(server, express, io);

http.listen(port, function() {
  console.log('server listening on', port, 'at', new Date());
});