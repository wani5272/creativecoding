let img, dithered;

function preload() {
  img = loadImage("img1.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  dithered = createImage(img.width, img.height);
  img.loadPixels();
  dithered.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let i = 4 * (y * img.width + x);
      let r = img.pixels[i];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];
      let avg = (r + g + b) / 3;
      let threshold = random(255);
      let val = avg > threshold ? 255 : 0;
      dithered.pixels[i] = val;
      dithered.pixels[i + 1] = val;
      dithered.pixels[i + 2] = val;
      dithered.pixels[i + 3] = 255;
    }
  }
  dithered.updatePixels();
  image(dithered, 0, 0);
}
