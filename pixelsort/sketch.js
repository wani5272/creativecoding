let img, sortedImg;

function preload() {
  img = loadImage("img1.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  sortedImg = createImage(img.width, img.height);
  img.loadPixels();
  sortedImg.loadPixels();
  for (let y = 0; y < img.height; y++) {
    let row = [];
    for (let x = 0; x < img.width; x++) {
      let i = 4 * (y * img.width + x);
      row.push([
        img.pixels[i],
        img.pixels[i + 1],
        img.pixels[i + 2],
        img.pixels[i + 3],
      ]);
    }
    row.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]));
    for (let x = 0; x < img.width; x++) {
      let i = 4 * (y * img.width + x);
      sortedImg.pixels[i] = row[x][0];
      sortedImg.pixels[i + 1] = row[x][1];
      sortedImg.pixels[i + 2] = row[x][2];
      sortedImg.pixels[i + 3] = row[x][3];
    }
  }
  sortedImg.updatePixels();
  image(img, 0, 0);
  image(sortedImg, 0, 0);
}
