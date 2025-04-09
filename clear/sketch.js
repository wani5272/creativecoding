let graphics;
function setup() {
  createCanvas(400, 400);
  graphics = createGraphics(200, 200); // Create an off-screen graphics
}
function draw() {
  background(220);
  // Draw on the main canvas
  fill(255, 0, 0); // Red
  rect(50, 50, 100, 100);
  // Draw on the graphics buffer
  graphics.fill(0, 0, 255); // Blue
  graphics.noStroke();
  graphics.ellipse(random(graphics.width), random(graphics.height), 20, 20);
  // Display the graphics buffer on the main canvas
  image(graphics, 100, 100);
}
function mousePressed() {
  // Clear the graphics buffer when the mouse is clicked
  graphics.clear();
}
