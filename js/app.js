//var socket = new WebSocket("ws://localhost:8000");
var socket = io.connect('http://localhost:8080');
socket.on('connected', function(){
  console.log("Socket Connected");
});
socket.on('disconnect', function(){
  console.log("Socket Disconnected");
});
socket.on('data', function (data) {
  console.log(data);
  //angle = data;
});


// function setup(){
//   // The socket connection needs two event listeners:
//   socket.onopen = openSocket;
//   socket.onmessage = showData;
//   console.log("setup");
// }
//
// function openSocket() {
//     console.log("Socket open");
//     socket.send("Hello server");
//   }
//
// function showData(result) {
//     // when the server returns, show the result in the div:
//     console.log(result);
//   //  text.html("Sensor reading:" + result.data);
//     xPos = int(result.data);        // convert result to an integer
//     //text.position(xPos, 10);        // position the text
//   }




var mode = 0;
var style = 1;
// trails
// one side of screen black, one side red
// rbvj graphics - motionface,
// puck in the middle
// console.log(player_1);
var ctx = createCanvas('game');
//var ctx2 = createCanvas('ball');
//var ctx3 = createCanvas('paddle');

var game_over = new Image();
game_over.src = "images/winner1.png";
document.getElementById('game').style.zindex = 1;
//document.getElementById('ball').style.zindex = 2;
//document.getElementById('paddle').style.zindex = 3;

//ctx3.globalCompositeOperation = 'source-over';
// ctx3.globalCompositeOperation = 'overlay';

var ping = new Audio('sounds/paddle.wav');
var pong = new Audio('sounds/paddle.wav');
var hit = new Audio('sounds/wall2.wav');
var goal = new Audio('sounds/miss.wav');
var over = new Audio('sounds/game_over.wav');

var ball_size = 20;
var level = 1;
var pause = false;
var max_points = 2;

var AI = function(paddle){

  this.left = paddle.x - paddle.width;
  this.right = paddle.x + paddle.width;
  this.maxspeed = 5;
  this.minspeed = -5;

  this.update = function(){

    if (paddle.x > w/2 && ball.x > w/2-w/8) {
        var y_pos = ball.y;
    } else if (paddle.x < w/2 && ball.x < w/2 + w/8) {
        var y_pos = ball.y;
    } else {
        var y_pos = h/2;
    }
    if (paddle.target_y > ball.y) {
        var diff = -1 * Math.floor(paddle.target_y - y_pos)/2;
    } else {
        var diff = Math.floor(y_pos - paddle.target_y)/2;
    }

    diff = clamp(diff, this.minspeed, this.maxspeed);
    //var diff = -((paddle.y + (paddle.height / 2)) - y_pos)/100;
    //console.log(diff);
    if(diff < 0) {
      //  diff
    }
    // if(diff < 0 && diff < -4) { // max speed left
    //   diff = -5;
    // } else if(diff > 0 && diff > 4) { // max speed right
    //   diff = 5;
    // }
    paddle.move(diff, 0);

    }
  }



