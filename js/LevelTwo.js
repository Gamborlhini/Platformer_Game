var canvas, fireyes, ctx, sx = 0,
  x = 2,
  y = 0,
  dx = 5,
  dy = 20,
  direction = "right",
  playerHealth = 6;
var rect, shooting = false,
  velocityright = 0,
  velocityleft = 0,
  holdingblock = true,
  speedright = 2,
  speedleft = -2,
  gravityspeed = 2.7,
  gravityspeed2 = 3.7,
  velocityup = 0,
  char, groundclass, collision = false,
  imageObj = new Image(),
  imagePortal = new Image(),
  imageCoin = new Image(),
  imageLeftLadder = new Image(),
  imageRightLadder = new Image(),
  imageEnemy = new Image();
imageObj.src = "../imgs/Slime.JPG";
imagePortal.src = "../imgs/EndPortal.png";
imageCoin.src = "../imgs/Coin.png";
imageEnemy.src = "../imgs/Enemy.png";
imageLeftLadder.src = "../imgs/RightLadder.png";
imageRightLadder.src = "../imgs/LeftLadder.png";
var grounds = [];
var belowgrounds = [];
for (var i = 0; i < 5; i++) {
  grounds[i] = false;
  belowgrounds[i] = false;
}
var placeblockcollision = [false];
var coins = [false, false, false];
var ladders = [false, false];
  barwidth = 100;
