var express = require('express');
 
var app = express.createServer(express.logger()), io = require('socket.io').listen(app);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

app.get('/', function(request, response) {
  response.sendfile(__dirname + '/index.html');
});
 
var port = process.env.PORT || 3000;
console.log("Listening on " + port);
 
app.listen(port);

io.sockets.on('connection', function (socket) {
  socket.broadcast.emit('news from the server');

  socket.on('message', function (data) {
    console.log('message on server');
	//socket.broadcast.emit(data);
	socket.broadcast.send(data);
  });
});