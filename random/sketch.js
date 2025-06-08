function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
}

function draw() {
  background(0, 0, 0, 10);
  for (let i = 0; i < 10; i++) {
    stroke(random(255), random(255), random(255));
    let x = random(0, width);
    let y = random(0, height);
    line(width / 2, y, x, sin(y));
  }
}
