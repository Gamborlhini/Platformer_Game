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
  bossY = 0,
  gravityspeed = 2.7,
  gravityspeed2 = 3.7,
  velocityup = 0,
  pillarbroken = false,
  pillarhealth = 10,
  pillarhit = false,
  swordx = 0,
  enemycharge = 0,
  swordplusx = 0,
  swordswing = false,
  char, groundclass, collision = false,
  imageObj = new Image(),
  imagePortal = new Image(),
  imageCoin = new Image(),
  imageSword = new Image(),
  imageEnemy = new Image();
  imageBossMaster = new Image();
  imagePillar1 = new Image();
  imagePillar2 = new Image();
  imagePillar3 = new Image();
  imagePillar4 = new Image();
  imagePillar5 = new Image();
  imagePillar6 = new Image();
  imagePillar7 = new Image();
  imagePillar8 = new Image();
  imagePillar9 = new Image();
  imagePillar10 = new Image();
imageObj.src = "../imgs/Slime.JPG";
imagePortal.src = "../imgs/EndPortal.png";
imageCoin.src = "../imgs/Coin.png";
imageSword.src = "../imgs/Sword.png";
imageEnemy.src = "../imgs/Enemy.png";
imageBossMaster.src;
imageBossArray = ["../imgs/boss/BossCharge0.png", "../imgs/boss/BossCharge1.png", "../imgs/boss/BossCharge2.png", "../imgs/boss/BossCharge3.png", "../imgs/boss/BossCharge4.png", "../imgs/boss/BossCharge5.png", "../imgs/boss/BossCharge6.png", "../imgs/boss/BossCharge7.png"]
imagePillar1.src = "../imgs/boss/PillarStageTen.png";
imagePillar2.src = "../imgs/boss/PillarStageNine.png";
imagePillar3.src = "../imgs/boss/PillarStageEight.png";
imagePillar4.src = "../imgs/boss/PillarStageSeven.png";
imagePillar5.src = "../imgs/boss/PillarStageSix.png";
imagePillar6.src = "../imgs/boss/PillarStageFive.png";
imagePillar7.src = "../imgs/boss/PillarStageFour.png";
imagePillar8.src = "../imgs/boss/PillarStageThree.png";
imagePillar9.src = "../imgs/boss/PillarStageTwo.png";
imagePillar10.src = "../imgs/boss/PillarStageOne.png";
var splatsound = document.getElementById("splat");
var swordsound = document.getElementById("sword");
var bosssound = document.getElementById("boss");
var grounds = [];
var belowgrounds = [];
function allFalse() {
    grounds[i] = false;
    belowgrounds[i] = false;
}
for (var i = 0; i < 5; i++) {
  setTimeout(allFalse(), 10);
}
var placeblockcollision = [false];
var coins = [false, false, false];
  barwidth = 100;
