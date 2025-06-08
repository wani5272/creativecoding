function transferArray(array1) {
  let array2 = [];
  for (let i = 0, len = array1.length; i < len; ++i) {
    array2.push(array1[i]);
  }

  return array2;
}
function transferArrayInArray(array1) {
  let array2 = [];
  for (let i = 0, len = array1.length; i < len; ++i) {
    array2.push(transferArray(array1[i]));
  }
  return array2;
}

let startfield = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let newfield;
let cellW, cellH;
let xdimensions, ydimensions;

function setup() {
  xdimensions = startfield[0].length;
  ydimensions = startfield.length;
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  cellW = width / xdimensions;
  cellH = height / ydimensions;
  newfield = transferArrayInArray(startfield);
  frameRate(8);
}

function draw() {
  background(240);
  for (let y = 1; y < ydimensions - 1; y++) {
    for (let x = 1; x < xdimensions - 1; x++) {
      let yarray = transferArray(startfield[y]);
      let field = yarray[x];
      let prevyarray = startfield[y - 1];
      let nextyarray = startfield[y + 1];
      let sum = [
        prevyarray[x - 1],
        prevyarray[x],
        prevyarray[x + 1],
        yarray[x - 1],
        yarray[x + 1],
        nextyarray[x - 1],
        nextyarray[x],
        nextyarray[x + 1],
      ].reduce((partialSum, a) => partialSum + a, 0);

      if (field) {
        if (sum < 2 || sum > 3) {
          newfield[y][x] = 0;
        } else {
          newfield[y][x] = 1;
        }
      } else {
        if (sum === 3) {
          newfield[y][x] = 1;
        } else {
          newfield[y][x] = 0;
        }
      }
    }
  }
  for (let drawY = 0; drawY < newfield.length; drawY++) {
    for (let drawX = 0; drawX < newfield[0].length; drawX++) {
      if (newfield[drawY][drawX]) {
        fill(30);
      } else {
        fill(240);
      }
      stroke(200);
      rect(drawX * cellW, drawY * cellH, cellW, cellH);
    }
  }
  startfield = transferArrayInArray(newfield);
}
