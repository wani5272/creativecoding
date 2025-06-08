let circles = [];
let minR = 2;
let maxR = 60;
let tries = 0;
let maxTries = 10001;

function setup() {
  createCanvas(700, 700);
  background(240);
  stroke(0);
  strokeWeight(2);
  let r = random(minR, maxR);
  let x = random(r, width - r);
  let y = random(r, height - r);
  circles.push({ x, y, r });
  fill(255);
  ellipse(x, y, r * 2);

  while (tries < maxTries) {
    let rx = random(width);
    let ry = random(height);
    let ok = true;
    let minDist = Infinity;
    for (let c of circles) {
      let d = dist(rx, ry, c.x, c.y) - c.r;
      if (d < minR) {
        ok = false;
        break;
      }
      if (d < minDist) minDist = d;
    }
    if (ok && minDist > minR) {
      let rr = min(minDist, maxR, random(minR, maxR));
      fill(255);
      ellipse(rx, ry, rr * 2);
      circles.push({ x: rx, y: ry, r: rr });
    }
    tries += 1;
  }
}
