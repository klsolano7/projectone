



const shooter = document.getElementById("player-controlled-shooter")
const backGround = document.getElementById("main-play-area");
function moveUp(){
  let topPosition = window.getComputedStyle(shooter).getPropertyValue('top');
  if(shooter.style.top === "0px"){
    return
  } else {
    let position = parseInt(topPosition);
    position -= 4;
    shooter.style.top = `${position}px`
  }
}

function moveDown(){
  let topPosition = window.getComputedStyle(shooter).getPropertyValue('top');
  if(shooter.style.top === "360px"){
    return
  } else {
    let position = parseInt(topPosition)
    position += 4;
    shooter.style.top = `${position}px`
  }
}

document.addEventListener("mousemove", mouseMoveHandler, false)

function mouseMoveHandler(e){
  var y = e.clientY - 40;
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
    fireBatarang();
  }
}

window.addEventListener("keydown", letMobileMove)

function fireBatarang(){
  let batarang = createBatarangElement()
  backGround.appendChild(batarang)
  let batarangNoise = new Audio('audio/effect.mp3')
  batarangNoise.play();
  moveBatarang(batarang)

}

function createBatarangElement(){
  let xPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('left'))
  let yPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('top'))
  let newBatarang = document.createElement('img')
  newBatarang.src = 'images/batarang2.png'
  newBatarang.classList.add('batarang')
  newBatarang.style.left = `${xPosition}px` //BATARANG TRAVEL X AXIS
  newBatarang.style.top =`${yPosition - 4}px`

  return newBatarang;
}

function moveBatarang (batarang) {
  let batarangInterval = setInterval(() => {
    let xPosition = parseInt(batarang.style.left)
    let enemies = document.querySelectorAll(".enemy")
    enemies.forEach(enemy =>{
      if (checkBatarangCollision(batarang, enemy)){
        let explosion = new Audio('audio/explode.mp3')
        explosion.play()
        enemy.src = 'images/explosionburst.png'
        enemy.classList.remove("enemy")
        enemy.classList.add('dead-enemy')
        console.log('boom')
      }
    })
    if(xPosition === 340){
      batarang.style.display = 'none'
      batarang.remove()
    } else {
      batarang.style.left = `${xPosition + 4}px`
    }
  }, 10) //speed of batarang speed
}









//below is the pictures of enemy//
const enemyImages = [ 
  "images/enemy1.gif",
  "images/enemy2.png",
  "images/enemy3.png"
];

function createEnemy() {
  let newEnemy = document.createElement("img")
  let enemySpriteImg = enemyImages[Math.floor(Math.random()*enemyImages.length)];
  newEnemy.src = enemySpriteImg
  newEnemy.classList.add('enemy')
  newEnemy.style.left = '670px' // ENEMIES COMING FROM THE RIGHT X AXIS (DISTANCE)
  newEnemy.style.top = `${Math.floor(Math.random() * 330) + 30}px`
  backGround.appendChild(newEnemy)
  moveEnemy(newEnemy)
}

function moveEnemy(enemy){
  let moveEnemyInterval = setInterval(()=>{
    let xPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue('left'))
    if (xPosition <= -30){
      enemy.remove()
    } else {
      enemy.style.left = `${xPosition - 4}px`
    }
  }, 10)
}

function checkBatarangCollision(batarang, enemy){
  let batarangLeft = parseInt(batarang.style.left)
  let batarangTop = parseInt(batarang.style.top)
  let batarangBottom = batarang - 20;
  let enemyTop = parseInt(enemy.style.top)
  let enemyBottom = enemyTop - 30;
  let enemyLeft = parseInt(enemy.style.left)
  if(batarangLeft != 340 && batarangLeft + 40 >= enemyLeft){
    if( (batarangTop <= enemyTop && batarangTop >= enemyBottom) ){
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

// function moveBatarang(batarang){
//   let batarangInterval = setInterval(()=>{
//     let xPosition = parseInt(batarang.style.left)
//     let enemies = document.querySelectorAll(".enemy")
//     enemies.forEach(enemy => {
//       if(checkBatarangCollision(batarang, enemy)){
//         let explosion = new Audio('audio/explode.mp3')
//         explosion.play()
//         enemy.src = 'image/explosionburst.png'
//         enemy.classList.remove("enemy")
//         enemy.classList.add('dead-monster')
//       }
//     })
//     if (xPosition = 340){
//       batarang.style.display = 'none'
//       batarang.remove()
//     } else{
//       batarang.style.left = `${xPosition + 4}px`
//     }
//   },10);
// }




setInterval(function(){

  createEnemy()


}, 1000);

