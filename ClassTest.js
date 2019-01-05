var canvas, ctx, x = 0, y = 0, dx = 5, dy = 20;
var rect,velocity=0, speedside = 2, gravityspeed=2, velocityup=0, char, groundclass, collision = false,grounded=false, imageObj = new Image();
imageObj.src="Capture.JPG";
var ground = {height:10,width:1000,x:0,y:490,color:"brown"};
canvas=document.getElementById("canvas");
ctx=canvas.getContext("2d");
console.log("canvas established");
// BUG:  You are always one block underneath the ground. I don't know if this is a groundDetect problem or gravity
// BUG: You can chain jump
function gravity() {
  if (grounded==false&&collision==false) {
    y+=gravityspeed;
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
  }
}
function doKeyDown(a){
    switch(a.keyCode){
    	case 65:/*left*/
      if (collision==false&&x>0) {
        	velocity=-speedside;
          //player=playerLeft;
      }
      else{
        console.log("we got a hit");
      }
      	break;
    	case 68:/*right*/
      if (collision==false&&x<980) {
        velocity=speedside;
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
  }
}
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