var Interface = function(){

  this.score1_x = w/2 - 200;
  this.score1_y = wall.top + 50;
  this.score1_w = w/10;
  this.score1_h = h/10;
  this.game_over = false;
  this.score2_x = w/2 + 200;
  this.score2_y = wall.top + 50;
  this.score2_w = w/10;
  this.score2_h = h/10;
  this.winner = -1;

  this.draw = function(){

    //this.playEnding();

    this.drawDigit(Math.floor(player1.score/10), this.score1_x - this.score1_w - 10, this.score1_y, this.score1_w, this.score1_h);
    this.drawDigit(player1.score%10, this.score1_x, this.score1_y, this.score1_w, this.score1_h);
    this.drawDigit(Math.floor(player2.score/10), this.score2_x - this.score2_w - 10, this.score2_y, this.score2_w, this.score2_h);
    this.drawDigit(player2.score%10, this.score2_x, this.score2_y, this.score2_w, this.score2_h);



    if (this.game_over) {
      //console.log(this.winner);
      if (this.winner == 1) {
        ctx.drawImage(game_over, w/4 - game_over.width/2, h/2 - game_over.height/2);
      } else if (this.winner == "2"){
        ctx.drawImage(game_over, w/2 + w/4 - game_over.width/2, h/2 - game_over.height/2);
      }
    }

  }

  // this.playEnding = function(){
  //   var block_size = 10;
  //   for (var x = 0; x < w; x+=block_size) {
  //       for (var y = 0; y < h; y+=block_size) {
  //       ctx.fillStyle = rgb(random(0, 155), 0, 0);
  //       ctx.fillRect(x, y, block_size, block_size);
  //     }
  //   }
  // }

  this.playEnding = function(){
    var block_size = 5;
    for (var x = 0; x < w; x+=block_size) {
        for (var y = 0; y < h; y+=block_size) {
        ctx.fillStyle = rgb(random(0, 155), 0, 0);
        ctx.fillRect(x, y, block_size, block_size);
      }
    }
  }

  this.gameOver = function(name){
    console.log(name);
    this.game_over = true;
    this.winner = name;
    over.play();

    //ui.playEnding();
  }

  this.reset = function(){

    this.game_over = false;
    this.winner = 0;
    player1.score = 0;
    player2.score = 0;
    pause = false;
  }

  this.drawDigit = function(n, x, y, w, h) {
    ctx.fillStyle = "red";
    var dw = dh = 20 * 4/5;
    var blocks = DIGITS[n];
    //console.log(blocks);
    if (blocks[0])
      ctx.fillRect(x, y, w, dh);
    if (blocks[1])
      ctx.fillRect(x, y, dw, h/2);
    if (blocks[2])
      ctx.fillRect(x+w-dw, y, dw, h/2);
    if (blocks[3])
      ctx.fillRect(x, y + h/2 - dh/2, w, dh);
    if (blocks[4])
      ctx.fillRect(x, y + h/2, dw, h/2);
    if (blocks[5])
      ctx.fillRect(x+w-dw, y + h/2, dw, h/2);
    if (blocks[6])
      ctx.fillRect(x, y+h-dh, w, dh);
  }

  var DIGITS = [
    [1, 1, 1, 0, 1, 1, 1], // 0
    [0, 0, 1, 0, 0, 1, 0], // 1
    [1, 0, 1, 1, 1, 0, 1], // 2
    [1, 0, 1, 1, 0, 1, 1], // 3
    [0, 1, 1, 1, 0, 1, 0], // 4
    [1, 1, 0, 1, 0, 1, 1], // 5
    [1, 1, 0, 1, 1, 1, 1], // 6
    [1, 0, 1, 0, 0, 1, 0], // 7
    [1, 1, 1, 1, 1, 1, 1], // 8
    [1, 1, 1, 1, 0, 1, 0]  // 9
  ];

}

var Wall = function(){

  this.top = ball_size;
  this.bottom = h - ball_size;
  this.size = ball_size;

  this.draw = function () {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, w , this.size);
    ctx.fillRect(0, this.bottom, w, this.size);
    for (var y = 0; y < h; y+=this.size*2) {
      ctx.fillRect(w/2 - this.size/2, y, this.size, this.size);
    }
  }


}

var Player = function(player){
  this.score = 0;
  this.name = player;
}

var Paddle = function(player){

  this.height = h/8;
  this.width = ball_size;
  this.x = ball_size;
  this.y = h/2;
  this.target_x = ball_size;
  this.target_y = h/2;

  if (player == 2) this.x = w - ball_size;

  this.update = function () {
    //this.x = tween(this.x, this.target_x, 10);
    this.y = tween(this.y, this.target_y, 4);
  }

  this.move = function (dir) {
    //this.target_y = this.y;
    this.target_y = this.target_y + dir;
    //console.log(this.target_y);
    if (this.target_y - this.height/2 < wall.top) this.target_y = wall.top + this.height/2;
    if (this.target_y + this.height/2 > wall.bottom) this.target_y = wall.bottom - this.height/2;
  }

  this.draw = function () {

    //ctx.background(0,0,0,0.8);
    ctx.fillStyle = "red";
    //console.log(this.x);
    ctx.centreFillRect(this.x, this.y, this.width, this.height)

  }

};

