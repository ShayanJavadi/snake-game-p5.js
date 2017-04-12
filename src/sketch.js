let snake;
let direction;
let tailArray = [];
let foodArray = [];
let notDead = true;

function setup() {
  createCanvas(600,600);
  snake = new Snake();
  document.onkeypress = function (e) {
    snake.move(e);
  }
  makeFood();
}


function draw() {
  if (notDead) {
    background('#ffefd5');
    snake.update();
    snake.show();
    for (var i = 0; i < foodArray.length; i++) {
      foodArray[i].show()
      //if snake hits food, add a new tail
      if (Math.abs(foodArray[i].x - snake.x) < 11  && Math.abs(foodArray[i].y - snake.y) < 11) {
        foodArray.pop(foodArray[i]);
        tailArray.push(new Tail(snake.previousX, snake.previousY));
        console.log('yum');
        console.log(tailArray);
      }
    }

    for (var i = 0; i < tailArray.length; i++) {
      if (i === 0) {
        tailArray[i].update(snake.previousX , snake.previousY);
        console.log(tailArray[i]);
      } else {
        tailArray[i].update(tailArray[i - 1].previousX, tailArray[i - 1].previousY);
        console.log(tailArray[i]);

      }
      if (Math.abs(tailArray[i].x - snake.x) < 2  && Math.abs(tailArray[i].y - snake.y) < 2) {
        console.log('boink');
      }
      tailArray[i].show();
    }

  }
}
function Tail(x, y) {
  this.x = x;
  this.y = y;
  this.previousX = x;
  this.previousY = y;

  Tail.prototype.show = function() {
    console.log('wprs');
    fill( '#ee437b');
    noStroke();
    rect(this.x, this.y, 15, 15);
  }

  Tail.prototype.update = function(newX, newY) {
    this.previousX = this.x;
    this.previousY = this.y;
    this.x =  newX;
    this.y =  newY;
  }
}
function Food(x, y) {
  console.log(x);
  this.x = x;
  this.y = y;

  Food.prototype.show = function() {
    fill( '#7c1d42');
    noStroke();
    rect(this.x, this.y, 15, 15);
  }
  Food.prototype.newFood = function(arr) {

   arr.push(this); //adding current instance to array
   setTimeout(function() { //setting timeout to remove it later
       console.log("Time to die for " + this);
       arr.shift();
       console.log(arr);
     }, randomNumber(13000, 5000))
  }
}

//makes new food blocks each few seconds
function makeFood() {
  setInterval(function(){
    new Food(randomNumber(400, 1), randomNumber(400, 1) ).newFood(foodArray);
    console.log(foodArray);
  },randomNumber(1000, 2000));
}
//random number helper
function randomNumber(from, to) {
  return Math.floor(Math.random() * from) + to
}
function Snake() {
  this.x = 300;
  this.y = 300;
  this.previousX = 300;
  this.previousY = 300;
  this.xspeed = 0;
  this.yspeed = 0;

  Snake.prototype.update = function() {
    this.previousX = this.x;
    this.previousY = this.y;
    this.x =  this.x + this.xspeed;
    this.y =  this.y + this.yspeed;
  }

  Snake.prototype.show = function() {
    fill( '#ee437b');
    noStroke();
    rect(this.x, this.y, 15, 15);
  }

  Snake.prototype.move = function(direction) {
    switch (direction.key) {
      //left
      case 'a':
      this.xspeed =+ -3;
      this.yspeed =   0;
        break;
      //up
      case 'w':
      this.xspeed =   0;
      this.yspeed =+ -3;
        break;
      //right
      case 'd':
      this.xspeed =+  3;
      this.yspeed =   0;
        break;
      //down
      case 's':
      this.xspeed =  0;
      this.yspeed =+ 3;
        break;
      default:

    }
  }

}
