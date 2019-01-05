var canvas, ctx, x = 0, y = 0, dx = 5, dy = 5;
var rect, char, collision = false, imageObj = new Image();
imageObj.src="Capture.JPG";
// OPTIMIZE: clean the uselessness
var player = [ /*Eyes*/{height:10, width:5, x:x+20, y:y+10, color:"brown"},/*Mouth*/ {height:5, width:20, x:x+5, y:y+25, color:"brown"}, /*Nose*/{height:5, width:5, x:x+15, y:y+20, color:"brown"}, /*Back Hair*/{height:5, width:15, x:x+40, y:y+10, color:"brown"}, {height:10, width:5, x:x+45, y:y+15, color:"brown"}, {height:10, width:5, x:x+55, y:y+15, color:"brown"}, {height:5, width:5, x:x+50, y:y+25, color:"brown"}, /*Ears*/{height:10, width:5, x:x+50, y:y+15, color:"gold"}, /*Hat*/{height:10, width:5, x:x+55, y:y+15, color:"brown"}, {height:10, width:35, x:x+15, y:y+0, color:"red"}, {height:5, width:50, x:x+5, y:y+5, color:"red"},  /*Face*/{height:25, width:10, x:x+25, y:y+10, color:"gold"},  ];
var rect1 = [{height:10,width:10,x:11,y:11,color:"purple"}];
var rect2 = [{height:50,width:50,x:51,y:11,color:"purple"}];
var rect2simple = rect2[0];
canvas=document.getElementById("canvas");
ctx=canvas.getContext("2d");
console.log("canvas established");

function drawNew() {
  rect = new rectangle(10,10,x,y,"purple");
  rect1render = new rectangle(rect1[0].height,rect1[0].width,rect1[0].x,rect1[0].y,rect1[0].color);
  rect2render = new rectangle(rect2simple.height,rect2simple.width,rect2simple.x,rect2simple.y,rect2simple.color);
  char = new character(player);
  ctx.fillStyle="white";
	ctx.fillRect(0,0,1000,500);
  ctx.drawImage(imageObj, x,y,10,10);
  rect1render.render();
  rect2render.render();
  rect.collisionDetect(rect1[0]);
  rect.collisionDetect(rect2simple);
}
// OPTIMIZE: fix this with Shivam to smooth
function doKeyDown(a){
    switch(a.keyCode){
    	case 65:/*left*/
      if (collision==false) {
        	x=x-dx;
          //player=playerLeft;
      }
      else{
        console.log("we got a hit");
      }
      	break;
    	case 68:/*right*/
      if (collision==false) {
          x=x+dx
          //player=playerRight;
      }
      else {
        console.log("we got a hit");
      }
      	break;
    	case 83:
      if (collision==false) {
        y=y+dy;
      }
      else {
        console.log("we got a hit");
      }
        break;
      case 87:
      if (collision==false) {
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
