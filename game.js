//VARIABLES//
const startButton = document.getElementById("start-button");
const shooter = document.getElementById("player-controlled-shooter");
const backGround = document.getElementById("main-play-area");
const instructions = document.getElementById("instructions-text");
const scoreCounter = document.querySelector("#score span");
let enemyInterval;
let enemy;
let backGroundSong = new Audio("audio/knight2.mp3");

if (localStorage.getItem("highScore")) {
  document.querySelector(
    "#high-score > h2 > span"
  ).innerText = localStorage.getItem("highScore");
} else {
  localStorage.setItem("highScore", 0);
}

startButton.addEventListener("click", event => {
  playGame();
});

function moveUp() {
  let topPosition = window.getComputedStyle(shooter).getPropertyValue("top");
  if (shooter.style.top === "0px") {
    return;
  } else {
    let position = parseInt(topPosition);
    position -= 100;
    shooter.style.top = `${position}px`;
  }
}

function moveDown() {
  let topPosition = window.getComputedStyle(shooter).getPropertyValue("top");
  if (shooter.style.top === "360px") {
    return;
  } else {
    let position = parseInt(topPosition);
    position += 100;
    shooter.style.top = `${position}px`;
  }
}

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  var y = e.clientY; //where mouse is set at//
  shooter.style.top = `${y}px`;
}

function letMobileMove(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveUp();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    moveDown();
  } else if (event.key === " ") {
    console.log(event);
    event.preventDefault();
    fireBatarang();
    console.log("firebatarang");
  }
}

window.addEventListener("keydown", letMobileMove);

function fireBatarang() {
  let batarang = createBatarangElement();
  backGround.appendChild(batarang);
  let batarangNoise = new Audio("audio/effect.mp3");
  batarangNoise.play();
  moveBatarang(batarang);
}

function createBatarangElement() {
  let xPosition = parseInt(
    window.getComputedStyle(shooter).getPropertyValue("left")
  );
  let yPosition = parseInt(
    window.getComputedStyle(shooter).getPropertyValue("top")
  );
  let newBatarang = document.createElement("img");
  newBatarang.src = "images/batarang2.png";
  newBatarang.classList.add("batarang");
  newBatarang.style.left = `${xPosition + 150}px`; //BATARANG TRAVEL X AXIS
  // newBatarang.style.left = 0;
  newBatarang.style.top = `${yPosition - 15}px`;

  return newBatarang;
}

function moveBatarang(batarang) {
  let batarangInterval = setInterval(() => {
    let xPosition = parseInt(batarang.style.left);
    let enemies = document.querySelectorAll(".enemy");
    enemies.forEach(enemy => {
      if (checkBatarangCollision(batarang, enemy)) {
        let explosion = new Audio("audio/explode.mp3");
        explosion.play();
        enemy.src = "images/explosionburst.png";
        enemy.classList.remove("enemy");
        enemy.classList.add("dead-enemy");
        scoreCounter.innerText = parseInt(scoreCounter.innerText) + 100;
      }
    });
    if (xPosition > window.innerWidth) {
      console.log("remove", batarang);
      batarang.style.display = "none";
      clearInterval(batarangInterval);
      return batarang.remove();
    } else {
      batarang.style.left = `${xPosition + 10}px`; //HOW MUCH BATARANG MOVES FROM LEFT TO RIGHT
    }
  }, 10); //speed of batarang speed
}

//below is the pictures of enemy//
const enemyImages = [
  "images/enemy1.gif",
  "images/enemy2.png",
  "images/enemy3.png",
  "images/harley.png"
];

function createEnemy() {
  let newEnemy = document.createElement("img");
  let enemySpriteImg =
    enemyImages[Math.floor(Math.random() * enemyImages.length)];
  newEnemy.src = enemySpriteImg;
  newEnemy.classList.add("enemy");
  newEnemy.style.left = "1200px"; // ENEMIES COMING FROM THE RIGHT X AXIS (DISTANCE)
  newEnemy.style.top = `${Math.floor(Math.random() * 600) + 30}px`; //enemies spread out on y-axis
  newEnemy.classList.add("enemy-transition");
  backGround.appendChild(newEnemy);
  moveEnemy(newEnemy);
}

function moveEnemy(enemy) {
  gameOver();
  let moveEnemyInterval = setInterval(() => {
    let xPosition = parseInt(
      window.getComputedStyle(enemy).getPropertyValue("left")
    );
    if (xPosition <= -100) {
      if (Array.from(enemy.classList).includes("dead-enemy")) {
        enemy.remove();
      } else {
        enemy.remove();
      }
    } else {
      enemy.style.left = `${xPosition - 4}px`;
    }
  }, 5);
}

function checkBatarangCollision(batarang, enemy) {
  let batarangLeft = parseInt(batarang.style.left);
  let batarangTop = parseInt(batarang.style.top);
  let batarangBottom = batarang - 20;
  let enemyTop = parseInt(enemy.style.top);
  let enemyBottom = enemyTop - 30;
  let enemyLeft = parseInt(enemy.style.left);
  if (batarangLeft != 340 && batarangLeft + 40 >= enemyLeft) {
    if (batarangTop <= enemyTop && batarangTop >= enemyBottom) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function gameOver() {
  let enemies = document.querySelectorAll(".enemy");
  let batman = document.querySelectorAll(".shooter");
  console.log(enemies);
  enemies.forEach(enemy => {
    var det1 = enemy.getBoundingClientRect();
    var det2 = shooter.getBoundingClientRect();

    if (
      det1.left < det2.right &&
      det1.right > det2.left &&
      det1.top < det2.bottom &&
      det1.bottom > det2.top
    ) {
      // enemy.src = "images/explosionburst.png"
      shooter.classList.remove("enemy");
      shooter.classList.add("batman-lost");
      let endGame = new Audio("audio/failed.mp3");
      endGame.volume = 0.9;
      endGame.play();
      setTimeout(() => {
        if (
          Number(scoreCounter.innerText) >
          Number(localStorage.getItem("highScore"))
        ) {
          localStorage.setItem("highScore", scoreCounter.innerText);
          backGroundSong.pause();
          backGroundSong.currentTime = 0;
          alert("Batman is proud of your high score");
        }
        backGroundSong.pause();
        backGroundSong.currentTime = 0;
        alert("You're not worthy enough to be Batman");
        location.reload();

        return true;
      }, 100);
    }
  });
}

let spawnRate = 800

function playGame() {
  startButton.style.display = "none";
  instructions.style.display = "none";
  window.addEventListener("keydown", letMobileMove);
  backGroundSong.play();
  console.log(spawnRate)
  let enemyInterval = setInterval(() => {
    createEnemy();
  }, spawnRate); //how many enemies are created
  createEnemy();
}
