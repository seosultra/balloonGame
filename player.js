class Player {
  constructor() {
    this.x = canvas.width / 2; // player strats at the center of canvas and moves by the mouse coordinates
    this.y = canvas.height / 2;
    this.radius = 13; // player is a circle
    this.angle = 0; // to rotate the player toward mouse position
    this.frameX = 0; // face the direction of mouse
    this.frameY = 0;
    this.frame = 0; // keeps track of n of frames
    this.spriteWidth = 1440; //1478.5; // width of a single frame ;
    this.spriteHeight = 1093; //1091; //height of a single frame ;
    this.lost = false;
  }
  //update method to update the player position to move toward mouse coordinates
  update() {
    const distanceX = this.x - mouse.x; //dx
    const distanceY = this.y - mouse.y; //dy
    // mouse position & player position
    if (mouse.x != this.x) {
      this.x -= distanceX / 7; //slow down the moving speed of player to the mouse position
    }
    if (mouse.y != this.y) {
      this.y -= distanceY / 10;
      //this.moving = true;
    }
    //To animate the bird sprite
    // if (gameFrame % 20 == 0) {
    //   this.frame++;
    //   if (this.frame >= 4) this.frame = 0;
    //   if (this.frame == 3 || this.frame == 7) this.frameX = 0;
    // } else {
    //   this.frameX++;
    // }
    // if (this.frame < 3) this.frameY = 0;
    // else if (this.frame < 7) this.frameY = 1;
    // else this.frameY = 0;
  }
  draw() {
    // 2 draws: conection player-mouse; draw player
    // an 'imaginary' line from the player position to the mouse position
    if (mouse.click) {
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y); //start line at player position
      ctx.lineTo(mouse.x, mouse.y); // end ath mouse position
      ctx.stroke(); // draw line from player position to mouse position
    }
    //draw the player as a red circle
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI);
    ctx.fill();
    ctx.closePath();
    //ctx.fillRect(this.x, this.y, this.radius, 10);
    //display the player image depending on wich side it is moving
    if (this.x >= mouse.x) {
      ctx.drawImage(
        playerLeft,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x - 45,
        this.y - 75,
        this.spriteWidth / 8,
        this.spriteHeight / 8
      );
    } else {
      ctx.drawImage(
        playerRight,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x - 157,
        this.y - 100,
        this.spriteWidth / 8,
        this.spriteHeight / 8
      );
    }
  }
}
