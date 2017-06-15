var GameInterface = new Interface();
var Game = new Platform();

document.onkeydown = function(event){
  console.log(event.keyCode);
  switch(event.keyCode){
    //left
    case 65:
    case 37:
      console.log("Left");
      Game.Fighter1.setSpeed(-1, 0);
      break;
    //up
    case 87:
    case 38:
      console.log("Up");
      Game.Fighter1.setSpeed(0, -1);
      break;
    //right
    case 68:
    case 39:
      console.log("Right");
      Game.Fighter1.setSpeed(1, 0);
      break;
    //down
    case 83:
    case 40:
      console.log("Down");
      Game.Fighter1.setSpeed(0, 1);
      break;
    case 32:
      break;
  }
}

var counter = 1000;
var speed = 20;

function Update(){
  if(counter <= 0){
    counter = 1000;
  }
  ctx.clearRect(0,0,900,500);
  Game.checkCollision();
  Game.draw();
  GameInterface.draw();
  Game.Fighter1.move();
  counter-=speed;
}

setInterval(Update,  50);
