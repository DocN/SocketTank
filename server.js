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
    if(players.length >= 2) {
      io.emit('connect failed', newplayer.username);
      console.log(newplayer.username + " Failed to join game is full");
    }
    else {
      //let user = { 'username': myPlayer.username, 'userID': myPlayer.userID };
      let newPlayer = new Player(newplayer.username, newplayer.userID, players.length);
      players.push(newPlayer);
      console.log(newPlayer.username + " has joined the game");
      let connectSuccessData = {'userID': newPlayer.userID, 'playerNumber': newPlayer.playerNumber}
      io.emit('connect success', connectSuccessData);
      for(let i =0; i < players.length; i++) {
        console.log(players[i].username);
        io.emit('getName', players[i].username);
      }
      
    }
  });
  socket.on('updateTank', function(tankMoveData){
      //let tankMoveData = {'userID': myPlayer.userID, 'tankLeftOffset': myTankO.leftOffset, 'playerNumber': myTankO.tankOwner };
      //console.log("player: " + tankMoveData.playerNumber + " " + tankMoveData.tankLeftOffset);
      io.emit('updateTank', tankMoveData);
  });
  socket.on('updateTankAngle', function(tankAngleData){
    //let tankAngleData = {'userID': myPlayer.userID, 'tankAngleInverse': inverseAngle, 'playerNumber': myTankO.tankOwner };
    //console.log("player: " + tankAngleData.userID + " has a new angle " + tankAngleData.tankAngleInverse)
    io.emit('updateTankAngle', tankAngleData);
  });
  /*
      let tankFireData = {'userID': myPlayer.userID, 'tankAngleInverse': inverseAngle, 'playerNumber': myTankO.tankOwner };
    socket.emit('tankFired', tankFireData);
  */
  socket.on('tankFired', function(tankFireData){
    //let tankAngleData = {'userID': myPlayer.userID, 'tankAngleInverse': inverseAngle, 'playerNumber': myTankO.tankOwner };
    //console.log("player: " + tankFireData.userID + " has fired " + tankFireData.tankAngleInverse)
    io.emit('tankFired', tankFireData);
  });

  socket.on('updateLives', function(tankLifeData){
    //let tankLifeData = {'userID': myPlayer.userID, 'score': enemyLives, 'playerNumber': myTankO.tankOwner };
    //socket.emit('updateLives', tankLifeData);
    io.emit('updateLives', tankLifeData);
  });

  socket.on('resetRoom', function(){
    players = [];
    console.log("resetting room");
    io.emit("resetPage");
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});