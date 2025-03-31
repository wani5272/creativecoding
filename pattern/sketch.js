function setup() {
  createCanvas(400, 400);
  strokeWeight(10);
}

function draw() {
  background(0);
  for (let i = 0; i <= innerWidth; i += 20) {
    stroke(0, 255, 0);
    line(0, i, width, i);

    stroke(255, 255, 0);
    line(i, 0, i, height);
  }
}