var socket = io();
var myPlayer; 

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


function SubmitUser() {
    myPlayer = new Player($('#playerNameInput').val());
    let user = { 'username': myPlayer.username, 'userID': myPlayer.userID };
    socket.emit('player name', user);
}

function startGame() {
    clearLoginPrompt();
    createGameFrame();
}

