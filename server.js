

var express = require('express'),
    path = require('path'),
    app = express();

var Player = require('./Models/player');


// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, 'site')));

var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var players = [];

app.get('/', function(req, res) {
    res.redirect('index.html');
});

io.on('connection', function(socket){
  socket.on('connected', function(){
    console.log('user connected');
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('player name', function(newplayer){
    if(players.length >= 10000) {
      io.emit('connect failed', newplayer.username);
      console.log(newplayer.username + " Failed to join game is full");
    }
    else {
      let newPlayer = new Player(newplayer.username, newplayer.userID);
      players.push(newPlayer);
      console.log(newPlayer.username + " has joined the game");
      io.emit('connect success', newplayer.username);
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});