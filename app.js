

var express = require('express'),
    path = require('path'),
    app = express();

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, 'site')));

var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.get('/', function(req, res) {
    res.redirect('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log("message" + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});