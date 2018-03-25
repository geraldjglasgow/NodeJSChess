var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(http);
var logger = require('morgan');


app.use(logger('dev'));

io.on('connection', (socket) => {
  console.log('new connection');
  socket.on('move', (msg) => {
    socket.broadcast.emit('move', msg);
  });
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});


// listen for connections to server
http.listen(port, () => {
  console.log('listening on port: ' + port);
});