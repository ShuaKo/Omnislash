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

function Player(a,b,x,y,scale){
  this.canMove = true;
  this.originX = a;
  this.originY = b;
  this.positionX = x;
  this.positionY= y;
  this.speedX = 0;
  this.speedY = 0;
  this.scale = scale;

  this.setPosition = function(x,y){
    this.positionX = x;
    this.positionY = y;
  }
  this.setScale = function(value){
    this.scale = value;
  }
  this.move = function(){
    this.positionX+=this.speedX;
    this.positionY+=this.speedY;
  }
  this.setSpeed = function(x,y){
    if(this.canMove){
      this.canMove = false;
      this.speedX = x;
      this.speedY = y;
    }
  }
  this.OnHit = function(){
    this.speedX = 0;
    this.speedY = 0;
    this.canMove = true;
  }
  this.draw = function(){
    ctx.fillStyle = "#b3ffb3";
    ctx.fillRect(this.originX + (this.positionX * this.scale), this.originY + (this.positionY * this.scale), this.scale, this.scale);
  }

}

function Platform(){
  this.originX = 30;
  this.originY = 30;
  this.positionX = 0;
  this.positionY = 0;
  this.scale = 40;
  this.floor = [];
  this.Fighter = new Player(this.originX, this.originY, 2, 5, this.scale);
  this.enemies = [];
  this.enemySize = 0;

  for(var i = 0; i < 21; i++){
    var temp = [];
    for(var j = 0; j < 11; j++){
      temp.push(new Tile(this.originX, this.originY, i,j,this.scale));
    }
    this.floor.push(temp);
  }

  this.enemySpawn = function(x,y){
    this.enemies.push(new EnemyPosition(x, y));
    this.floor[x][y].isEnemy = true;
    this.enemySize++;
  }

  this.enemySpawn(16,5);

  this.setPosition = function(x,y){
    this.positionX = x;
    this.positionY = y;
  }

  this.setScale = function(value){
    this.scale = value;
  }

  this.addEnemy = function(){
    if(this.enemySize > 0){
      var posCheck = Math.floor((Math.random() * 2));
      console.log("posCheck is " + posCheck);
      console.log("EnemySize is" + this.enemySize);
      switch(posCheck){
        case 0:
          break;
        case 1:
          break;
      }
    }
  }

  this.enemySpawn = function(x,y){
    if(this.floor[x][y].isEnemy == false && !(this.Fighter.positionX == x && this.Fighter.positionY == y)){
      this.enemies.push(new EnemyPosition(x, y));
      this.floor[x][y].isEnemy = true;
      this.enemySize++;
    }
  }

  this.checkCollision = function(){
    if(this.floor[this.Fighter.positionX][this.Fighter.positionY].isEnemy){
      console.log("Bang");
      this.floor[this.Fighter.positionX][this.Fighter.positionY].isEnemy = false;
      this.enemySize--;
      this.Fighter.OnHit();
    }
  }
  this.draw = function(){
    for(var i = 0; i < 21; i++){
      for(var j = 0; j < 11; j++){
        this.floor[i][j].draw();
      }
    }
    this.Fighter.draw();
  }
}

function Tile(a,b,x,y,scale){
  this.originX = a;
  this.originY = b;
  this.positionX = x;
  this.positionY = y;
  this.scale = scale;
  this.border = 1;
  this.isEnemy = false;

  this.setPosition = function(x,y){
    this.positionX = x;
    this.positionY = y;
  }

  this.setScale = function(value){
    this.scale = value;
  }
  this.draw = function(){
    if(this.isEnemy){
      ctx.fillStyle = "#ff6666";
      ctx.fillRect(this.originX + (this.positionX * this.scale), this.originY + (this.positionY * this.scale), this.scale, this.scale);
    }else{
      ctx.fillStyle = "#333333";
      ctx.fillRect(this.originX + (this.positionX * this.scale)+this.border, this.originY + (this.positionY * this.scale)+this.border, this.scale-(this.border * 2), this.scale-(this.border * 2));
    }
  }
}

function EnemyPosition(x,y){
  this.positionX = x;
  this.positionY = y;
}
