const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const backImg = new Image(); // Create new <img> element
backImg.src = "./images/road.png"; // Set source path
const carImg = new Image();
carImg.src = "./images/car.png";
let intervalId;

class CarPlayer {
  constructor(x, y, width, height) {
    this.carX = x;
    this.carY = y;
    this.width = width;
    this.height = height;
  }

  moveLeft() {
    this.carX -= 20;
  }

  moveRight() {
    this.carX += 20;
  }

  collisionCheck(Wall) {
    if (
      this.carX < Wall.carX + Wall.width &&
      this.carX + this.width > Wall.carX &&
      this.carY < Wall.carY + Wall.height &&
      this.carY + this.height > Wall.carY
    ) {
      return true;
    } else {
      return false;
    }
  }

  drawCar() {
    ctx.drawImage(carImg, this.carX, this.carY, 50, 75);
  }
}

class Wall extends CarPlayer {

  wallDown() {
    this.carY += 5;
  }

  drawWall() {
    ctx.fillRect(this.carX, this.carY, this.width, this.height);
  }
}

const car = new CarPlayer(canvas.width / 2 - 25, canvas.height - 80, 50, 75);
let clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowLeft":
      car.moveLeft();
      break;

    case "ArrowRight":
      car.moveRight();
      break;
  }
});

let wallCount = 0;
let framecount = 0;
let wallArray = [];
let scoreElement = document.getElementById("score");
let scoreValue = 0;

let animationLoop = () => {
  framecount++;

  if (framecount % 60 == 0) {
    let leftWall =  new Wall(Math.random()*300, Math.random()*100, Math.random()*200,20);
    wallArray.push(leftWall);
    scoreValue++;
    scoreElement.innerHTML = scoreValue;
  }

  clearCanvas();  
  ctx.drawImage(backImg, 0, 0, canvas.width, canvas.height); 

  for (let i = 0; i < wallArray.length; i++) {
    wallArray[i].wallDown();
    if (car.collisionCheck(wallArray[i])) {
      clearInterval(intervalId);
    }
    wallArray[i].drawWall();
  }

  car.drawCar();
};

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    intervalId = setInterval(animationLoop, 16);
  }
};

/* const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let backgroundImg = new Image();
backgroundImg.src = "../images/road.png";

let carImg = new Image();
carImg.src = "../images/car.png";

let intervalId;

class CarPlayer {
  constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  moveLeft(){
    this.x -= 10;
  }

  moveRight(){
    this.x += 10;
  }

  collisionCheck(Barrier){
    if(
      this.x < Barrier.x + Barrier.width &&
      this.x + this.width > Barrier.x &&
      this.y < Barrier.y + Barrier.height &&
      this.y + this.height > Barrier.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  drawCar(){
    ctx.drawImage(carImg, this.x, this.y, 50, 75);
  }
}

class Barrier extends CarPlayer {

  moveDown(){
    this.y += 5;
  }

  drawBarrier(){
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let car = new CarPlayer(canvas.width / 2 - 25, canvas.height - 80, 50, 75);
let clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

//set up window.addEventListener for arrow clicks to move car - but does not need to draw car because the animation loop already draws the car

window.addEventListener('keydown', (event) => {
  switch (event.code){
    case 'ArrowLeft':
      car.moveLeft();
      break;

    case 'ArrowRight':
      car.moveRight();
      break; 
  }
});

let wallCount = 0;
let frameCount = 0; 
let wallArr = [];
let scoreElem = document.getElementById('score');
let scoreValue = 0;

let animationLoop = () => {
  // console.log("loop is running");

  frameCount++;

  if(frameCount % 60 == 0){
    let walls = new Barrier(Math.random() * 300, Math.random() * 100, Math.random() * 200, 20);
    wallArr.push(walls);
    scoreValue++;
    scoreElem.innerHTML = scoreValue;
  }

  //clear the canvas
  clearCanvas();

  //draw the background
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

  // checks collsion
  for (let i = 0; i < wallArr.length; i++){
    wallArr[i].moveDown();
      if (car.collisionCheck(wallArr[i])) {
        clearInterval(intervalId);
      }
  }
  car.drawCar();
};

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    intervalId = setInterval(animationLoop, 16);
  }
};
*/