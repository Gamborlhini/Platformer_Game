var canvas,fireyes, ctx, sx = 0, x = 450, y = 0, dx = 5, dy = 20, direction = "right";
var rect, shooting = false, velocity=0, speedside = 2, gravityspeed=2, velocityup=0, char, groundclass, collision = false,grounded=false, imageObj = new Image();
imageObj.src="Right.JPG";
var ground = {height:10,width:1000,x:0,y:490,color:"brown"};
canvas=document.getElementById("canvas");
ctx=canvas.getContext("2d");
console.log("canvas established");
class rectangle {
  constructor(height, width, x, y, color) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.color = color;
  }
  render(){
  	ctx.fillStyle=this.color;
  	ctx.fillRect(this.x,this.y,this.width,this.height);
  }
  collisionDetect(other){
    if(this.x<other.x+other.width&&
    	this.y<other.y+other.height&&
    	this.height+this.y>other.y&&
    	this.x+this.width>other.x) {
        collision = true;
    }
  }
  groundDetect(groundblock){
    if(this.x<groundblock.x+groundblock.width&&
    	this.y<groundblock.y+groundblock.height&&
    	this.height+this.y>groundblock.y&&
    	this.x+this.width>groundblock.x){
        grounded=true;
      }
      else {
        grounded=false;
      }
  }
  shotDetect(enemy){
    if (this.x<enemy.x+enemy.width&&
    	this.y<enemy.y+enemy.height&&
    	this.height+this.y>enemy.y&&
    	this.x+this.width>enemy.x) {
      //enemy.dead();
    }
  }
}
// BUG:  You are always one block underneath the ground. I don't know if this is a groundDetect problem or gravity
// BUG: You can chain jump
function gravity() {
  if (grounded==false&&collision==false) {
    y+=gravityspeed;
  }
}
function fire() {
  if (fireyes==true) {
  var shot = new rectangle(5,5,x+sx,y,"black");
  shot.render();
  console.log("shot rendered");
  if (direction == "left") {
    shooting = true;
    setTimeout(function () {
    shooting = false;
    shot = "null";
    sx=0;
  }, 250);
    sx-=30;
    console.log(sx);
    console.log("speed set");
  }
  else if (direction == "right") {
    shooting = true;
    setTimeout(function () {
    shooting = false;
    shot = "null";
    sx=0;
  }, 500);
    sx+=30;
    console.log("speed set");
  }
  else if (direction = "up") {
    //Shoot up
  }
  else {
    location.reload(true);
  }
  }
}
function drawNew() {
  rect = new rectangle(25,25,x,y,"purple");
  groundclass = new rectangle(ground.height,ground.width,ground.x,ground.y,ground.color);
  ctx.fillStyle="white";
	ctx.fillRect(0,0,1000,500);
  ctx.drawImage(imageObj, x,y,25,25);
  groundclass.render();
  detectCollisions();
  gravity();
  moveSide();
  moveUp();
  fire();
}
function detectCollisions() {
  rect.groundDetect(ground);
}
function moveUp() {
  y-=velocityup;
}
function moveSide() {
  x+=velocity;
}
function doKeyUp(a) {
  switch (a.keyCode) {
    case 65:
      velocity=0;
      break;
    case 68:
      velocity=0;
      break;
    case 32:
      fireyes = false;
      break;
  }
}
function doKeyDown(a){
    switch(a.keyCode){
    	case 65:/*left*/
      if (collision==false&&x>0) {
        	velocity=-speedside;
          direction = "left";
          imageObj.src = "Left.JPG";
          //player=playerLeft;
      }
      else{
        console.log("we got a hit");
      }
      	break;
    	case 68:/*right*/
      if (collision==false&&x<980) {
        velocity=speedside;
        direction = "right";
        imageObj.src = "Right.JPG";
          //x=x+dx
          //player=playerRight;
      }
      else {
        console.log("we got a hit");
      }
      	break;
    	case 83:
      if (collision==false&&y<480&&grounded==false) {
      //  y=y+dy;
      }
      else {
        console.log("we got a hit");
      }
        break;
      case 87:
      if (collision==false&&y>0&&grounded==true) {
        velocityup=8;
        setTimeout(function () {
          velocityup=0;
        }, 100);
      }
      else {
        console.log("we got a hit");
      }
        break;
      case 32:
      if (shooting == false) {
        fireyes=true;
      }
        break;
  }
}

class character{
  constructor(array) {
    this.array = array;
  }
  render(){
    for (var i = 0; i < this.array.length; i++) {
      ctx.fillStyle=this.array[i].color;
      ctx.fillRect(this.array[i].x,this.array[i].y,this.array[i].width,this.array[i].height);
    }
  }
}
window.addEventListener("keyup",doKeyUp,true);
window.addEventListener("keydown",doKeyDown,true);
console.log("keydown established");
setInterval(drawNew,16);
console.log("interval set")
