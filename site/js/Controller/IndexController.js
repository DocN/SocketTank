var socket = io();
var myPlayer; 
var myTankO = new Tank(0, true);
$(document).ready(function() {
    $(function () {
        $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
        });
        socket.on('connect success', function(msg){
            if(msg == myPlayer.userID) {

            }
            startGame();
        });
        socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
        });
    });
});

$(function() {
    $(window).keydown(function(e) {
      if (e.keyCode == 39) {
        move(10, 'left', $('#myTank'));
      } 
      else if (e.keyCode == 37) {
        move(-10, 'left', $('#myTank'));    
      }
      
    })
  
  })

function move(offset, direction, target) {
    let myLocalTank = document.getElementById("myTank");
    if(myLocalTank.offsetLeft == null) {
        return;
    }
    if(myLocalTank.offsetLeft >= 1030 && offset >= 10) {
        return;
    }
    if(myLocalTank.offsetLeft <= 0 && offset <= -10) {
        return;
    }
    $(target).css(direction, (parseInt($(target).css(direction)) + offset) + 'px')
    
}

function SubmitUser() {
    myPlayer = new Player($('#playerNameInput').val());
    let user = { 'username': myPlayer.username, 'userID': myPlayer.userID };
    socket.emit('player name', user);
}

function startGame() {
    clearLoginPrompt();
    createGameFrame();
}

function moveMyTank(movement) {

}
