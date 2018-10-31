var socket = io();
var myPlayer; 
var myTankO = new Tank(0, true);
var fireTimer;
var currentMouseLocX;
var currentMouseLocY;

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
    var asyncFunct = new Promise(function(resolve, reject) {
        $(function() {
            $(window).keydown(function(e) {
                if (e.keyCode == 39) {
                    myTankO.readyToFire = false;
                    move(10, 'left', $('#myTank'));
                    reCalculateAngleMove();
                    myTankO.readyToFire = true;
                } 
                else if (e.keyCode == 37) {
                    myTankO.readyToFire = false;
                    move(-10, 'left', $('#myTank'));    
                    reCalculateAngleMove();
                    myTankO.readyToFire = true;
                }
            })
        })
    });
});

$(function() {
    $("#bodyID").mousemove(function(e) {
        var asyncFunct = new Promise(function(resolve, reject) {
            reCalculateAngle(e);
        });
    });
});

$(function() {
    $("#gameFrame").click(function(e) {
        var asyncFunct = new Promise(function(resolve, reject) {
            fire();
        });
    });
});

function reCalculateAngleMove() {
    console.log(currentMouseLocX + " " + currentMouseLocY);
    myTankO.calculateAngle(currentMouseLocX,currentMouseLocY);	
}

function reCalculateAngle(e) {
    var offset = $("#gameFrame").offset();
    currentMouseLocX = (e.pageX - offset.left);
    currentMouseLocY = (e.pageY - offset.top);
    console.log(currentMouseLocX + " " + currentMouseLocY);
    myTankO.calculateAngle(currentMouseLocX,currentMouseLocY);	
}

function fire() {
    stopFireTimer();
    startFireTimer();
    myTankO.fireShell();
    if(this.readyToFire == false) {

    }
    else {
        
    }
    
}
function move(offset, direction, target) {
    let myLocalTank = document.getElementById("myTank");
    if(myLocalTank.offsetLeft == null) {
        return;
    }
    if((parseInt(myTankO.leftOffset)+ parseInt(offset)) >= 1030 && offset == 10) {
        return;
    }
    if((parseInt(myTankO.leftOffset)+parseInt(offset)) < 0 && offset == -10) {
        return;
    }
    myTankO.leftOffset = parseInt(myTankO.leftOffset) + offset;
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

function cursorLoc(e) {
    var x = e.clientX;
    var y = e.clientY;
    var coor = "Coordinates: (" + x + "," + y + ")";
    console.log("mouse coord " + x + " " + y);
}

function stopFireTimer() {
    window.clearInterval(fireTimer);
}

function startFireTimer() {
    fireTimer= setInterval(function() {
        myTankO.moveShell();
    }, 20);  
}