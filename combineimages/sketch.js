let img1, img2, combined;

function preload() {
  img1 = loadImage("img1.jpg");
  img2 = loadImage("img2.jpg");
}

function setup() {
  createCanvas(img1.width, img1.height);
  combined = createImage(img1.width, img1.height);
  img1.loadPixels();
  img2.loadPixels();
  combined.loadPixels();
  // 4 because of rgba
  for (let i = 0; i < img1.pixels.length; i += 4) {
    if ((i / 4) % 2 === 0) {
      combined.pixels[i] = img1.pixels[i];
      combined.pixels[i + 1] = img1.pixels[i + 1];
      combined.pixels[i + 2] = img1.pixels[i + 2];
      combined.pixels[i + 3] = img1.pixels[i + 3];
    } else {
      combined.pixels[i] = img2.pixels[i];
      combined.pixels[i + 1] = img2.pixels[i + 1];
      combined.pixels[i + 2] = img2.pixels[i + 2];
      combined.pixels[i + 3] = img2.pixels[i + 3];
    }
  }
  combined.updatePixels();
  image(combined, 0, 0);
}
