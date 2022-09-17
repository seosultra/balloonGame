const startScreenElement = document.getElementById("start-screen");
const gameScreenElement = document.getElementById("game-screen");
const gameOverScreenElement = document.getElementById("game-over-screen");

let isRunning = false;

const startButton = startScreenElement.querySelector("button");
const playAgainButton = gameOverScreenElement.querySelector("button");

const game = requestAnimationFrame(
  animate,
  gameScreenElement,
  gameOverScreenElement
);

startButton.addEventListener("click", () => {
  //animate();
  isRunning = true;
  animate();
  startScreenElement.style.display = "none";
  gameScreenElement.style.display = "";
});

playAgainButton.addEventListener("click", () => {
  window.location.reload();
  //player.x = canvas.width / 2;
  //player.y = canvas.height / 2;
  isRunning = true;

  //animate();
  console.log("Hello from the play again button.");
  gameOverScreenElement.style.display = "none";
  gameScreenElement.style.display = "";
});

// ======== Canvas setup ========

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
let score = 0;
let gameFrame = 0;
ctx.font = "50px Geroriga";
let gameSpeed = 0.5;

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
playerLeft.src = "./multi/fsprite-left.png";
const playerRight = new Image();
playerRight.src = "./multi/fsprite-right.png";

const player = new Player();
// =========== Balloons Array ===========
const balloonsArray = [];
const balloonImage = new Image();

balloonImage.src = "./multi/balloon1.png";

//assiging audio effect
const poppedSound = document.createElement("audio");
poppedSound.src = "./multi/balloon_pop.ogg";
const poppedSound2 = document.createElement("audio");
poppedSound2.src = "./multi/balloon_pop.mp3";

function createBalloons() {
  if (gameFrame % 90 == 0) {
    // we run this code every 90 frames
    //we push a new balloon every 90 frames
    const colors = [
      "orange",
      "green",
      "blue",
      "yellow",
      "red",
      "pink",
      "purple",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    console.log(randomColor);
    balloonsArray.push(new Balloon(randomColor));
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
        balloonsArray[i].isExploding = true;
        console.log("Collided!");
        if (!balloonsArray[i].counted) {
          if (balloonsArray[i].sound == "sound1") {
            poppedSound.play();
          } else {
            poppedSound2.play();
          }

          // here we can set to true the isExploding property of the baloon

          score++; // if counted is false twice then we add 1 score
          balloonsArray[i].counted = true; //1 score/collision

          balloonsArray.splice(i, 1); //remove collided balloon
          // after splicing the baloon from the array of baloons, we can set the isExploding property back to false
          // this.isExploding = false;

          /// count balloon outside canvas, over 10 is game over
        }
      }
    }
  }
}

//===== Background image
const background = new Image();
background.src = "./multi/backg1.jpg";

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
  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);

  BG.x2 -= gameSpeed;
  if (BG.x2 < -BG.width) BG.x2 = BG.width;
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}
/////// Enemy
let catArrays = [];
const enemy1 = new Enemy();

function createEnemies() {
  if (gameFrame % 200 == 0) catArrays.push(new Enemy());
  for (let i = 0; i < catArrays.length; i++) {
    catArrays[i].draw();
    catArrays[i].update();
  }
  console.log("catArray :" + catArrays.length);
  //empty catArray
  for (let i = 0; i < catArrays.length; i++) {
    if (catArrays[i].y < 0 - catArrays[i].radius * 2) {
      //balloon desapears only once it is totaly outside the canvas >> -this.radius of balloon
      catArrays.splice(i, 1); //we delete 1 balloon
    }
  }
}
//animation loop
function animate() {
  console.log("Animate is running.");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createBackround();
  createBalloons();
  createEnemies();
  player.update(); // calculate player position
  player.draw(); // draw a line between player and mouse & draw the player
  ctx.fillStyle = "black";
  ctx.fillText("score:" + score, 10, 50); //to display the score on the screen
  gameFrame++; // increase the game frame by 1 for every frame ofanimation
  console.log(gameFrame);
  if (isRunning) {
    requestAnimationFrame(animate); // the function will keep calling itself
  }
}

//to update the mouse position when changing the windows size
window.addEventListener("resize", function () {
  canvasPosition = canvas.getBoundingClientRect();
});
