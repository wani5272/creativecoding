let img, glitched;

function preload() {
  img = loadImage("img1.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  glitched = createImage(img.width, img.height);
  img.loadPixels();
  glitched.loadPixels();
  for (let y = 0; y < img.height; y++) {
    let offset = int(random(-20, 20));
    for (let x = 0; x < img.width; x++) {
      let sx = (x + offset + img.width) % img.width;
      let i = 4 * (y * img.width + sx);
      let j = 4 * (y * img.width + x);
      glitched.pixels[j] = img.pixels[i];
      glitched.pixels[j + 1] = img.pixels[i + 1];
      glitched.pixels[j + 2] = img.pixels[i + 2];
      glitched.pixels[j + 3] = img.pixels[i + 3];
    }
  }
  glitched.updatePixels();
  image(glitched, 0, 0);
}
