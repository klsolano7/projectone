const shooter = document.getElementById("player-controlled-shooter");

function moveUp() {
  let topPosition = window.getComputedStyle(shooter).getPropertyValue("top");
  if (shooter.style.top === "0px") {
    return;
  } else {
    let position = parseInt(topPosition);
    if (position > 0) {
      position -= 100;
    }
    console.log(position);
    shooter.style.top = `${position}px`;
  }
}

function moveDown() {
  let topPosition = window.getComputedStyle(shooter).getPropertyValue("top");
  if (shooter.style.top === "360px") {
    return;
  } else {
    let position = parseInt(topPosition);
    // position += 100;
    if (position < 550) {
        position += 100;
      }
    shooter.style.top = `${position}px`;
  }
}

function letMobileMove(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveUp();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    moveDown();
  } else if (event.key === " ") {
    fireBatarang();
  }
}

let time = 50;
const backGround = document.getElementById("main-play-area");
setInterval(() => {
  let x = window
    .getComputedStyle(backGround)
    .getPropertyValue("background-position-x")
    .replace("px", "");

  backGround.style.backgroundPositionX = Number(x) - time + "px";
}, time);

window.addEventListener("keydown", letMobileMove);

function fireBatarang() {
  let batarang = createBatarang();
  backGround.appendChild(batarang);
  moveBatarang(batarang);
}
let counter = 0;
function createBatarang() {
  let xPosition = parseInt(
    window.getComputedStyle(shooter).getPropertyValue("left")
  );
  let yPosition = parseInt(
    window.getComputedStyle(shooter).getPropertyValue("top")
  );

  console.log("Xpos : ", xPosition, yPosition);

  let newBatarang = document.createElement("img");
  newBatarang.src = "images/batarang2.png";
  newBatarang.classList.add(`batarang${counter}`);
  newBatarang.classList.add(`batarang`);

  newBatarang.style.left = `${xPosition + 250}px`;
  newBatarang.style.top = `${yPosition + 130}px`;
  counter++;
  return newBatarang;
  // console.log(newBatarang);
}

function moveBatarang(batarang) {
  let batarangInterval = setInterval(() => {
    let xPosition = parseInt(batarang.style.left);
    if (xPosition === 340) {
      batarang.remove();
    } else {
      batarang.style.left = `${xPosition + 30}px`;
    }
  }, 100);
}

const enemyImages = [
  "images/enemy1.gif",
//   "images/enemy2.png",
//   "images/enemy3.png"
];

function createEnemy() {
  let newEnemy = document.createElement("img");
  newEnemy.setAttribute("class", "enemy")
  let enemyPicture =
    enemyImages[Math.floor(Math.random() * enemyImages.length)];
  console.log(enemyPicture);
  newEnemy.src = enemyPicture;
  newEnemy.classList.add("enemy");
  newEnemy.style.left = "370px";
  newEnemy.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
  backGround.appendChild(newEnemy);
  moveEnemy(newEnemy);
}

function moveEnemy(enemy) {
  let moveEnemyInterval = setInterval(() => {
    let xPosition = parseInt(
      window.getComputedStyle(enemy).getPropertyValue("left")
    );
    if (xPosition <= 50) {
      enemy.remove();
    } else {
      enemy.style.left = `${xPosition - 4}px`;
    }
  }, 30);
}

function checkBatarangCollision(batarang, enemy){
  let batarangLeft = parseInt(batarang.style.left);
  let batarangTop = parseInt(batarang.style.top);
  let batarngBottom = batarangTop - 20;
  let enemyTop = parseFloat(enemy.style.top);
  let enemyBottom = parseFloat(enemyTop - 30);
  let enemyLeft = parseInt(enemy.style.left);
  
  if (batarangLeft != 340 && batarangLeft +)
  
  
  
  }
  
  
  window.setInterval(() => {
    createEnemy();
    checkBatarangCollision()
  }, 1000);









// var ctx = document.getElementById("canvas").getContext('2d');

// let batWing = new Image();
// batWing.src = 'images/batwing2.png'

// var mobile = {
//     img: batWing,
//     x: 100,
//     y:100,
//     speed: 10,
//     height: 20,
//     width: 30,

//     move: function() {
//       this.x += this.speed;
//       this.x %= canvas.width;
//     },

//     draw: function() {
//       ctx.drawImage(this.img, this.x,this.y, this.width, this.height);
//     }
//   };

// setInterval(function(){

//     draw();
//     update();

// });

// function draw(){
// mobile.draw();
// console.log("hi")
// }

// function update(){

// }

// function game(){

// }
