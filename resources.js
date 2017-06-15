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
  this.health = 10;
  this.canMove = true;
  this.originX = a;
  this.originY = b;
  this.positionX = x;
  this.positionY= y;
  this.speedX = 0;
  this.speedY = 0;
  this.scale = scale;
  this.color =  "#b3ffb3";
  this.attackDirection = 3;
  this.setPosition = function(x,y){
    this.positionX = x;
    this.positionY = y;
  }
  this.setScale = function(value){
    this.scale = value;
  }
  this.move = function(){
    if(this.speedX <= 0)
      if(this.positionX > 0)
        this.positionX+=this.speedX;
    if(this.speedX >= 0)
      if(this.positionX < 20)
        this.positionX+=this.speedX;
    if(this.speedY <= 0)
      if(this.positionY > 0)
        this.positionY+=this.speedY;
    if(this.speedY >= 0)
      if(this.positionY < 10)
        this.positionY+=this.speedY;
  }
  this.setSpeed = function(x,y){
    if(this.canMove){
      this.speedX = x;
      this.speedY = y;
    }
  }
  this.OnHit = function(){
    this.speedX = 0;
    this.speedY = 0;
  }
  this.setColor = function(value){
    this.color = value;
  }
  this.draw = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.originX + (this.positionX * this.scale), this.originY + (this.positionY * this.scale), this.scale, this.scale);
    ctx.fillStyle = "#555";
    switch(this.attackDirection){
      case 0://north
        ctx.fillRect(this.originX + (this.positionX * this.scale) + (this.scale/3), this.originY + (this.positionY * this.scale), (this.scale/3), (this.scale/6));
        break;
      case 1://south
        ctx.fillRect(this.originX + (this.positionX * this.scale) + (this.scale/3), this.originY + (this.positionY * this.scale)+(5*this.scale/6), (this.scale/3), (this.scale/6));
        break;
      case 2://west
        ctx.fillRect(this.originX + (this.positionX * this.scale), this.originY + (this.positionY * this.scale) + (this.scale/3), (this.scale/6), (this.scale/3));
        break;
      case 3://east
        ctx.fillRect(this.originX + (this.positionX * this.scale) + (5*this.scale/6), this.originY + (this.positionY * this.scale) + (this.scale/3), (this.scale/6), (this.scale/3));
        break;
    }
  }

}

function Platform(){
  this.originX = 30;
  this.originY = 30;
  this.positionX = 0;
  this.positionY = 0;
  this.scale = 40;
  this.floor = [];
  this.Fighter1 = new Player(this.originX, this.originY, 2, 5, this.scale);
  this.Fighter2 = new Player(this.originX, this.originY, 16, 5, this.scale);
  this.enemies = [];
  this.enemySize = 0;

  for(var i = 0; i < 21; i++){
    var temp = [];
    for(var j = 0; j < 11; j++){
      temp.push(new Tile(this.originX, this.originY, i,j,this.scale));
    }
    this.floor.push(temp);
  }

  this.checkCollision = function(){

  }

  this.setPosition = function(x,y){
    this.positionX = x;
    this.positionY = y;
  }

  this.setScale = function(value){
    this.scale = value;
  }
  this.draw = function(){
    for(var i = 0; i < 21; i++){
      for(var j = 0; j < 11; j++){
        this.floor[i][j].draw();
      }
    }
    this.Fighter1.draw();
    this.Fighter2.draw();
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
