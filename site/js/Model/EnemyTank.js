class EnemyTank {
    constructor(leftOffset, tankOwner) {
        this.angle = 0;
        this.leftOffset = 0;
        this.fireRate = 5;
        this.readyToFire = true;
        this.tankSizeX = 100;
        this.tankSizeY = 100;
        this.tankOwner = tankOwner;
        this.firedX = 0;
        this.firedY = 830;
        this.firedAngle = 0;
    }

    setNewAngle(newAngle) {
        let tankLine = document.getElementById("enemyTankLine");
        if(tankLine == null) {
            return;
        }
        this.angle = -1 *newAngle + -90;
        console.log(newAngle);
        tankLine.style.transform = "rotate("+ this.angle +"deg)";
        tankLine.style.transformOrigin ="top center";
        console.log("here dude");
    }

    fireShell() {
        showEnemyShell();
        this.readyToFire = false;
        let tankShell = document.getElementById("enemyShell");
        tankShell.style.transform = "rotate("+ this.angle +"deg)";
        let tankLine = document.getElementById("enemyTank");
        var offset = $("#gameFrame").offset();
        var relativeX = (window.innerWidth- offset.left);
        console.log("offset" + offset.left);
        console.log(this.firedX);
        this.firedX = parseInt(((window.innerWidth - relativeX) + 100)  + tankLine.offsetLeft);
        this.firedY = 0;
        tankShell.style.left = this.firedX + "px";
        this.firedAngle = this.angle - 90;
    }

    moveShell() {
        let tankShell = document.getElementById("enemyShell");
        //console.log(parseInt(tankShell.style.left));
        let speed = this.fireRate; // pixels per tick
        let xVelocity = speed * Math.cos((this.firedAngle)/( 180 / Math.PI));
        let yVelocity = speed * Math.sin((this.firedAngle)/( 180 / Math.PI));
        this.firedY = this.firedY + yVelocity;
        this.firedX = this.firedX - xVelocity;
        tankShell.style.top = (this.firedY * -1) + "px";
        tankShell.style.left = this.firedX +  "px";
        if(tankShell.style.top <= 0 || tankShell.offsetLeft >= 2000 || tankShell.offsetTop >=1000) {
            hideEnemyShell();
            stopEnemyFireTimer();
        }
    }
  }