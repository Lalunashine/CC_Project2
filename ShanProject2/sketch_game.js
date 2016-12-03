var notes = [];
var beats = [];
var score = 0;
var count = 0;
var newBeat = true;
var n0;
var b0
var font;

function preload() {
  font = loadFont('data/font2.otf');
}

function setup() {
  createCanvas(600, 450);
  textFont(font);
  textSize(20);
  
  b0 = new Beat();
  beats.push(b0);

  n0 = new MusicalNote();
  notes.push(n0);
}

function draw() {
  stroke(200);
  background(255);
  line(width / 2, 0, width / 2, height);
  line(0, 350, width, 350);

  beatShow();
  noteFalling();
  
  fill(255, 0, 0);
  text("current score: " + score, 20, 100);
}

function noteFalling() {
  // if (frameCount % 90 === 0) {
  //var n = new MusicalNote();
  //notes.push(n);
  // }

  // n0.display();
  // n0.move();
  //  if (n0.hit(b0)) {
  //   console.log("hit");
  //    score += 1;
  // }
  for (var i = 0; i < notes.length; i++) {
    notes[i].display();
    notes[i].move();
    if (notes[i].hit(beats[count])) {
      console.log("hit");
      score += 1;
    }
  }
}

function beatShow() {
  //if (mouseIsPressed) {
  beats[count].display();
  beats[count].update();
  //}

  if (beats[count].disappear()) {
    newBeat = true;
  }

  if (keyIsDown(32) && (newBeat)) {
    var b = new Beat();
    beats.push(b);

    count++;
    newBeat = false;
  }
}