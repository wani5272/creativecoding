let axiom = "F+F+F+F";
let sentence = axiom;
let len = 100;
let angle = 1.5708;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  stroke(0);
  noLoop();
  drawLSystem();
}

function drawLSystem() {
  background(255);
  let bbox = getBoundingBox(sentence, len, angle);
  let scaleX = width / (bbox.maxX - bbox.minX + 40);
  let scaleY = height / (bbox.maxY - bbox.minY + 40);
  let s = Math.min(scaleX, scaleY);
  let offsetX = (width - (bbox.maxX - bbox.minX) * s) / 2 - bbox.minX * s;
  let offsetY = (height - (bbox.maxY - bbox.minY) * s) / 2 - bbox.minY * s;
  resetMatrix();
  translate(offsetX, offsetY);
  scale(s);

  let stack = [];
  for (let c of sentence) {
    if (c === "F") {
      line(0, 0, len, 0);
      translate(len, 0);
    } else if (c === "f") {
      translate(len, 0);
    } else if (c === "+") {
      rotate(angle);
    } else if (c === "-") {
      rotate(-angle);
    } else if (c === "[") {
      stack.push([getMatrix()]);
    } else if (c === "]") {
      if (stack.length > 0) {
        let m = stack.pop();
        setMatrix(m[0]);
      }
    }
  }
}

function getBoundingBox(str, step, ang) {
  let x = 0,
    y = 0,
    dir = 0;
  let stack = [];
  let minX = 0,
    maxX = 0,
    minY = 0,
    maxY = 0;
  for (let c of str) {
    if (c === "F" || c === "f") {
      let dx = 0,
        dy = 0;
      let d = ((dir % 4) + 4) % 4;
      if (d === 0) dx = step;
      else if (d === 1) dy = step;
      else if (d === 2) dx = -step;
      else if (d === 3) dy = -step;
      x += dx;
      y += dy;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    } else if (c === "+") {
      dir = (dir + 1) % 4;
    } else if (c === "-") {
      dir = (dir + 3) % 4;
    } else if (c === "[") {
      stack.push([x, y, dir]);
    } else if (c === "]") {
      let state = stack.pop();
      x = state[0];
      y = state[1];
      dir = state[2];
    }
  }
  return { minX, maxX, minY, maxY };
}

function getMatrix() {
  return drawingContext.getTransform().clone();
}

function setMatrix(m) {
  resetMatrix();
  drawingContext.setTransform(m);
}

function mousePressed() {
  let next = "";
  for (let c of sentence) {
    if (c === "F") {
      next += "FF+F-F+F+FF";
    } else {
      next += c;
    }
  }
  sentence = next;
  len *= 0.5;
  redraw();
}

function draw() {
  drawLSystem();
}
