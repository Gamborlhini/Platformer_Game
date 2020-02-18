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
  imageMortar = new Image(),
  imageMortarshot = new Image(),
  imageEnemy = new Image();
imageObj.src = "../imgs/Slime.JPG";
imagePortal.src = "../imgs/EndPortal.png";
imageCoin.src = "../imgs/Coin.png";
imageEnemy.src = "../imgs/Enemy.png";
imageMortar.src = "../imgs/Mortar.png";
imageMortarshot.src = "../imgs/Mortarshot.png";
var grounds = [];
var belowgrounds = [];
var splatsound = document.getElementById("splat");
for (var i = 0; i < 5; i++) {
  grounds[i] = false;
  belowgrounds[i] = false;
}
var coins = [false, false, false];
var vssx = 0,
  barwidth = 100;
xv = 0;
var ammo = 2;
platformmove = 1;
enemyhit = false;
coinscollected = 0;
health = 500;
healthminus = 0;
reloading = false;
winning = false;
winblock = false;
money2 = 100;
mortarx = 0;
startingy = 200;
mortary = 0;
mortarshoots = false;
platformmoves = 1;
platformmovesr = 1;
flying = false;
flyinglength = 1000;
timeoutmove = 5;
rightcollision = false;
leftcollision = false;
mortarchange = 0;
mortarchange2 = 0.6;
mortarcollision = false;
var currentx = 0;
mortarchangex = 0.25;
var currenty = 0;
mortarchangey = -0.6;
mortarshot1 = 1.5;
mortarshot2 = 0;
mortarshot3 = -1.2;
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
    location.assign("../html/LevelEight.html");
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
  //hit function allows for the enemy to lose health
  hit() {
    vshealth -= 1;
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
  if (grounds.some(isTrue) == false && winblock == false) {
    y += gravityspeed;
  }
  if (belowgrounds.some(isTrue)==true){
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
// BUG: Collision Detection for player (Currently glitchy)
function placeableDetect(placeblock, thiss, variable) {
  if (thiss.x < placeblock.x + placeblock.width &&
    thiss.y < placeblock.y + placeblock.height &&
    thiss.height + thiss.y > placeblock.y &&
    thiss.x + thiss.width > placeblock.x && holdingblock == false) {
    placeblockcollision[variable] = true;
  } else {
    placeblockcollision[variable] = false;
  }
}
// All of the direction changes help the player change directions smoothly
function directionChange(thiss, other) {
  if (thiss.x < other.x + other.width &&
    thiss.y < other.y + other.height &&
    thiss.height + thiss.y > other.y &&
    thiss.x + thiss.width > other.x) {
    platformmovesr = -1;
  }
}

function directionChange2(thiss, other) {
  rightcollision = false;
  if (thiss.x < other.x + other.width &&
    thiss.y < other.y + other.height &&
    thiss.height + thiss.y > other.y &&
    thiss.x + thiss.width > other.x) {
    timeoutmove = 0.2;
    rightcollision = true;
    currenty = y;
  }
}

function directionChanges(thiss, other) {
  if (thiss.x < other.x + other.width &&
    thiss.y < other.y + other.height &&
    thiss.height + thiss.y > other.y &&
    thiss.x + thiss.width > other.x) {
    platformmovesr = 1;
  }
}

function directionChanges2(thiss, other) {
  leftcollision = false;
  if (thiss.x < other.x + other.width &&
    thiss.y < other.y + other.height &&
    thiss.height + thiss.y > other.y &&
    thiss.x + thiss.width > other.x) {
    timeoutmove = -0.2;
    leftcollision = true;
    currenty = y;
  }
}
//Renders em all
function drawNew() {
  var mortarshot = {
    height: 40,
    width: 40,
    x: 565 + mortarx,
    y: 175 + mortary,
    color: "pink"
  };
  var ground = {
    height: 10,
    width: 200,
    x: 0,
    y: 100,
    color: "grey"
  };
  var ground2 = {
    height: 10,
    width: 200,
    x: 220,
    y: 150,
    color: "grey"
  };
  var ground3 = {
    height: 10,
    width: 200,
    x: 0,
    y: 200,
    color: "grey"
  }
  var ground6 = {
    height: 10,
    width: 50,
    x: 550,
    y: 225,
    color: "grey"
  };
  var belowground = {
    height: 1,
    width: 200,
    x: 0,
    y: 109,
    color: "grey"
  };
  var belowground2 = {
    height: 1,
    width: 200,
    x: 220,
    y: 159,
    color: "grey"
  };
  var belowground3 = {
    height: 1,
    width: 200,
    x: 550,
    y: 234,
    color: "grey"
  }
  var mainPlayer = {
    height: 18,
    width: 25,
    x: x,
    y: y,
    color: "purple"
  };
  var mortar = {
    height: 65,
    width: 65,
    x: 540,
    y: 160,
    color: "blue"
  };
  var mortartimeout1 = {
    height: 10,
    width: 10,
    x: 0,
    y: 0,
    color: "green"
  };
  var mortartimeout2 = {
    height: 10,
    width: 10,
    x: 0 + xv,
    y: 0,
    color: "green"
  };
  var mortartimeout3 = {
    height: 10,
    width: 10,
    x: 100,
    y: 0,
    color: "green"
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
    x: 100,
    y: 70,
    color: "black"
  };
  var coin2 = {
    height: 20,
    width: 20,
    x: 300,
    y: 120,
    color: "black"
  };
  var coin3 = {
    height: 20,
    width: 20,
    x: 70,
    y: 170,
    color: "black"
  };
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
    x: 250,
    y: 170,
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
  platformblock1 = new rectangle(platformblock1.height, platformblock1.width, platformblock1.x, platformblock1.y, platformblock1.color);
  platformblock2 = new rectangle(platformblock2.height, platformblock2.width, platformblock2.x, platformblock2.y, platformblock2.color);
  coin1 = new rectangle(coin1.height, coin1.width, coin1.x, coin1.y, coin1.color);
  coin2 = new rectangle(coin2.height, coin2.width, coin2.x, coin2.y, coin2.color);
  coin3 = new rectangle(coin3.height, coin3.width, coin3.x, coin3.y, coin3.color);
  mortar = new rectangle(mortar.height, mortar.width, mortar.x, mortar.y, mortar.color);
  moneybar = new rectangle(moneybar.height, moneybar.width, moneybar.x, moneybar.y, moneybar.color);
  victoryplatform = new rectangle(victoryplatform.height, victoryplatform.width, victoryplatform.x, victoryplatform.y, victoryplatform.color);
  reloadingbar = new rectangle(reloadingbar.height, reloadingbar.width, reloadingbar.x, reloadingbar.y, reloadingbar.color);
  endofbar = new rectangle(endofbar.height, endofbar.width, endofbar.x, endofbar.y, endofbar.color);
  healthbar = new rectangle(healthbar.height, healthbar.width, healthbar.x, healthbar.y, healthbar.color);
  rect = new rectangle(mainPlayer.width, mainPlayer.height, mainPlayer.x, mainPlayer.y, mainPlayer.color);
  mortarshot = new rectangle(mortarshot.width, mortarshot.height, mortarshot.x, mortarshot.y, mortarshot.color);
  mortartimeout1 = new rectangle(mortartimeout1.width, mortartimeout1.height, mortartimeout1.x, mortartimeout1.y, mortartimeout1.color);
  mortartimeout2 = new rectangle(mortartimeout2.width, mortartimeout2.height, mortartimeout2.x, mortartimeout2.y, mortartimeout2.color);
  mortartimeout3 = new rectangle(mortartimeout3.width, mortartimeout3.height, mortartimeout3.x, mortartimeout3.y, mortartimeout3.color);
  groundclass = new rectangle(ground.height, ground.width, ground.x, ground.y, ground.color);
  ground2render = new rectangle(ground2.height, ground2.width, ground2.x, ground2.y, ground2.color);
  ground3render = new rectangle(ground3.height, ground3.width, ground3.x, ground3.y, ground3.color);
  ground6render = new rectangle(ground6.height, ground6.width, ground6.x, ground6.y, ground6.color);
  belowgroundclass = new rectangle(belowground.height, belowground.width, belowground.x, belowground.y, belowground.color);
  belowground2render = new rectangle(belowground2.height, belowground2.width, belowground2.x, belowground2.y, belowground2.color);
  belowground3render = new rectangle(belowground3.height, belowground3.width, belowground3.x, belowground3.y, belowground3.color);
  groundDetect(ground, mainPlayer, 0);
  groundDetect(ground2, mainPlayer, 1);
  groundDetect(ground3, mainPlayer, 2)
  groundDetect(ground6, mainPlayer, 3);
  belowGroundDetect(belowground, mainPlayer, 0);
  belowGroundDetect(belowground2, mainPlayer, 1);
  belowGroundDetect(belowground3, mainPlayer, 2);
  directionChange(victoryplatform, platformblock1);
  directionChanges(victoryplatform, platformblock2);
  directionChange2(mortartimeout2, mortartimeout1);
  directionChanges2(mortartimeout2, mortartimeout3);
  coinDetect(mainPlayer, 0, coin1);
  coinDetect(mainPlayer, 1, coin2);
  coinDetect(mainPlayer, 2, coin3);
  winDetect(mainPlayer, victoryplatform);
  winRedirect();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1000, 5000);
  if (mortarshot.x < mainPlayer.x + mainPlayer.width &&
    mortarshot.y < mainPlayer.y + mainPlayer.height &&
    mortarshot.height + mortarshot.y > y &&
    mortarshot.x + mortarshot.width > x) {
    console.log("Detected enemy collision");
    playerHealth -= 3;
    healthminus += 250;
    mortarx = -1000;
    mortarcollision = true;
  } else {
    mortarcollision = false;
  }
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

  if (rightcollision === true || leftcollision === true) {
    setTimeout(function() {
      mortarx = 0;
      mortarchange = 0;
      mortarchange -= mortarchangex;
      mortary = 0;
      mortarchange2 = -mortarshot1;
      mortarshot1 = 1.5;
      mortarshot2 = 0;
      mortarshot3 = currenty / 35;
      setTimeout(function() {
        mortarchange2 = mortarshot2;
        setTimeout(function() {
          mortarchange2 = mortarshot3;
        }, 2400);
      }, 2400);
    }, 10);
    currentx = x;
    currenty = y;
  }
  mortarx += mortarchange;
  mortary += mortarchange2;
  mortarchangex = (565 - currentx) / 360;
  xv += timeoutmove;
  groundclass.render();
  ground2render.render();
  ground3render.render();
  ground6render.render();
  reloadingbar.render();
  ctx.drawImage(imageMortar, mortar.x, mortar.y, mortar.height, mortar.width);
  ctx.drawImage(imageMortarshot, mortarshot.x, mortarshot.y, mortarshot.height, mortarshot.width);
  //moneybar.render();
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
        imageObj.src = "Slime.JPG";
        //player=playerLeft;
      } else {
        console.log("we got a hit");
      }
      break;
    case 68:
      /*right*/
      if (collision == false && x < 980) {
        velocityright = speedright;
        direction = "right";
        imageObj.src = "Slime.JPG";
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
