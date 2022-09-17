const catBalloonImage = new Image();
catBalloonImage.src = "./multi/catB.png";
let gameOv = false;

class Enemy {
  constructor() {
    this.catBalloonWidth = 153; // for single catBalloon
    this.catBalloonHeight = 250;
    this.bWidth = this.catBalloonWidth;
    this.bHeight = this.catBalloonHeight;
    //this.x = 0;
    //this.y = 0;
    this.minFrame = 0;
    this.maxFrame = 720;
    this.x = Math.random() * (canvas.width - 20);
    this.y = canvas.height + 100;
    this.radius = 18; //all catBalloons same seize
    this.speed = Math.random() * 3 + 1; // random speed between 1 and 3
    this.distance = 0.001; //between catBalloon & player
    this.counted = false; // to not count at first for score/collission
    //this.sound = Math.random() <= 0.5 ? "sound1" : "sound2";
    this.isExploding = false;
    //this.possibleYs = [0, 100, 200, 300, 400, 500, 600];
    //this.color = randomColor;
  }
  update() {
    this.y -= this.speed; // the catBalloons moving up depending on the set speed

    // ==== Collision detection player & catBalloon
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < this.radius + player.radius) {
      console.log("gameOver");
      gameOver();
    }
    function gameOver() {
      // ctx.fillStyle = "black";
      // ctx.fillText("GAME OVER, you reached score " + score, 30, 250);
      const gameScreenElement = document.getElementById("game-screen");
      const gameOverScreenElement = document.getElementById("game-over-screen");
      catArrays = [];
      isRunning = false;
      gameOverScreenElement.style.display = "";
      gameScreenElement.style.display = "none";
      //gameOv = true;
    }
  }

  draw() {
    /*, 
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
*/
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.drawImage(
      catBalloonImage,
      0,
      0,
      this.catBalloonWidth,
      this.catBalloonHeight,
      this.x - 70,
      this.y - 33,
      this.radius * 7,
      this.radius * 7,
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
        catBalloonImage,
        110 * (Math.floor(this.game.frame / 4) % 6),
        actualY,
        this.catBalloonWidth,
        this.catBalloonHeight,
        this.x - 85,
        this.y - 100,
        this.radius * 4,
        this.radius * 3.7,
        this.bWidth,
        this.bHeight
      );
    }
  }
}
