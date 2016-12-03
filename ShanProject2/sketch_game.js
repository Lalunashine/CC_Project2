var notes = [];
var beats = [];
var font;
var n0;
var b0;

var hitFlag = true; // flag for accurate hit
var recess; // timer for music note 

var index = 0; // index for beat
var newBeat = true; // flag for new beat creation

var score = 0;
var grn = 0; // red value

function preload() {
  font = loadFont('data/font2.otf');
}

function setup() {
  createCanvas(600, 450);
  textFont(font);

  n0 = new MusicalNote();
  notes.push(n0);

  b0 = new Beat();
  beats.push(b0);
}

function draw() {
  stroke(200);
  background(255);
  line(width / 2, 0, width / 2, height); // reference line 1
  line(0, 350, width, 350); // reference line 2

  textSize(20);
  fill(255, 0, 0);
  text("current score: " + score, 20, 100);

  noteFalling();
  beatShow();
  pauseGame();
}

function noteFalling() {
  if (frameCount % 90 === 0) { // later will be executed with the music rhythm
    var n = new MusicalNote();
    notes.push(n);
  }
  
// accurate score
  if (!hitFlag) { 
    fill(200, grn, 200);

    if (grn < 255) {
      textSize(20);
      fill(100, grn, 200);
      text("HIT", 350, 300);
    }
    grn += 10;
    recess += 1;
  }
  if ((!hitFlag) && (recess >= 90)) {
    hitFlag = true;
    grn = 0;
    recess = 0;
  }

// hit
  for (var i = 0; i < notes.length; i++) {
    notes[i].display();
    notes[i].move();

    for (var j = 0; j < beats.length; j++) {
      //if ((notes[i].hit(beats[j])) && (keyIsDown(32))) {
      if (notes[i].hit(beats[j])) {
        if (hitFlag) {
          console.log("hit");
          score += 1;
          hitFlag = false;
          recess = 0;
        }
      }
    }
  }
}

function beatShow() {
  beats[index].display();
  beats[index].update();

  if (beats[index].disappear()) {
    newBeat = true;
  }

  if (keyIsDown(32) && (newBeat)) {
    var b = new Beat();
    beats.push(b);

    index++;
    newBeat = false;
  }
}

function pauseGame() {
  if (key == 'p') {
    textSize(30);
    fill(255, 200, 100);
    text("Pause", 150, height / 2);
    noLoop();
  }
}

function mousePressed() { // continue
  loop();
}