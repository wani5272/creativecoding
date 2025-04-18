function setup() {
  maxCenterOffset = 100;
  amount = 23;

  canvasSize = min(windowWidth, windowHeight);
  createCanvas(canvasSize, canvasSize);
  for (let i = 0; i < amount; i++) {
    if (i > amount / 2) {
      maxCenterOffset = 0;
    }
    let canvasCenter = canvasSize / 2;
    let centerx = canvasCenter - maxCenterOffset + random(2 * maxCenterOffset);
    let centery = canvasCenter - maxCenterOffset + random(2 * maxCenterOffset);
    let squaremaxsize = min(
      (canvasSize - centerx) * 2,
      (canvasSize - centery) * 2,
      centerx * 2,
      centery * 2
    );
    let squaresize = random(squaremaxsize);
    let beginx = centerx - squaresize / 2;
    let beginy = centery - squaresize / 2;
    noFill();
    square(beginx, beginy, squaresize);
  }
}
