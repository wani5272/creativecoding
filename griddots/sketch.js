function setup() {
  canvasSize = min(windowWidth, windowHeight);
  createCanvas(canvasSize, canvasSize);
  for (x = 25; x <canvasSize ; x+=25) {
    for (y = 25; y <canvasSize ; y+=25) {
	let thecolour = random(255)
	stroke(thecolour);
	fill(thecolour);
	circle(x, y, random(10));
    }
  }
}
