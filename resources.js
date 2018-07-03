var ctx = document.getElementById("canvas").getContext("2d");

function Interface(){
  this.state = 1;
   //determines which state of the interface the user is in (0 == menu, 1 == game, 2 == settings, 3 == credits)
  this.draw = function(){
      switch(this.state){
        case 0:
          this.drawMenu();
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
      }
  }
  this.drawMenu = function(){
    ctx.fillStyle = "#fff";
    ctx.font = "40px Tahoma ";
    ctx.fillText("Main Menu",150,100);
  }
}

function Player(a,b,scale){
	this.health = 5;
	this.position = new Position(a, b);
	this.size = scale;
	this.draw = function(){
		ctx.fillStyle = "#aaf";
		ctx.fillRect(this.position.x - (this.size/2), this.position.y - (this.size/2),(this.size/2),(this.size/2));
	}
}

function Position(x,y){
	this.x = x;
	this.y = y;
}

function Target (a, b, scale, letter){
	this.x = a;
	this.y = b;
	this.size = scale;

	this.mark = letter;
	this.checkMark = function(checker){
		if(checker = mark)
			return true;
		else
			return false;
	}
	this.move = function(){
		this.decision = Math.random() * (4 - 1) + 1;
		switch(this.decision){
			case 1:
				this.x++;
				break;
			case 2:
				this.x--;
				break;
			case 3:
				this.y++;
				break;
			case 4:
				this.y--;
				break;
		}
	}
	this.draw = function(){
		ctx.fillStyle = "#afa";
		ctx.fillRect(this.x - (this.size/2), this.y -(this.size/2), (this.size/2), (this.size/2));      	
		ctx.font = '20pt Calibri';
      	ctx.fillStyle = 'black';
     	 	ctx.fillText(this.mark, this.x-(this.size/2)+ 6, this.y-5);
	}
}

function Enemy(a, b, scale, letter){
	this.x = a;
	this.y = b;
	this.size = scale;

	this.mark = letter;
	this.checkMark = function(checker){
		if(checker = mark)
			return true;
		else
			return false;
	}
	this.move = function(x,y){
		if(this.x < x)
			this.x++;
		else if(this.x > x)
			this.x--;
		if(this.y < y)
			this.y++;
		else if(this.y > y)
			this.y--;
	}
	this.draw = function(){
		ctx.fillStyle = "#afa";
		ctx.fillRect(this.x - (this.size/2), this.y -(this.size/2), (this.size/2), (this.size/2));					
      	ctx.font = '20pt Calibri';
      	ctx.fillStyle = 'black';
     	 	ctx.fillText(this.mark, this.x-(this.size/2)+ 6, this.y-5);
	}
}

function makeLetter() {
  	var text = "";
  	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	text = possible.charAt(Math.floor(Math.random() * possible.length));

  	return text;
}

function Platform(){
	this.x = 50;
	this.y = 50;
	this.size = 800;

	this.player = new Player(450,450,50);
	this.enemy = [];
	this.target = [];


	this.addTarget = function(){
		var letterTemp = makeLetter()						console.log(letterTemp);
		if(this.target.includes(letterTemp)){
			var tempX = Math.random() * (850 - 50) + 50;
			var tempY = Math.random() * (850 - 50) + 50;
			var temp = new Target(tempX, tempY,  50, letterTemp);
			this.target.push(temp);
			console.log(temp);		
			return temp;
		}
	}

	this.addEnemy = function(){
		var letterTemp = makeLetter();
		console.log(letterTemp);
		if(!this.enemy.includes(letterTemp)){
			var tempX = Math.random() * (850 - 50) + 50;
			var tempY = Math.random() * (850 - 50) + 50;

			var temp = new Enemy(tempX, tempY,  50, letterTemp);
			this.enemy.push(temp);

			return temp;
		}
	}

	this.tempE = this.addTarget();

	this.draw = function(){
		ctx.fillStyle = "#333333";
		ctx.fillRect(this.x, this.y,this.size,this.size);
		this.player.draw();
		this.tempE.draw();

		for(var i = 0; i < this.target.size; i++){
			this.target[i].draw();
		}
		for(var j = 0; i < this.enemy.size; i++){
			this.enemy[i].draw();
		}
	}
}
