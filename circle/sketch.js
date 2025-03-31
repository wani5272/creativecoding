function setup() {
  createCanvas(400, 400);
  background(200);
  stroke('black');
  strokeWeight(5);
  
  noFill();
  circle(200, 200, 200);

  fill(255, 255, 255);
  circle(200, 200, 100);

  fill(0, 255, 255);
  circle(200, 200, 50);
}