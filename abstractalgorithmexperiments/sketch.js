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
  // Experiment 1: draw lines between circles that are "touching" or close
  stroke(0, 80);
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      let a = circles[i];
      let b = circles[j];
      let d = dist(a.x, a.y, b.x, b.y);
      if (d < a.r + b.r + 10 && d > abs(a.r - b.r)) {
        line(a.x, a.y, b.x, b.y);
      }
    }
  }

  // Experiment 2: color circles based on their index
  noStroke();
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    let t = i / circles.length;
    fill(lerpColor(color(255, 255, 255), color(0, 120, 255), t));
    ellipse(c.x, c.y, c.r * 2 * 0.7);
  }

  // Experiment 3: draw rectangles at random positions, avoiding overlap with circles
  stroke(0, 120);
  fill(255, 200);
  let rectTries = 0;
  let rects = 0;
  while (rects < 10 && rectTries < 1000) {
    let rw = random(20, 60);
    let rh = random(20, 60);
    let rx = random(rw, width - rw);
    let ry = random(rh, height - rh);
    let overlap = false;
    for (let c of circles) {
      if (dist(rx, ry, c.x, c.y) < c.r + max(rw, rh) / 2) {
        overlap = true;
        break;
      }
    }
    if (!overlap) {
      rect(rx - rw / 2, ry - rh / 2, rw, rh);
      rects++;
    }
    rectTries++;
  }
}
