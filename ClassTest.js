var canvas, ctx, x = 0, y = 0, dx = 5, dy = 5;
var rect, char, groundclass, collision = false,grounded=false, imageObj = new Image();
imageObj.src="Capture.JPG";

var rect1 = [{height:10,width:10,x:11,y:11,color:"purple"}];
var rect2 = [{height:50,width:50,x:51,y:11,color:"purple"}];
var ground = {height:10,width:1000,x:0,y:490,color:"brown"};
var rect1simple = rect1[0];
var rect2simple = rect2[0];
canvas=document.getElementById("canvas");
ctx=canvas.getContext("2d");
console.log("canvas established");
function gravity() {
  if (grounded==false) {
    y+=4;
  }
}
function drawNew() {
  rect = new rectangle(10,10,x,y,"purple");
  groundclass = new rectangle(ground.height,ground.width,ground.x,ground.y,ground.color);
  rect1render = new rectangle(rect1[0].height,rect1[0].width,rect1[0].x,rect1[0].y,rect1[0].color);
  rect2render = new rectangle(rect2simple.height,rect2simple.width,rect2simple.x,rect2simple.y,rect2simple.color);
  ctx.fillStyle="white";
	ctx.fillRect(0,0,1000,500);
  ctx.drawImage(imageObj, x,y,10,10);
  rect1render.render();
  rect2render.render();
  groundclass.render();
  detectCollisions();
  gravity();
}
function detectCollisions() {
  rect.collisionDetect(rect1[0]);
  rect.collisionDetect(rect2simple);
  rect.groundDetect(ground);
}
// OPTIMIZE: fix this with Shivam to smooth
function doKeyDown(a){
    switch(a.keyCode){
    	case 65:/*left*/
      if (collision==false&&x>0) {
        	x=x-dx;
          //player=playerLeft;
      }
      else{
        console.log("we got a hit");
      }
      	break;
    	case 68:/*right*/
      if (collision==false&&x<990) {
          x=x+dx
          //player=playerRight;
      }
      else {
        console.log("we got a hit");
      }
      	break;
    	case 83:
      if (collision==false&&y<490&&grounded==false) {
        y=y+dy;
      }
      else {
        console.log("we got a hit");
      }
        break;
      case 87:
      if (collision==false&&y>0) {
        y=y-dy;
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

window.addEventListener("keydown",doKeyDown,true);
console.log("keydown established");
setInterval(drawNew,16);
console.log("interval set")
