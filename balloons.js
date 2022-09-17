class Balloon {
  constructor(randomColor) {
    this.balloonWidth = 543 / 6; // for single balloon
    this.balloonHeight = 117;
    this.bWidth = this.balloonWidth;
    this.bHeight = this.balloonHeight;
    //this.x = 0;
    //this.y = 0;
    this.minFrame = 0;
    this.maxFrame = 720;
    this.x = Math.random() * (canvas.width - 50 - 29) + 29; //(canvas.width + 25);
    this.y = canvas.height + 100;
    this.radius = 25; //all balloons same seize
    this.speed = Math.random() * 2 + 0.5; // random speed between 1 and 3
    this.distance = 0.001; //between balloon & player
    this.counted = false; // to not count at first for score/collission
    this.sound = Math.random() <= 0.5 ? "sound1" : "sound2";
    this.isExploding = false;
    this.possibleYs = [0, 105, 200, 300, 400, 505, 609];
    this.color = randomColor;
  }
  update() {
    this.y -= this.speed; // the balloons moving up depending on the set speed
    // ==== Collision detection player & balloon
    const distanceX = this.x - player.x;
    const distanceY = this.y - player.y;
    this.distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  }
  draw() {
    let actualY;
    switch (this.color) {
      case "orange":
        actualY = this.possibleYs[0];
        break;
      case "green":
        actualY = this.possibleYs[1];
        break;
      case "blue":
        actualY = this.possibleYs[2];
        break;
      case "yellow":
        actualY = this.possibleYs[3];
        break;
      case "red":
        actualY = this.possibleYs[4];
        break;
      case "pink":
        actualY = this.possibleYs[5];
        break;
      case "purple":
        actualY = this.possibleYs[6];
        break;
    }

    // ctx.fillStyle = "blue";
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius + 3, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();
    // ctx.stroke();
    ctx.drawImage(
      balloonImage,
      0,
      actualY,
      this.balloonWidth,
      this.balloonHeight,
      this.x - 60,
      this.y - 61,
      this.radius * 5,
      this.radius * 5,
      this.bWidth,
      this.bHeight
    );
    if (this.isExploding) {
      // here we can iterate through the frames that compose the animation
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
      ctx.drawImage(
        balloonImage,
        110 * (Math.floor(this.game.frame / 4) % 6),
        actualY,
        this.balloonWidth,
        this.balloonHeight,
        this.x - 55,
        this.y - 30,
        this.radius * 4,
        this.radius * 3,
        this.bWidth,
        this.bHeight
      );
    }
  }
}
