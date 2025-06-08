let img, filtered;

function preload() {
  img = loadImage("img1.jpg"); 
}

function setup() {
  createCanvas(img.width, img.height);
  filtered = createImage(img.width, img.height);
  img.loadPixels();
  filtered.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let i = 4 * (y * img.width + x);
      let r = img.pixels[i];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];
      let a = img.pixels[i + 3];
      filtered.pixels[i] = r;
      filtered.pixels[i + 1] = 255 - g;
      filtered.pixels[i + 2] = 255 - b;
      filtered.pixels[i + 3] = a;
    }
  }
  filtered.updatePixels();
  image(filtered, 0, 0);
}