xv = 0;
var ammo = 2;
platformmove = 1;
coinscollected = 0;
health = 500;
healthminus = 0;
reloading = false;
winning = false;
winblock = false;
money2 = 100;
platformmoves = 1;
platformmovesr = 1;
climbing = false;
flying = false;
flyinglength = 1000;
timeoutmove = 5;
rightcollision = false;
leftcollision = false;
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
console.log("canvas established");
//Collision detection adapted to work with coins. Thisss is the player. coinnumber is the number that the coin is in the array and coinname is the object itself
function coinDetect(thisss, coinnumber, coinname) {
  if (thisss.x < coinname.x + coinname.width &&
    thisss.y < coinname.y + coinname.height &&
    thisss.height + thisss.y > coinname.y &&
    thisss.x + thisss.width > coinname.x && coins[coinnumber] != true) {
    coinscollected += 50;
    money2 += 10;
    coins[coinnumber] = true;
  }
}
//Detects if the player has hit the win block
function winDetect(thiss, platform) {
  winblock = false;
  if (thiss.x < platform.x + platform.width &&
    thiss.y < platform.y + platform.height &&
    thiss.height + thiss.y > platform.y &&
    thiss.x + thiss.width > platform.x &&
    coinscollected > 149) {
    winning = true;
    winblock = true;
  }
}
function winRedirect() {
  if (winblock == true) {
    location.assign("../html/LevelThree.html");
  }
}
//Reloading function. Times how fast you can reload.
function reloading() {
  if (reloading === true) {
    barwidth += 1;
  }
}
//Class for enemies
class enemy {
  constructor(height, width, x, y, color) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.color = color;
    this.dead = false;
  }
  //renders the enemy using the usual rendering function
  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    if (vshealth <= 0) {
      this.dead = true;
    }
  }
  //"Kills" the enemy. (Checks if the enemy's health is 0 and if so it unrenders)
  checkdead() {
    if (vshealth <= 0) {
      this.dead = true;
    }
  }
}
vshealth = 3;
//General Rectangle stuff
class rectangle {
  constructor(height, width, x, y, color) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.color = color;
  }
  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  collisionDetect(other) {
    if (this.x < other.x + other.width &&
      this.y < other.y + other.height &&
      this.height + this.y > other.y &&
      this.x + this.width > other.x) {
      collision = true;
    }
  }
}
//Gravity
function gravity() {
  if (grounds.some(isTrue) == false && winblock == false&&climbing==false) {
    y += gravityspeed;
  }
  if (belowgrounds.some(isTrue)==true&&climbing==false){
    y +=gravityspeed2;
  }
}
//Random isTrue function
function isTrue(element) {
  return element;
}
//Player firing function
function fire() {
  if (fireyes == true) {
    var shot = new rectangle(5, 5, x + sx, y, "black");
    shot.render();
    console.log("shot rendered");
    //This section makes the player shoot in the direction its facing
    if (direction == "left") {
      shooting = true;
      setTimeout(function() {
        shooting = false;
        shot = "null";
        sx = 0;
      }, 250);
      sx -= 30;
      console.log(sx);
      console.log("speed set");
    } else if (direction == "right") {
      shooting = true;
      setTimeout(function() {
        shooting = false;
        shot = "null";
        sx = 0;
      }, 500);
      sx += 30;
      console.log("speed set");
    } else if (direction = "up") {
      //Shoot up
    } else {
      location.reload(true);
    }
  }
}
//Ground detection so Gravity doesn't pull you off screen
function groundDetect(groundblock, thiss, variable) {
  if (thiss.x < groundblock.x + groundblock.width &&
    thiss.y < groundblock.y + groundblock.height &&
    thiss.height + thiss.y > groundblock.y &&
    thiss.x + thiss.width > groundblock.x) {
    grounds[variable] = true;
  } else {
    grounds[variable] = false;
  }
}
function belowGroundDetect(groundblock, thiss, variable) {
  if (thiss.x < groundblock.x + groundblock.width &&
    thiss.y < groundblock.y + groundblock.height &&
    thiss.height + thiss.y > groundblock.y &&
    thiss.x + thiss.width > groundblock.x) {
    belowgrounds[variable] = true;
  } else {
    belowgrounds[variable] = false;
  }
}
function ladderDetect(ladder, thiss, variable) {
  if (thiss.x < ladder.x + ladder.width &&
    thiss.y < ladder.y + ladder.height &&
    thiss.height + thiss.y > ladder.y &&
    thiss.x + thiss.width > ladder.x) {
    ladders[variable] = true;
  } else {
    ladders[variable] = false;
  }
}
//Renders em all
function drawNew() {
  var ground3 = {
    height: 10,
    width: 200,
    x: 170,
    y: 150,
    color: "grey"
  };
  var ground4 = {
    height: 10,
    width: 200,
    x: 0,
    y: 225,
    color: "grey"
  };
  var ground5 = {
    height: 10,
    width: 200,
    x: 345,
    y: 225,
    color: "grey"
  };
  var belowground3 = {
    height: 1,
    width: 200,
    x: 170,
    y: 159,
    color: "grey"
  };
  var belowground4 = {
    height: 1,
    width: 200,
    x: 0,
    y: 234,
    color: "grey"
  };
  var belowground5 = {
    height: 1,
    width: 200,
    x: 345,
    y: 234,
    color: "grey"
  };
  var mainPlayer = {
    height: 18,
    width: 25,
    x: x,
    y: y,
    color: "purple"
  };
  var reloadingbar = {
    height: 10,
    width: 10 + barwidth,
    x: 10,
    y: 370,
    color: "grey"
  };
  var endofbar = {
    height: 12,
    width: 2,
    x: 144,
    y: 370,
    color: "blue"
  };
  var healthbar = {
    height: 10,
    width: 500 - healthminus,
    x: 10,
    y: 350,
    color: "red"
  };
  var coin1 = {
    height: 20,
    width: 20,
    x: 250,
    y: 120,
    color: "black"
  };
  var coin2 = {
    height: 20,
    width: 20,
    x: 100,
    y: 195,
    color: "black"
  };
  var coin3 = {
    height: 20,
    width: 20,
    x: 440,
    y: 195,
    color: "black"
  };
  var ladderL = {
    height: 95,
    width: 60,
    x: 124,
    y: 130,
    color: "yellow"
  }
  var ladderR = {
    height: 95,
    width: 60,
    x: 354,
    y: 130,
    color: "yellow"
  }
  var moneybar = {
    height: 10,
    width: 0 + money2,
    x: 400,
    y: 50,
    color: "gold"
  };
  var victoryplatform = {
    height: 60,
    width: 60,
    x: 580,
    y: 180,
    color: "blue"
  };
  var platformblock1 = {
    height: 10,
    width: 10,
    x: 500,
    y: 280,
    color: "green"
  };
  var platformblock2 = {
    height: 10,
    width: 10,
    x: 50,
    y: 280,
    color: "green"
  };
  ladderL = new rectangle(ladderL.height, ladderL.width, ladderL.x, ladderL.y, ladderL.color);
  ladderR = new rectangle(ladderR.height, ladderR.width, ladderR.x, ladderR.y, ladderR.color);
  platformblock1 = new rectangle(platformblock1.height, platformblock1.width, platformblock1.x, platformblock1.y, platformblock1.color);
  platformblock2 = new rectangle(platformblock2.height, platformblock2.width, platformblock2.x, platformblock2.y, platformblock2.color);
  coin1 = new rectangle(coin1.height, coin1.width, coin1.x, coin1.y, coin1.color);
  coin2 = new rectangle(coin2.height, coin2.width, coin2.x, coin2.y, coin2.color);
  coin3 = new rectangle(coin3.height, coin3.width, coin3.x, coin3.y, coin3.color);
  moneybar = new rectangle(moneybar.height, moneybar.width, moneybar.x, moneybar.y, moneybar.color);
  victoryplatform = new rectangle(victoryplatform.height, victoryplatform.width, victoryplatform.x, victoryplatform.y, victoryplatform.color);
  reloadingbar = new rectangle(reloadingbar.height, reloadingbar.width, reloadingbar.x, reloadingbar.y, reloadingbar.color);
  endofbar = new rectangle(endofbar.height, endofbar.width, endofbar.x, endofbar.y, endofbar.color);
  healthbar = new rectangle(healthbar.height, healthbar.width, healthbar.x, healthbar.y, healthbar.color);
  rect = new rectangle(mainPlayer.width, mainPlayer.height, mainPlayer.x, mainPlayer.y, mainPlayer.color);
  ground3render = new rectangle(ground3.height, ground3.width, ground3.x, ground3.y, ground3.color);
  ground4render = new rectangle(ground4.height, ground4.width, ground4.x, ground4.y, ground4.color);
  ground5render = new rectangle(ground5.height, ground5.width, ground5.x, ground5.y, ground5.color);
  belowground3render = new rectangle(belowground3.height, belowground3.width, belowground3.x, belowground3.y, belowground3.color);
  belowground4render = new rectangle(belowground4.height, belowground4.width, belowground4.x, belowground4.y, belowground4.color);
  belowground5render = new rectangle(belowground5.height, belowground5.width, belowground5.x, belowground5.y, belowground5.color);
  groundDetect(ground3, mainPlayer, 2);
  groundDetect(ground4, mainPlayer, 3);
  groundDetect(ground5, mainPlayer, 4);
  ladderDetect(ladderL, mainPlayer, 0);
  ladderDetect(ladderR, mainPlayer, 1);
  belowGroundDetect(belowground3, mainPlayer, 2);
  belowGroundDetect(belowground4, mainPlayer, 3);
  belowGroundDetect(belowground5, mainPlayer, 4);
  coinDetect(mainPlayer, 0, coin1);
  coinDetect(mainPlayer, 1, coin2);
  coinDetect(mainPlayer, 2, coin3);
  winDetect(mainPlayer, victoryplatform);
  winRedirect();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1000, 5000);
  ctx.fillStyle = "black";
  ctx.font = "20px Arial"
  ctx.fillText(`Hold B to climb the ladder`, 20, 30)
  //  if (direction == "right") {
  //  ctx.drawImage(imageRight, x + 5, y - 20, 25, 25);
  ///  }
  //  if (direction == "left") {
  //    ctx.drawImage(imageLeft, x - 5, y - 22, 25, 25);
  //  }
  if (playerHealth > 0) {
    ctx.drawImage(imageObj, x, y, 25, 18);
  } else {
    ctx.drawImage(imageObj, x, y, 25, 18);
    x = 25;
    y = 18;
    healthminus = 0;
    playerHealth = 6;
  }
  if (reloading === true) {
    barwidth += 1;
  }
  if (reloading == false) {
    barwidth = 0;
  }
  ground3render.render();
  ground4render.render();
  ground5render.render();
  reloadingbar.render();
  //moneybar.render();
  ctx.drawImage(imageLeftLadder, ladderL.x, ladderL.y, ladderL.width, ladderL.height);
  ctx.drawImage(imageRightLadder, ladderR.x, ladderR.y, ladderR.width, ladderR.height);
  if (coinscollected > 149) {
    ctx.drawImage(imagePortal, victoryplatform.x, victoryplatform.y, victoryplatform.width, victoryplatform.height);
  }
  endofbar.render();
  if (coins[0] == false) {
    ctx.drawImage(imageCoin, coin1.x, coin1.y, coin1.width, coin1.height);
  }
  if (coins[1] == false) {
    ctx.drawImage(imageCoin, coin2.x, coin2.y, coin2.width, coin2.height);
  }
  if (coins[2] == false) {
    ctx.drawImage(imageCoin, coin3.x, coin3.y, coin3.width, coin3.height);
  }
  if (healthminus < 600) {
    healthbar.render();
  }
  if (ladders.some(isTrue)==false){
    climbing = false;
  }
  gravity();
  moveSide();
  moveUp();
  fire();
  //reloading();
}

