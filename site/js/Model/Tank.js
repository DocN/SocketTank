class Tank {
    constructor(leftOffset, tankOwner) {
        this.angle = 50;
        this.leftOffset = leftOffset;
        this.fireRate = 0.1;
        this.readyToFire = true;
        this.tankSizeX = 100;
        this.tankSizeY = 100;
        this.tankOwner = tankOwner;
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
        tankLine.style.transform = "rotate("+ angleDeg +"deg)";
        console.log(angleDeg);
    }
  }