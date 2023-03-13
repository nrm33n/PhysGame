////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  propeller = Bodies.rectangle(150,480,200,15, {
    isStatic: true, angle: angle
  });
  World.add(engine.world,[propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here
  fill(200,150,0);
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle = angle + angleSpeed;
  drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
  for (var i =0; i < birds.length; i ++){
    birdCol.push(color(random(100,255),0,0));
  }
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
  for (var i =0; i < birds.length; i++){
    fill(birdCol[i]);
    drawVertices(birds[i].vertices);
    if (isOffScreen(birds[i])){
      removeFromWorld(birds[i]);
      birds.splice(i,1);
      i--;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //your code here


  for (var k = 0; k < 3; k++){
    var x = canvas.width*2/3 + 80*k;
    for (var i=0; i < 6; i++){
      boxes.push(Bodies.rectangle(x, 0, 80,80))
    } 
  }
  for (var i = 0; i < boxes.length; i++){
    //colors.push(color(0,random(50,255),0)); original green colour 
    colors.push(color(0,0,random(100,255)));
    World.add(engine.world,[boxes[i]]);
  }



}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
  for (var i =0; i < boxes.length; i++){
    fill(colors[i]);
    drawVertices(boxes[i].vertices);
    if (isOffScreen(boxes[i])){
      removeFromWorld(boxes[i]);  //check is boxes leave screen
      boxes.splice(i,1);
      i--;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
x = canvas.width/5;
y = canvas.height/4;
  slingshotBird = Bodies.circle(x, y+20, 20,
                              {friction: 0, restitution: 0.95});
  Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);

  slingshotConstraint = Constraint.create({
    pointA: {x: x, y: x},
    bodyB: slingshotBird,
    pointB: {x: -10, y: -10},
    stiffness: 0.01,
    damping: 0.0001
  });

  World.add(engine.world,[slingshotBird, slingshotConstraint]);

}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  fill(200,50,150);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
