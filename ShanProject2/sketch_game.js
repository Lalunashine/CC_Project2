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
var grn = 0; // green value

var pauseFlag = false;
var exitFlag = false;
var pauseButton;
var exitButton;

var timer = 3;
var song, analyzer;

function preload() {
  font = loadFont('data/font2.otf');
  song = loadSound('data/king.mp3');
}

function setup() {
  createCanvas(600, 450);
  textFont(font);

  pauseButton = new Button(500, 400, 60, 25);
  exitButton = new Button(30, 400, 60, 25);

  n0 = new MusicalNote();
  notes.push(n0);

  b0 = new Beat();
  beats.push(b0);

  analyzer = new p5.Amplitude(); // create a new Amplitude analyzer
  analyzer.setInput(song); // Patch the input to an volume analyzer
}

function draw() {
  background(255);
  stroke(200);
  textSize(20);
  fill(255, 0, 0);

  if (timer > 0) {
    text(timer, width / 2, height / 2);
    if (frameCount % 50 === 0) {
      timer--;
      //console.log(frameCount + "hi");
    }
  }
  if (timer === 0) {
    text("G O !", width / 2, height / 2);
    if (frameCount % 180 === 0) {
      timer -= 1;
      song.play();
      //console.log(frameCount + "hello");
    }
  }
  if (timer < 0) {
    console.log(frameCount + "hi");
    line(width / 2, 0, width / 2, height); // reference line 1
    line(0, 350, width, 350); // reference line 2

    textSize(20);
    fill(255, 0, 0);
    text("current score: " + score, 20, 100);

    noteFalling();
    beatShow();

    pauseButton.display(mouseX, mouseY, "Pause Button");
    exitButton.display(mouseX, mouseY, "Exit Button");

    var rms = analyzer.getLevel(); // Get the average (root mean square) amplitude
    fill(200, 200, 100);
    stroke(0);
    // Draw an ellipse with size based on volume
    ellipse(width / 2 + 100, height / 2 - 100, 10 + rms * 200, 10 + rms * 200);
  }
}

function noteFalling() {
  console.log(frameCount);
  if ((frameCount > 260) && (frameCount % 52 === 0)) { // later will be executed with the music rhythm
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
  if ((!hitFlag) && (recess >= 50)) {
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
    console.log(frameCount + "aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    var b = new Beat();
    beats.push(b);

    index++;
    newBeat = false;
  }
}

function mousePressed() {
  if (pauseButton.contain(mouseX, mouseY)) {
    if (pauseFlag) {
      pauseFlag = false;
    } else {
      pauseFlag = true;
    }
    pauseGame();
  }

  if (exitButton.contain(mouseX, mouseY)) {
    exitFlag = true;
    background(200);
    exitGame();
  }
}

function pauseGame() {
  if (pauseFlag) {
    textSize(30);
    fill(255, 200, 100);
    text("Pause", 150, height / 2);

    noLoop();
    song.pause();
  } else { // continue
    loop();
    song.play();
  }
}

/*
function exitGame() {
  if (exitFlag) {
    song.stop();
    location.href = "index_exit.html";
  }
}

*/
///*
function exitGame() {
  if (exitFlag) {
    tint(200);
    textSize(20);
    fill(200, 200, 200);
    text("Game Over", width / 2 - 50, height / 2 - 10);
    console.log("test");
    text("Your score is  " + score, width / 2 - 60, height / 2 + 10);

    song.stop();
    noLoop();

    var backButton;
    backButton = createButton("Back");
    backButton.position(width / 2 - 20, 400);
    backButton.mousePressed(shiftPage);
  }
}

function shiftPage() {
  location.href = "index.html"; // shift to main interface
}