// BALL
var Ball = function(){

  this.resetBallPosition = function () {
    this.x = w/2;
    this.y = h/2;
  }

  this.reset = function () {
    this.hitcount = 0;
    this.x = w/2;
    this.y = h/2;
    this.speedx = posNeg() * random(3,10);
    this.speedy = posNeg() * random(1,3);
    this.size = ball_size;
    this.playing = false;
    this.resetBallPosition();
  }




  this.reset();

  this.update = function () {

    this.x += this.speedx;
    this.y += this.speedy;
    this.hit();


    // GOAL!!
    if (this.x > w - this.size/2 ) {
      this.speedx *=-1;
      this.goal(player1);
    }

    if (this.x < this.size/2) {
      this.speedx *=-1;
      this.goal(player2);
    }
    if (this.y > wall.bottom - this.size/2 || this.y < wall.top + this.size/2) {
      this.speedy *=-1;
      hit.play();
    }
    // console.log(this.x);
    }

    this.hit = function () {

    if (this.x < paddle1.x + paddle1.width/2  && this.y > paddle1.y - paddle1.height/2 && this.y < paddle1.y + paddle1.height/2 ) {
      this.speedx = this.levelup(this.speedx);
      //sound.play("ping");
      ping.play();
    }
    if (this.x > paddle2.x - paddle2.width/2  && this.y > paddle2.y - paddle2.height/2 && this.y < paddle2.y + paddle2.height/2 ) {
      this.speedx = this.levelup(this.speedx);
      //sound.play("pong");
      pong.play();
    }

  }

    this.levelup = function (speed) {
      this.hitcount++;
      speed *= (1 + this.hitcount/2000);
      speed = clamp(speed, -10, 10);
      //console.log(speed);
      return -1 * speed;
    }

    this.goal = function (player){
      //sound.play("goal");
      goal.play();
      player.score +=1;
      if (player.score < max_points) {
        console.log("player " + player.name + ": " + player.score);
        this.resetBallPosition();
        pause = true;
        window.setTimeout(this.playBall, 3000);
      } else {
        pause = true;
        console.log("game over: player " + player.name + "wins");
        ui.gameOver(player.name);
      }
    }

  this.playBall = function (player){
      pause = false;
    }

  this.draw = function () {
    //ctx.fillStyle= rgba(0, 0.01);
    //ctx.fillRect(0,0,w,h)
    //ctx2.clearRect(0,0,w,h)
    ctx.fillStyle = "red";
    ctx.centreFillRect(this.x, this.y, this.size, this.size);
  }

}
// ENGINE



var ball = new Ball();
var wall = new Wall();

var ui = new Interface();

var paddle1 = new Paddle(1);
var paddle2 = new Paddle(2);

var player1 = new Player(1);
var player2 = new Player(2);

var robot1 = new AI(paddle1);
var robot2 = new AI(paddle2);

var bg = 0.9;

function draw(){
  if (chance(100))  {
    //bg = 5* random(1)/10;
    //console.log("xx");
  }

  ctx.background(0, 0, 0, bg);

  if (!pause) {
    ball.update();
  }
  if (!pause) {
    ball.draw();
  }


  wall.draw();
  ui.draw();
  if (mode == 1) {
    robot1.update();
    robot2.update();
  }

  paddle1.update();
  paddle2.update();
  paddle1.draw();
  paddle2.draw();

}

function keypress(){

  var keyCode = event.keyCode;
  //console.log(keyCode);
  if (keyCode == 113) {
    paddle1.move(-60);
  }
  if (keyCode == 97) {
    paddle1.move(60);
  }

  if (keyCode == 111) {
    paddle2.move(-60);
  }
  if (keyCode == 108) {
    paddle2.move(60);
  }
  if (keyCode == 32) {
    window.clearTimeout(auto_play);
    mode = 0;
    ui.reset();
    ball.reset();
  }
}

window.addEventListener('keypress', keypress,false);

function easeInQuad(t, b, c, d) {
t /= d;
return c*t*t + b;
};

var auto_play;
set_auto_play();

function set_auto_play(){
auto_play = window.setTimeout(robo_play(), 3000);
}

function robo_play(){
mode = 1;
ui.reset();
ball.reset();
}
