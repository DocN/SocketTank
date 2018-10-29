class Tank {
    constructor(x, y, angle, readyToFire, tankOwner) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.fireRate = 0.1;
        this.readyToFire = readyToFire;
        this.tankSizeX = 100;
        this.tankSizeY = 100;
        this.tankOwner = tankOwner;
    }
  }