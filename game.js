const background = new Image();
background.src = "./multi/backg1.jpg";

class Game {
  constructor() {
    this.BG = {
      x1: 0,
      x2: canvas.width,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    };
    this.gameSpeed = 0;
    this.player = new Player(this);
  }

  runLogic() {
    this.createBackground();
  }

  draw() {
    const BG = this.BG;
    ctx.drawImage(background, BG.x1 + 1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2 + 1, BG.y, BG.width, BG.height);
  }

  loop() {
    this.runLogic();
    this.draw();
    requestAnimationFrame(this.loop);
  }

  // plus any additional methods we may need
  createBackround() {
    const BG = this.BG;
    BG.x1 -= this.gameSpeed;
    if (BG.x1 < -BG.width) BG.x1 = BG.width;
    BG.x2 -= this.gameSpeed;
    if (BG.x2 < -BG.width) BG.x2 = BG.width;
  }
}
