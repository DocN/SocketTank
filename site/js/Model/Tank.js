class Tank {
    constructor(leftOffset, tankOwner) {
        this.angle = 0;
        this.leftOffset = leftOffset;
        this.fireRate = 5;
        this.readyToFire = true;
        this.tankSizeX = 100;
        this.tankSizeY = 100;
        this.tankOwner = tankOwner;
        this.firedX = 0;
        this.firedY = 830;
        this.firedAngle = 0;
    }

    calculateAngle(mouseX, mouseY) {
        let tankX = this.leftOffset;
        console.log(tankX);
        let tankY = 830; 

        // angle in degrees
        var angleDeg = 90 + (Math.atan2(tankY - mouseY, tankX - mouseX) * 180 / Math.PI);
        let tankLine = document.getElementById("myTankLine");
        if(tankLine == null) {
            return;
        }
        console.log(tankX + " " + tankY);
        this.angle = angleDeg;
        tankLine.style.transform = "rotate("+ angleDeg +"deg)";
        tankLine.style.transformOrigin ="top center";
    }

    fireShell() {
        showMyShell();
        this.readyToFire = false;
        let tankShell = document.getElementById("myShell");
        tankShell.style.transform = "rotate("+ this.angle +"deg)";
        let tankLine = document.getElementById("myTank");
        var offset = $("#gameFrame").offset();
        var relativeX = (window.innerWidth- offset.left);
        console.log(((window.innerWidth - relativeX) + 75)  + tankLine.offsetLeft + "px");
        this.firedX = parseInt(((window.innerWidth - relativeX) + 75)  + tankLine.offsetLeft);
        this.firedY = 825;
        tankShell.style.left = this.firedX + "px";
        this.firedAngle = this.angle - 90;
    }

    moveShell() {
        let tankShell = document.getElementById("myShell");
        //console.log(parseInt(tankShell.style.left));
        let speed = this.fireRate; // pixels per tick
        let xVelocity = speed * Math.cos((this.firedAngle)/( 180 / Math.PI));
        let yVelocity = speed * Math.sin((this.firedAngle)/( 180 / Math.PI));
        this.firedY = this.firedY - yVelocity;
        this.firedX = this.firedX - xVelocity;
        tankShell.style.top = this.firedY + "px";
        tankShell.style.left = this.firedX +  "px";
        if(this.isOverlapping(tankShell, document.getElementById("enemyTank"))) {
            console.log("hit");
            enemyLives = enemyLives - 1;
            updateEnemyScoreView();
            updateEnemyLives();
            hideMyShell();
            stopFireTimer();
        }
        if(tankShell.style.top <= 0 || tankShell.offsetLeft >= 2000 || tankShell.offsetTop >=1000) {
            hideMyShell();
            stopFireTimer();
        }
    }

    isOverlapping(e1, e2){
        if( e1.length && e1.length > 1 ){
        e1 = e1[0];
        }
        if( e2.length && e2.length > 1 ){
        e2 = e2[0];
        }
        var rect1 = e1 instanceof Element ? e1.getBoundingClientRect() : false;
        var rect2 = e2 instanceof Element ? e2.getBoundingClientRect() : false;
        
        var overlap = null;
        if( rect1 && rect2 ){
        overlap = !(
            rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom
            )
        return overlap;  
        } 
        else {
        return overlap;
        }
    }

    inverseAngle() {
        let inverse = this.angle +180 - 90;
        if(inverse > 360) {
            inverse = inverse - 360;
        }
        return (-1*(inverse -180));
    }
  }