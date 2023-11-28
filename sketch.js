var formResolution = 15;
var stepSize = 1;
var distortionFactor = 1;
var initRadius = 100;
var centerX;
var centerY;
var x = [];
var y = [];

var filled = false;
var freeze = false;

// let sign = {
//  signUp: false,
//  text: ("Hamiselu", 360, 380),
// size: 10,
// fill: 0,
//};

let game = {
  gameOver: false,
  score: 0,
  width: 1280,
  height: 655,
};

let ball = {
  x: 10,
  y: 10,
  xSpeed: 2,
  ySpeed: 3,
  size: 10,
};

let bar = {
  x: game.width / 2,
  y: game.height - 20,
  height: 10,
  width: 100,
};

let bar2 = {
  x: game.width / 2,
  y: game.height - 635,
  height: 10,
  width: 100,
};

let myColor = {
  r:255,
  g:20,
  b:147,
  a:1
};

let myStroke = {
  r:0,
  g:191,
  b:255,
  a:1
};

function setRandomColors(){
  myColor.r = random(50, 255);
  myColor.g = random(50, 255);
  myColor.b = random(50, 255);
  myColor.a = 1;
  
  myStroke.r = random(50, 255);
  myStroke.g = random(50, 255);
  myStroke.b = random(50, 255);
  myStroke.a = 100;  
}

function setStrokeAndFill() {
  stroke(myStroke.r, myStroke.g, myStroke.b);
  strokeWeight(0.5);
  fill(myColor.r,myColor.g,myColor.b, myColor.a);
}

function setup() {
  // One time
  createCanvas(game.width, game.height);
  textAlign(RIGHT, CENTER);
  textSize(14);
  //noStroke();
  background(255,250,205);
  setStrokeAndFill();
  
  // init shape
  centerX = width * 1.2;
  centerY = height / 2;
  var angle = radians(360 / formResolution);
  for (var i = 0; i < formResolution; i++) {
    x.push(cos(angle * i) * initRadius);
    y.push(sin(angle * i) * initRadius);
  }
}

// all the time
function draw() {
  if (game.gameOver) {
    return;
  }
background(255,250,205,1);
  
  // Move the ball with the speed
  ball.x = ball.x + ball.xSpeed;
  ball.y = ball.y + ball.ySpeed;

  // Collide in right or left wall?
  if (ball.x > game.width || ball.x < 0) {
    ball.xSpeed = ball.xSpeed * -1;
    game.score = game.score + 1;
    //  ball.size = (ball.size + random(-20,40));
  }

  // Collide in the top?
  if (ball.y < 0) {
    game.gameOver = true;
  }

  //Move the bar
  // ball.x = mouseX;

  //bar.x = mouseX - bar.width / 2;
  if (keyIsPressed) {
    if (keyCode === LEFT_ARROW) {
      bar.x = bar.x - 10;
    } else if (keyCode === RIGHT_ARROW) {
      bar.x = bar.x + 10;
    }
    if (keyCode === 65) {
      bar2.x = bar2.x - 10;
    } else if (keyCode === 68) {
      bar2.x = bar2.x + 10;
    }
  }

  // Hit bottom? - Is it game over? :-(
  if (ball.y > game.height) {
    game.gameOver = true;
  }

  // Draw the ball
  ellipse(ball.x, ball.y, ball.size);

  //Did the ball hit the bar?
  if (
    abs(bar.x + bar.width / 2 - ball.x) < bar.width / 2 &&
    ball.y > bar.y - ball.size / 2
  ) {
    ball.ySpeed = abs(ball.ySpeed) * random(-1.1, -0.5);
    ball.xSpeed = ball.xSpeed * 1.1;
    setRandomColors();
    // ball.size = ball.size + random(-20, 20);
    //initRadius = initRadius + random (50, 100);
  }

  if (
    abs(bar2.x + bar.width / 2 - ball.x) < bar2.width / 2 &&
    ball.y < bar2.y + bar.height + ball.size / 2
  ) {
    ball.ySpeed = ball.ySpeed * -1.1;
    ball.xSpeed = ball.xSpeed * random(1.1, 0.5);
    setRandomColors();
    //ball.size = ball.size + random(-20, 20);
    // initRadius = initRadius + random (50, 100);
  }
  
  
    
  fill(255,250,205);
  stroke(255,250,205);
  rect(0, bar.y, width, bar.height);

  setStrokeAndFill();
  // Bar stuff
  rect(bar.x, bar.y, bar.width, bar.height);
  

  if (game.gameOver) {
    //  signUp = true;
    textSize(10);
    //fill(0, 102, 153);
    noStroke();
    textAlign(CENTER, CENTER);
    fill(0);
    text("Hamiselu", 1200, 600);
    ball.xSpeed = 0;
    ball.ySpeed = 0;
  }

  
  fill(255,250,205);
  stroke(255,250,205);
  rect(0, bar2.y, width, bar2.height);
  
  setStrokeAndFill();
  rect(bar2.x, bar2.y, bar2.width, bar2.height);
  


  if (game.gameOver) {
    textSize(10);
    textAlign(CENTER, CENTER);
    //fill(0);
    noStroke();
    text("Hamiselu", 1200, 600);
    //textFont(inconsolata);
    ball.xSpeed = 0;
    ball.ySpeed = 0;
  }

  // floating towards mouse position
  centerX += (ball.x - centerX) * 0.005;
  centerY += (ball.y - centerY) * 0.005;

  // calculate new points
  for (var i = 0; i < formResolution; i++) {
    x[i] += random(-stepSize, stepSize);
    y[i] += random(-stepSize, stepSize);
    // uncomment the following line to show position of the agents
    // ellipse(x[i] + centerX, y[i] + centerY, 5, 5);
  }

  beginShape();
  // first controlpoint
  curveVertex(x[formResolution - 6] + centerX, y[formResolution - 6] + centerY);

  // only these points are drawn
  for (var i = 0; i < formResolution; i++) {
    curveVertex(x[i] + centerX, y[i] + centerY);
  }
  curveVertex(x[0] + centerX, y[0] + centerY);

  // end controlpoint
  curveVertex(x[1] + centerX, y[1] + centerY);
  endShape();
}
