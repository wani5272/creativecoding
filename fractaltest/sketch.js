var axiom = "F+F+F+F".split("");
var modifierF = "F+F-F-FF+F+F-F".split("");
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  indexoffset = 0;
  axiom.forEach((element, index) => {
    switch (element) {
      case "F":
        indexoffset = indexoffset + modifierF.length;
        indexwithoffset = index + indexoffset;
        axiom.splice(indexwithoffset, 1, ...modifierF);
    }
    console.log(axiom.toString);
  });
}
