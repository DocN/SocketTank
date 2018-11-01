var socket = io();
var myPlayer; 
var myTankO = new Tank(0, true);
var enemyTankO = new EnemyTank(0, true);
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
        socket.on('connect success', function(connectSuccessData){
            //let connectSuccessData = {'userID': newPlayer.userID, 'playerNumber': newPlayer.playerNumber}
            if(connectSuccessData.userID == myPlayer.userID) {
                startGame();
                if(connectSuccessData.playerNumber == 0) {
                    myTankO.tankOwner = true;
                }
                else {
                    myTankO.tankOwner = false;
                }
            }
        });
        //let tankMoveData = {'userID': myPlayer.userID, 'tankLeftOffset': myTankO.leftOffset, 'playerNumber': myTankO.tankOwner };
        socket.on('updateTank', function(tankMoveData){
            
            if(tankMoveData.playerNumber == true && myTankO.tankOwner == false) {
                console.log("here" + enemyTankO.leftOffset + " " + tankMoveData.tankLeftOffset);
                if(enemyTankO.leftOffset < tankMoveData.tankLeftOffset) {
                    moveEnemyTank(10, 'right', $('#enemyTank'));
                }
                else if(enemyTankO.leftOffset > tankMoveData.tankLeftOffset) {
                    moveEnemyTank(-10, 'right', $('#enemyTank'));
                }
            }
            if(tankMoveData.playerNumber == false && myTankO.tankOwner == true) {
                if(enemyTankO.leftOffset < tankMoveData.tankLeftOffset) {
                    moveEnemyTank(10, 'right', $('#enemyTank'));
                }
                else if(enemyTankO.leftOffset > tankMoveData.tankLeftOffset) {
                    moveEnemyTank(-10, 'right', $('#enemyTank'));
                }
            }
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
                    updateTankMovement();
                    reCalculateAngleMove();
                    myTankO.readyToFire = true;
                } 
                else if (e.keyCode == 37) {
                    myTankO.readyToFire = false;
                    move(-10, 'left', $('#myTank'));    
                    updateTankMovement();
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
    $("#bodyID").click(function(e) {
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

function moveEnemyTank(offset, direction, target) {
    console.log("move tank");
    let myLocalTank = document.getElementById("enemyTank");
    enemyTankO.leftOffset = parseInt(enemyTankO.leftOffset) + offset;
    console.log(enemyTankO.leftOffset);
    $(target).css(direction, (parseInt($(target).css(direction)) + offset) + 'px')
}

function submitUser() {
    myPlayer = new Player($('#playerNameInput').val());
    let user = { 'username': myPlayer.username, 'userID': myPlayer.userID };
    socket.emit('player name', user);
}

function updateTankMovement() {
    let tankMoveData = {'userID': myPlayer.userID, 'tankLeftOffset': myTankO.leftOffset, 'playerNumber': myTankO.tankOwner };
    socket.emit('updateTank', tankMoveData);
}

function startGame() {
    clearLoginPrompt();
    createGameFrame();
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