var vssx = 0;
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
hitallow = false;
enemyhit = false;
platformmoves = 1;
inbarrier = false;
platformmovesr = 1;
flying = false;
flyinglength = 1000;
timeoutmove = 5;
rightcollision = false;
leftcollision = false;
playerenemycollision=false;
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
    location.assign("../html/Victory.html");
  }
}
function shotDetect(enemy) {
  enemyhit = false;
  if (this.x < enemy.x + enemy.width &&
    this.y < enemy.y + enemy.height &&
    this.height + this.y > enemy.y &&
    this.x + this.width > enemy.x) {
    vs.hit();
    enemyhit = true;
    splatsound.play();
  }
}
function enemyDetect(enemy, player, health) {
  if (enemy.x < player.x + player.width &&
    enemy.y < player.y + player.height &&
    enemy.height + enemy.y > player.y &&
    enemy.x + enemy.width > player.x) {
    console.log("Detected enemy collision");
    health -= 1;
    playerenemycollision = true;
  } else {
    playerenemycollision = false;
  }
}
function enemyDisturbed(enemy, disturbance, disturbancevar) {
  if (enemy.x - 100 < disturbance.x + disturbance.width &&
    enemy.y < disturbance.y + disturbance.height &&
    enemy.height + enemy.y > disturbance.y &&
    enemy.x + 100 + enemy.width > disturbance.x) {
    //console.log("disturbance detected");
    //Detects the direction the player is and follows
    if (disturbance.x < enemy.x) {
      //console.log("its done(left)");
      //console.log(disturbancevar);
      vssx -= 1.25;
    } else if (disturbance.x > enemy.x) {
      //console.log("its done(right)");
      vssx += 1.25;
    } else if (disturbance.x = enemy.x) {} else {
      //console.error("Something went horribly wrong!")
    }
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
  hit() {
    vshealth -= 1;
  }
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
  shotDetect(enemy) {
    enemyhit = false;
    if (this.x < enemy.x + enemy.width &&
      this.y < enemy.y + enemy.height &&
      this.height + this.y > enemy.y &&
      this.x + this.width > enemy.x) {
      vs.hit();
      enemyhit = true;
      splatsound.play();
    }
  }
}
function pillarDetect(sword, enemy){
  if (sword.x < enemy.x + enemy.width &&
    sword.y < enemy.y + enemy.height &&
    sword.height + sword.y > enemy.y &&
    sword.x + sword.width > enemy.x &&
     hitallow == true && inbarrier == true) {
      pillarhealth -=1;
        hitallow = false;
        bossY += 7;
  }
}
function outsideTheBarrier(thiss, barrier){
  if (thiss.x < barrier.x + barrier.width &&
    thiss.y < barrier.y + barrier.height &&
    thiss.height + thiss.y > barrier.y &&
    thiss.x + thiss.width > barrier.x) {
      enemycharge = 0;
      inbarrier = false;
  }
}
function insideBarrier(thiss, barrier){
  if (thiss.x < barrier.x + barrier.width &&
    thiss.y < barrier.y + barrier.height &&
    thiss.height + thiss.y > barrier.y &&
    thiss.x + thiss.width > barrier.x
  && pillarhealth > 0) {
      inbarrier = true;
      if(enemycharge==0){
        setTimeout(function() {
          enemycharge=1;
        }, 100);
      }
      if(enemycharge==1){
        setTimeout(function() {
          enemycharge=2;
        }, 100);
      }
      if(enemycharge==2){
        setTimeout(function() {
          enemycharge=3;
        }, 100);
      }
      if(enemycharge==3){
        setTimeout(function() {
          enemycharge=4;
        }, 100);
      }
      if(enemycharge==4){
        setTimeout(function() {
          enemycharge=5;
        }, 100);
      }
      if(enemycharge==5){
        setTimeout(function() {
          enemycharge=6;
        }, 100);
      }
      if(enemycharge==6){
        setTimeout(function() {
          enemycharge=7;
        }, 70);
      }
      if(enemycharge==7){
        setTimeout(function(){
          bosssound.play();
          playerHealth-=5000;
          enemycharge=0;
          enemybarrier.color = "yellow";
          setTimeout(function () {
            enemybarrier.color = "purple";
          }, 100);
        }, 70);
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
    if (vs.dead !== true){
    shot.shotDetect(vs);
  }
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
//Renders em all
function drawNew() {
  var vss = {
    height: 50,
    width: 50,
    x: 260 + vssx,
    y: 174,
    color: "purple"
  };
  var boss1 = {
    height: 50,
    width: 50,
    x:495,
    y:80 + bossY,
    color: "purple"
  }
  var ground4 = {
    height: 10,
    width: 560,
    x: 0,
    y: 225,
    color: "grey"
  };
  var belowground4 = {
    height: 1,
    width: 560,
    x: 0,
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
    x: 150,
    y: 195,
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
    x: 200,
    y: 195,
    color: "black"
  };
  var sword = {
    height: 50,
    width: 50,
    x: x + swordx + 10,
    y: y - 10,
    color: "orange"
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
  var pillar = {
    height: 100,
    width: 60,
    x: 490,
    y: 130,
    color: "grey"
  }
  var enemybarrier = {
    height: 200,
    width: 170,
    x: 390,
    y: 35,
    color: "purple"
  }
  var outsidebarrier = {
    height: 150,
    width: 20,
    x: 370,
    y: 85,
    color: "green"
  }
  vs = new enemy(vss.height, vss.width, vss.x, vss.y, vss.color);
  enemybarrier= new rectangle(enemybarrier.height, enemybarrier.width, enemybarrier.x, enemybarrier.y, enemybarrier.color);
  outsidebarrier= new rectangle(outsidebarrier.height, outsidebarrier.width, outsidebarrier.x, outsidebarrier.y, outsidebarrier.color);
  sword = new rectangle(sword.height, sword.width, sword.x, sword.y, sword.color);
  boss1 = new rectangle(boss1.height, boss1.width, boss1.x, boss1.y, boss1.color);
  pillar = new rectangle(pillar.height, pillar.width, pillar.x, pillar.y, pillar.color);
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
  ground4render = new rectangle(ground4.height, ground4.width, ground4.x, ground4.y, ground4.color);
  belowground4render = new rectangle(belowground4.height, belowground4.width, belowground4.x, belowground4.y, belowground4.color);
  groundDetect(ground4, mainPlayer, 3);
  belowGroundDetect(belowground4, mainPlayer, 3);
  coinDetect(mainPlayer, 0, coin1);
  coinDetect(mainPlayer, 1, coin2);
  coinDetect(mainPlayer, 2, coin3);
  winDetect(mainPlayer, victoryplatform);
  winRedirect();
  pillarDetect(sword, pillar);
  insideBarrier(mainPlayer, enemybarrier);
  outsideTheBarrier(mainPlayer, outsidebarrier);
  enemyDetect(vss, mainPlayer, playerHealth);
  enemyDisturbed(vss, mainPlayer, vssx);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1000, 5000);
  ctx.fillStyle = "black";
  ctx.font = "20px Arial"
  ctx.fillText(`Press t to swing your sword to destroy the pillar. The pillar can not be be destroyed by shots`, 20, 260)
  ctx.fillText('If you are inside the barrier, it will charge up an attack, which will kill you if it hits', 20, 285)
  ctx.fillText('You will not be shot if you go out of the barrier before the enemy shoots', 20, 310)
  vs.checkdead();
  if (vs.dead !== true) {
    ctx.drawImage(imageEnemy, vs.x, vs.y, vs.width, vs.height);
  }
  if (playerenemycollision === true && vs.dead == false) {
    healthminus += 8;
    playerHealth -= 0.096;
  }

  if (pillarhealth > 0){
    enemybarrier.render();
    imageBossMaster.src = imageBossArray[enemycharge];
    ctx.drawImage(imageBossMaster, boss1.x, boss1.y, boss1.width, boss1.height);
  }
  if (playerHealth > 0) {
    ctx.drawImage(imageObj, x, y, 25, 18);

  } else {
    ctx.drawImage(imageObj, x, y, 25, 18);
    x = 25;
    y = 18;
    healthminus = 0;
    playerHealth = 6;
    enemycharge = 0;
  }
  swordx += swordplusx;
  if (reloading === true) {
    barwidth += 1;
  }
  if (reloading == false) {
    barwidth = 0;
  }
  ground4render.render();
  reloadingbar.render();
  //moneybar.render();
  if (pillarhealth == 10){
    ctx.drawImage(imagePillar10, pillar.x, pillar.y, pillar.width, pillar.height);
  }
  if (pillarhealth == 9){
    ctx.drawImage(imagePillar9, pillar.x, pillar.y, pillar.width, pillar.height);
  }
  if (pillarhealth == 8){
    ctx.drawImage(imagePillar8, pillar.x, pillar.y, pillar.width, pillar.height);
  }
  if (pillarhealth == 7){
    ctx.drawImage(imagePillar7, pillar.x, pillar.y, pillar.width, pillar.height);
  }
  if (pillarhealth == 6){
    ctx.drawImage(imagePillar6, pillar.x, pillar.y, pillar.width, pillar.height);
  }
  if (pillarhealth == 5){
    ctx.drawImage(imagePillar5, pillar.x, pillar.y, pillar.width, pillar.height);
  }
  if (pillarhealth == 4){
    ctx.drawImage(imagePillar4, pillar.x, pillar.y, pillar.width, pillar.height);
  }
  if (pillarhealth == 3){
    ctx.drawImage(imagePillar3, pillar.x, pillar.y, pillar.width, pillar.height);
  }
  if (pillarhealth == 2){
    ctx.drawImage(imagePillar2, pillar.x, pillar.y, pillar.width, pillar.height);
  }
  if (pillarhealth == 1){
    ctx.drawImage(imagePillar1, pillar.x, pillar.y, pillar.width, pillar.height);
  }
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
  if (swordswing==true){
  ctx.drawImage(imageSword, sword.x, sword.y, sword.width, sword.height);
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
        imageObj.src = "../imgs/Slime.JPG";
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
        imageObj.src = "../imgs/Slime.JPG";
        //x=x+dx
        //player=playerRight;
      } else {
        console.log("we got a hit");
      }
      break;
    case 84:
    if(swordswing == false){
      swordsound.play();
      hitallow=true;
      swordswing = true;
      swordplusx = 3;
      setTimeout(function() {
        swordplusx = -6;
        setTimeout(function(){
          swordswing = false;
          swordplusx = 0;
          swordx = 0;
        }, 200);
      }, 400);
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
