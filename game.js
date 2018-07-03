var GameInterface = new Interface();
var Game = new Platform();

document.onkeydown = function(event){
  console.log(event.keyCode, event.key);

}


var counter = 1000;
var speed = 20;

function Update(){
  if(counter <= 0){
    counter = 1000;
  }
	if(counter % 200 == 0){
		Game.addEnemy();
	}
	if(counter % 100 == 0){
		Game.addTarget();
	}

  ctx.clearRect(0,0,900,500);

  Game.draw();
  GameInterface.draw();

  counter-=speed;
}

setInterval(Update,  50);
