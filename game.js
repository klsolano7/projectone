const shooter = document.getElementById("player-controlled-shooter");

//key move up function below//
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
//key move down function below//
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

//ADDED MOUSE EVENT LISTENER
document.addEventListener("mousemove", mouseMoveHandler, false)

function mouseMoveHandler(e){
  var y = e.clientY - 140;
  shooter.style.top = `${y}px`;
  // var coor = "Coordinates: (y)";

}

//FUNTION TO MAKE BATMOBILE MOVE
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
let game = setInterval(() => {
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
  setTimeout(()=>
  {
    batarang.remove()
  },1000)
  //moveBatarang(batarang);
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

  // newBatarang.style.left = `${xPosition + 250}px`;
   newBatarang.style.top = `${yPosition + 130}px`;
  counter++;
  return newBatarang;
  // console.log(newBatarang);
}

// function moveBatarang(batarang) {
//   let xPosition = parseInt(batarang.style.left);

//   let batarangInterval = setInterval(() => {
//     if ( xPosition > window.innerWidth  ) {
//       batarang.remove();
//       clearInterval(batarangInterval)
//     } else {
//       batarang.style.left = `${xPosition += 100}px`;
//     }
//     let enemies = document.querySelectorAll('.enemy')
//     //console.log(enemies, typeof enemies)
//     enemies.forEach(enemy=>{
//       let collided = checkBatarangCollision(batarang, enemy)
//       if( collided ) {
//         console.log(  'collided',collided  ) 

//         enemy.remove()
//         //clearInterval(game)
//         //clearInterval(createEnemyInterval)
//         //debugger
//       }
//     })
//   }, 100);
// }






//below is the pictures of enemy//
const enemyImages = [ 
  "images/enemy1.gif",
  "images/enemy2.png",
  "images/enemy3.png"
];

// creation of enemies below/
function createEnemy() {
  let newEnemy = document.createElement("img");
  newEnemy.setAttribute("class", "enemy");
  let enemyPicture =
    enemyImages[Math.floor(Math.random() * enemyImages.length)];
  console.log(enemyPicture);
  newEnemy.src = enemyPicture;
  newEnemy.classList.add("enemy");
  newEnemy.style.left = window.innerWidth + 'px';
  newEnemy.style.top = `${Math.floor(Math.random() * 630) + 50}px`;
  backGround.appendChild(newEnemy);
  moveEnemy(newEnemy);
}

//move the enemy funtion below//
function moveEnemy(enemy) {
  let moveEnemyInterval = setInterval(() => {
    let xPosition = parseInt(
      window.getComputedStyle(enemy).getPropertyValue("left")
    );
    if (xPosition <= -20) {
      enemy.remove();
    } else {
      enemy.style.left = `${xPosition - 140}px`; //enemies speed 
    }
  }, 3);
}



// function isCollide(a, b) {


//   return !(
//       ((a.y + a.height) < (b.y)) ||
//       (a.y > (b.y + b.height)) ||
//       ((a.x + a.width) < b.x) ||
//       (a.x > (b.x + b.width))
//   );
// }



//batrang collision is detected below//
function checkBatarangCollision(batarang, enemy) {
  let batarangLeft = parseInt(batarang.style.left);
  let batarangTop = parseInt(batarang.style.top);
  let batarangBottom = batarangTop - 50;
  let enemyTop = parseFloat(enemy.style.top);
  let enemyBottom = parseFloat(enemyTop - 30);
  let enemyLeft = parseInt(enemy.style.left);


  return !(
    ((batarangTop + 20) < (enemyTop)) ||
    (batarangTop > (enemyTop + 40)) ||
    ((batarangLeft) < enemyLeft) ||
    (batarangLeft > (enemyLeft + 40))
  ) ;

  //console.log(batarangLeft, batarangTop, batarangBottom, enemyTop, enemyBottom, enemyLeft)
  // if (batarangLeft != 340 && batarangLeft + 40 >= enemyLeft) {
  //   if (batarangTop <= enemyTop && batarangTop >= enemyBottom) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // } else {
  //   return false;
  // }
}



let difficulty = 1; //number of enemies
let createEnemyInterval = window.setInterval(() => {
  createEnemy();


  let batarangs = document.querySelectorAll('.batarang')

  let enemies = document.querySelectorAll('.enemy')
  //console.log(enemies, typeof enemies)
  batarangs.forEach(batarang=>{
    //console.log(bara)
    //console.log( window.getComputedStyle(batarang).getPropertyValue("left") )
    let batarangLeft = parseInt(batarang.style.left);
    console.log(batarangLeft)
    if(batarangLeft > window.innerWidth){
      batarang.remove()
    }
    enemies.forEach(enemy=>{
      let collided = checkBatarangCollision(batarang, enemy)
      if( collided ) {
        console.log(  'collided',collided  ) 

        enemy.remove()
        //clearInterval(game)
        //clearInterval(createEnemyInterval)
        //debugger
      }
    })
  })


}, 202/difficulty);


function movingBatarang(batarang){
  batarangInterval = setInterval(()=>{
    let xPosition= parseInt(batarang.style.left)
    let enemies = document.querySelectorAll(".enemies")
    enemies.forEach(enemies => {
      if(checkBatarangCollision(laser, enemies)){
        enemies.src = "images/explosionburst.png"
        enemies.classList.remove("enemies");
        enemies.classList.add("dead-enemies");
      }
    });
      if(xPosition === 340){
        batarang.style.display = 'none'
        laser.remove()
      } else{
        batarang.style.left = `${xPosition + 4}px`
      }
    }, 10);
}



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
