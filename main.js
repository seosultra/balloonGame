// ======== Canvas setup ========

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
let score = 0;
let gameFrame = 0;
ctx.font = "50px Geroriga";
let gameSpeed = 1;

// ======== Mouse interactions ========
//limits to the canvas borders
let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
  x: canvas.width / 2, // at the middle of screen
  y: canvas.height / 2,
  click: false,
};
// the event-listener object for mouse down event
canvas.addEventListener("mousedown", function (event) {
  mouse.click = true;
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
  //console.log(mouse.x, mouse.y);
});
// event listener for mouseup event
canvas.addEventListener("mouseup", function (event) {
  mouse.click = false;
});

//============= Player method ===========
const playerLeft = new Image();
playerLeft.src = "multi/fsprite-left.png";
const playerRight = new Image();
playerRight.src = "multi/fsprite-right.png";
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
    //this.moving = false;
  }
  //update method to update the player position to move toward mouse coordinates
  update() {
    const distanceX = this.x - mouse.x; //dx
    const distanceY = this.y - mouse.y; //dy
    // mouse position & player position
    if (mouse.x != this.x) {
      this.x -= distanceX / 10; //slow down the moving speed of player to the mouse position
    }
    if (mouse.y != this.y) {
      this.y -= distanceY / 10;
      //this.moving = true;
    }
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
const player = new Player();
// =========== Balloons Array ===========
const balloonsArray = [];
const balloonImage = new Image();

balloonImage.src = "multi/Ballpop/blue-balloon/1.png";
class Balloon {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 100;
    this.radius = 20; //all balloons same seize
    this.speed = Math.random() * 3 + 1; // random speed between 1 and 3
    this.distance = 0.001; //between balloon & player
    this.counted = false; // to not count at first for score/collission
    this.sound = Math.random() <= 0.5 ? "sound1" : "sound2";
    this.isExploding = false;
  }
  update() {
    this.y -= this.speed; // the balloons moving up depending on the set speed
    // ==== Collision detection player & balloon
    const distanceX = this.x - player.x;
    const distanceY = this.y - player.y;
    this.distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  }
  draw() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.drawImage(
      balloonImage,
      this.x - 30,
      this.y - 30,
      this.radius * 3.7,
      this.radius * 3.7
    );
    if (this.isExploding) {
      // here we can iterate through the frames that compose the animation
    }
  }
}
//assiging audio effect
const poppedSound = document.createElement("audio");
poppedSound.src = "multi/balloon_pop.ogg";
const poppedSound2 = document.createElement("audio");
poppedSound2.src = "multi/balloon_pop.mp3";

function createBalloons() {
  if (gameFrame % 90 == 0) {
    // we run this code every 90 frames
    //we push a new balloon every 90 frames
    balloonsArray.push(new Balloon());
    console.log(balloonsArray.length);
  }
  for (let i = 0; i < balloonsArray.length; i++) {
    balloonsArray[i].update();
    balloonsArray[i].draw();
  }

  // empty the array
  for (let i = 0; i < balloonsArray.length; i++) {
    if (balloonsArray[i].y < 0 - balloonsArray[i].radius * 2) {
      //balloon desapears only once it is totaly outside the canvas >> -this.radius of balloon
      balloonsArray.splice(i, 1); //we delete 1 balloon
    }
    // ===== Collission between balloons and birde
    if (balloonsArray[i]) {
      if (balloonsArray[i].distance < balloonsArray[i].radius + player.radius) {
        console.log("Collided!");
        if (!balloonsArray[i].counted) {
          if (balloonsArray[i].sound == "sound1") {
            poppedSound.play();
          } else {
            poppedSound2.play();
          }

          // here we can set to true the isExploding property of the baloon
          this.isExploding = true;

          score++; // if counted is false twice then we add 1 score
          balloonsArray[i].counted = true; //1 score/collision

          balloonsArray.splice(i, 1); //remove collided balloon
          // after splicing the baloon from the array of baloons, we can set the isExploding property back to false
          this.isExploding = false;

          /// count balloon outside canvas, over 10 is game over
        }
      }
    }
  }
}

//===== Background image
const background = new Image();
background.src = "multi/backg1.jpg";

const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

function createBackround() {
  BG.x1 -= gameSpeed;
  if (BG.x1 < -BG.width) BG.x1 = BG.width;
  BG.x2 -= gameSpeed;
  if (BG.x2 < -BG.width) BG.x2 = BG.width;
  ctx.drawImage(background, BG.x1 + 1, BG.y, BG.width, BG.height);
  ctx.drawImage(background, BG.x2 + 1, BG.y, BG.width, BG.height);
}

//animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createBackround();
  createBalloons();
  player.update(); // calculate player position
  player.draw(); // draw a line between player and mouse & draw the player
  ctx.fillStyle = "black";
  ctx.fillText("score:" + score, 10, 50); //to display the score on the screen
  gameFrame++; // increase the game frame by 1 for every frame ofanimation
  //console.log(gameFrame);
  requestAnimationFrame(animate); // the function will keep calling itself
}

animate();

//to update the mouse position when changing the windows size
window.addEventListener("resize", function () {
  canvasPosition = canvas.getBoundingClientRect();
});
