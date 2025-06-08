let img;

function preload() {
    img = loadImage('img1.jpg');
}

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(240);
    let w = map(mouseX, 0, width, 50, width, true);
    let h = map(mouseY, 0, height, 50, height, true);
    image(img, (width - w) / 2, (height - h) / 2, w, h);
}
