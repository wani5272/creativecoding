function setup() {
  createCanvas(900, 900);
  let size = 50;  
  let xcount = 4;
  let ycount = 4;
  for (let i = 0; i < ycount; i++ ) {
    y = i*55+5;
    for (let j = 0; j < xcount; j++) {
      x = j*55+5;
      xminoffset = x + random(size);
      yminoffset = y + random(size);
      square(x, y, size);
    }
  }
}