function setup() {
  createCanvas(400, 400);
  background(200);
  stroke('black');
  strokeWeight(10);
  
  point(50, 50);
  line(0, 350, 400, 300);
  strokeWeight(2);
  
  triangle(100, 100, 150, 100, 100, 250);
  square(200, 200, 50);
  rect(300, 100, 75, 75, 20);
}