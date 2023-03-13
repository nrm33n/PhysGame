// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

//PLEASE READ:
/////////////////////////////////////////////////////////////////////////////////////////////
/*changes made: new font imported and used throughout,
  turned into game with instructions and timer, test for whether the game was completed in the code,
  different text appears depending on win or loss. 
  Theme music added to game. (if song does not load, please refresh);
  All colours changed.

  all assets used are copyright free
  font from: https://www.1001fonts.com/video-game-fonts.html
  Epic Song by BoxCat Games | https://freemusicarchive.org/music/BoxCat_Games
  Music promoted by https://www.chosic.com/free-music/all/
  Creative Commons CC BY 3.0
  https://creativecommons.org/licenses/by/3.0/
*/


var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle=0;
var angleSpeed=0;
var canvas;

var countdown;
var time = 40;
var birdCol=[];
////////////////////////////////////////////////////////////
function preload(){
  arcadeFont = loadFont('/assets/ARCADECLASSIC.TTF');
  bgMusic = loadSound('/assets/song.mp3')
}

function setup() {
  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();

  textFont(arcadeFont);

  bgMusic.play();

}
////////////////////////////////////////////////////////////
function draw() {
  background(0);

  Engine.update(engine);

  drawGround();

  drawPropeller();

  drawTower();

  drawBirds();

  drawSlingshot();

  fill(255);
  var timeNow = int(millis()/1000);
  if (countdown == 0)
  {
    countdown = 0;
    if (boxes.length != 0){
      textSize(60);
      text("GAME OVER", width/4, height/4);
      bgMusic.stop();
      noLoop();
    }
  }
  else{
    countdown = time - timeNow;
    if (boxes.length == 0){
      textSize(60);
      text("YOU WIN!", width/4, height/4);
      bgMusic.stop();
      noLoop();
    }
    else{
      textSize(40);
    text("Remove all blocks!", width/4, height/8);
    }
  }
  
  
  textSize(30);
  fill(255);
  text("TIME " + countdown, width*2/3, height/9);

}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed(){
  if (keyCode == LEFT_ARROW){
    //your code here
    angleSpeed += 0.01;
  }
  else if (keyCode == RIGHT_ARROW){
    //your code here
    angleSpeed -= 0.01;
  }
}
////////////////////////////////////////////////////////////
function keyTyped(){
  //if 'b' create a new bird to use with propeller
  if (key==='b'){
    setupBird();
  }

  //if 'r' reset the slingshot
  if (key==='r'){
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
  var pos = body.position;
  return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}
