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
        this.angle = angleDeg;
        tankLine.style.transform = "rotate("+ angleDeg +"deg)";
        console.log(angleDeg);
    }

    getRise() {
        var gcd = function(a, b) {
            if (b < 0.0000001) return a;                // Since there is a limited precision we need to limit the value.
          
            return gcd(b, Math.floor(a % b));           // Discard any fractions due to limitations in precision.
          };
          
          var fraction = 155.55;
          var len = fraction.toString().length - 2;
          
          var denominator = Math.pow(10, len);
          var numerator = fraction * denominator;
          
          var divisor = gcd(numerator, denominator);    // Should be 5
          
          numerator /= divisor;                         // Should be 687
          denominator /= divisor;      
    }
    fireShell() {
        let tankShell = document.getElementById("myShell");
        tankShell.style.transform = "rotate("+ this.angle +"deg)";
        let tankLine = document.getElementById("myTankLine");
        tankShell.style.top = "730px";
        Math.tan(angleDeg/( 180 / Math.PI));
    }
  }