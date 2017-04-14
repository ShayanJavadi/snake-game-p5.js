let snake;
let direction;
let tailArray = [];
let foodArray = [];
let notDead = true;
let tailCount;
let youDied;
console.log(tailCount);

function setup() {
  tailCount = document.getElementById("length--js");
  youDied = document.getElementById("hidden-message");
  youDied.classList.toggle("hidden");
  snake = null;
  direction = null;
  tailArray = [];
  foodArray = [];
  notDead = true;
  tailCount.innerHTML = 0;

  createCanvas(600,600);
  snake = new Snake();
  //handle snake movement
  document.onkeypress = function (e) {
    snake.move(e);
  }
  //handle creating food blocks
  makeFood();
}


function draw() {
  if (notDead) {
    background('#ffefd5');
    snake.update();
    snake.show();
    //if snake hits the borders
    if (snake.x < 0 || snake.y < 0 || snake.x > 600 || snake.y > 600) {
      //kill snake
      killSnake();
    }
    for (var i = 0; i < foodArray.length; i++) {
      foodArray[i].show()
      //if snake hits food, add a new tail
      if (Math.abs(foodArray[i].x - snake.x) < 11  && Math.abs(foodArray[i].y - snake.y) < 11) {
        foodArray.pop(foodArray[i]);
        tailArray.push(new Tail(snake.previousX, snake.previousY));
        tailArray.push(new Tail());
        console.log(foodArray.length);
        tailCount.innerHTML = tailArray.length / 2;
      }
    }

    for (var i = 0; i < tailArray.length; i++) {
      //pass down snakes last location to the tail
      if (i === 0) {
        tailArray[i].update(snake.previousX , snake.previousY);
      } else {
        tailArray[i].update(tailArray[i - 1].previousX, tailArray[i - 1].previousY);
      }
      //if snake shares a position with a tail then it dies
      if (Math.abs(tailArray[i].x - snake.x) < 2  && Math.abs(tailArray[i].y - snake.y) < 2) {
        killSnake();
      }
      tailArray[i].show();
    }

  }
}
function DeadSnake(x, y) {
  this.x = x;
  this.y = y;

  DeadSnake.prototype.show = function() {
    fill( '#ee437b');
    noStroke();
    rect(this.x, this.y, 12, 12);
  }
}
function Tail(x, y) {
  this.x = x;
  this.y = y;
  this.previousX = x;
  this.previousY = y;

  Tail.prototype.show = function() {
    fill( '#ee437b');
    noStroke();
    rect(this.x, this.y, 12, 12);
  }

  Tail.prototype.update = function(newX, newY) {
    this.previousX = this.x;
    this.previousY = this.y;
    this.x =  newX;
    this.y =  newY;
  }
}
function Food(x, y) {
  this.x = x;
  this.y = y;

  Food.prototype.show = function() {
    fill( '#7c1d42');
    noStroke();
    rect(this.x, this.y, 12, 12);
  }
  Food.prototype.newFood = function(arr) {

   arr.push(this); //adding current instance to array
   setTimeout(function() { //setting timeout to remove it later
       arr.shift();
     }, randomNumber(13000, 10000))
  }
}

//makes new food blocks each few seconds
function makeFood() {
  setInterval(function(){
    if (foodArray.length < 6) {
      console.log(foodArray.length);
      new Food(randomNumber(400, 1), randomNumber(400, 1) ).newFood(foodArray);
    }
  },randomNumber(1000, 2000));
}
//random number helper
function randomNumber(from, to) {
  return Math.floor(Math.random() * from) + to
}

function killSnake() {
  let deadSnake = null;
  notDead = false;
  const deadX = snake.previousX;
  const deadY = snake.previousY;
  //create a dead snake object that appears where the player has died
  deadSnake = new DeadSnake(deadX, deadY);
  deadSnake.show();
  youDied.classList.toggle("hidden");
}

function Snake() {
  this.x = 300;
  this.y = 300;
  this.previousX = 300;
  this.previousY = 300;
  this.xspeed = 0;
  this.yspeed = 0;
  this.direction = '';
  this.oppositeDirection = '';

  Snake.prototype.update = function() {
    this.previousX = this.x;
    this.previousY = this.y;
    this.x =  this.x + this.xspeed;
    this.y =  this.y + this.yspeed;
  }

  Snake.prototype.die = function () {
    this.x =  this.previousX;
    this.y =  this.previousY;
  }

  Snake.prototype.show = function() {
    fill( '#ee437b');
    noStroke();
    rect(this.x, this.y, 12, 12);
  }

  Snake.prototype.move = function(direction) {
    switch (direction.key) {
      //left
      case 'a':
      if (this.oppositeDirection == 'a' && tailArray.length > 0) {
        break;
      }
      this.xspeed =+ -4;
      this.yspeed =   0;
      this.direction = 'left';
      this.oppositeDirection = 'd'
        break;
      //up
      case 'w':
      if (this.oppositeDirection == 'w' && tailArray.length > 0) {
        break;
      }
      this.xspeed =   0;
      this.yspeed =+ -4;
      this.direction = 'up';
      this.oppositeDirection = 's'
        break;
      //right
      case 'd':
      if (this.oppositeDirection == 'd' && tailArray.length > 0) {
        break;
      }
      this.xspeed =+  4;
      this.yspeed =   0;
      this.direction = 'right';
      this.oppositeDirection = 'a'
        break;
      //down
      case 's':
      if (this.oppositeDirection == 's' && tailArray.length > 0) {
        break;
      }
      this.xspeed =  0;
      this.yspeed =+ 4;
      this.direction = 'down';
      this.oppositeDirection = 'w'

        break;
      default:

    }
  }

}
