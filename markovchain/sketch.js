let myData;
let markov = {};
let words = [];
let order = 1;
let generated = "";

function preload() {
  myData = loadStrings("shakespeare.txt");
}

function setup() {
  noCanvas();
  let myDataString = myData.join(" ");
  words = myDataString.split(/\s+/).filter((w) => w.length > 0);

  for (let i = 0; i < words.length - order; i++) {
    let key = words.slice(i, i + order).join(" ");
    let next = words[i + order];
    if (!markov[key]) markov[key] = [];
    markov[key].push(next);
  }

  let keys = Object.keys(markov);
  let key = random(keys);
  let result = key.split(" ");
  for (let i = 0; i < 100; i++) {
    let nextWords = markov[key];
    if (!nextWords) break;
    let next = random(nextWords);
    result.push(next);
    key = result.slice(result.length - order, result.length).join(" ");
  }
  generated = result.join(" ");
  createP(generated);
}
