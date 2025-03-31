let r, g, b = 0
function setup() {
  createCanvas(400, 400);
  strokeWeight(10);
}

function draw() {
  background(0);
  stroke(r, b, b);
  fill(r, g, b, 128);
  ellipse(width/2, height/2, mouseX, mouseY);
}

function mousePressed() {
  r = random(255);
  g = random(255);
  b = random(255);
}