function moveUp() {
  y -= velocityup;
}

function moveSide() {
  x += velocityright;
  x += velocityleft;
}
//Also helps with movement
function doKeyUp(a) {
  switch (a.keyCode) {
    case 65:
      velocityleft = 0;
      break;
    case 66:
      climbing = false;
    case 68:
      velocityright = 0;
      break;
    case 70:
      fireyes = false;
      break;
    case 87:
      if (flying === true) {
        velocityup = 0;
      }
      break;
  }
}
//This is the function that takes keystrokes and turns it into movement
function doKeyDown(a) {
  switch (a.keyCode) {
    case 65:
      /*left*/
      if (collision == false && x > 0) {
        velocityleft = speedleft;
        direction = "left";
        imageObj.src = "../imgs/Slime.JPG";
        //player=playerLeft;
      } else {
        console.log("we got a hit");
      }
      break;
    case 66:
      if(ladders.some(isTrue)==true){
        y-=3;
        climbing=true;
      }
      break;
    case 68:
      /*right*/
      if (collision == false && x < 980) {
        velocityright = speedright;
        direction = "right";
        imageObj.src = "../imgs/Slime.JPG";
        //x=x+dx
        //player=playerRight;
      } else {
        console.log("we got a hit");
      }
      break;
    case 87:
      if (flying == false) {
        if (collision == false && y > 0 && grounds.some(isTrue) == true || winblock === true || placeblockcollision.some(isTrue) == true) {
          velocityup = 8;
          setTimeout(function() {
            velocityup = 0;
          }, 100);
        }
      }
      if (flying === true) {
        velocityup = 2;
        flyinglength -= 100;
      }
      break;
    case 70:
      if (shooting == false && ammo > 0 && reloading == false && healthminus < 600) {
        fireyes = true;
        ammo -= 1;
      }
      break;
    case 82:
      if (reloading == false) {
        reloading = true;
        setTimeout(function() {
          ammo = 2;
          reloading = false;
        }, 2000);
      }
      break;
  }
}
//Adds Event Listeners for up and down
window.addEventListener("keyup", doKeyUp, true);
window.addEventListener("keydown", doKeyDown, true);
console.log("keydown established");
//Loops the program
// NOTE: Changing this will also affect the speed of the game
setInterval(drawNew, 16);
console.log("interval set")
/**/
class enemyAI {
  constructor(height, width, x, y, color) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.color = color;
    this.dead = false;
  }
  hit(healthvar) {
    healthvar -= 1;
  }
  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.height, this.width, this.x, this.y);
  }
}
