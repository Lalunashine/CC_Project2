var font;
var imgs = [];
var song, analyzer, fft;

var notes = [];
var beats = [];
var n0;
var b0;

var hitFlag = true; // flag for accurate hit
var recess; // timer for music note 
var index = 0; // index for beat
var newBeat = true; // flag for new beat creation

var pauseFlag = false;
var exitFlag = false;
var pauseButton;
var exitButton;

var score = 0;
var bonusFlowers = [];
var scoreFlowers = [];
var grn = 0; // green value
var timer = 3;

function preload() {
  song = loadSound('data/king.mp3');
  font = loadFont('data/font.otf');

  for (var i = 0; i < 6; i++) {
    imgs[i] = loadImage('data/img' + i + '.png');
  }
}

function setup() {
  createCanvas(900, 600);
  textFont(font);

  analyzer = new p5.Amplitude(); // create a new Amplitude analyzer
  analyzer.setInput(song); // patch the input to an volume analyzer
  fft = new p5.FFT(); // create a new FFT
  // song.play();

  n0 = new MusicalNote();
  notes.push(n0);
  b0 = new Beat();
  beats.push(b0);
  // scoreFlowers[0] = new Flower(width / 2, height / 2, 0);

  pauseButton = new Button(550, 30, 78, 25);
  exitButton = new Button(280, 30, 68, 25);
}

function draw() {
  background(imgs[3]);
  noStroke();
  fill(255, 100);
  rect(0, 0, width, height); // add white shade on background

  stroke(200);
  textSize(50);
  fill(200, 0, 0);

  if (timer > 0) {
    text(timer, width / 2, height / 2);
    if (frameCount % 50 === 0) {
      timer--;
    }
  }
  if (timer === 0) {
    text("G O", width / 2 - 30, height / 2);
    if (frameCount % 180 === 0) {
      timer -= 1;
      song.play();
    }
  }
  if (timer < 0) {
    line(width / 2, 0, width / 2, 400); // vertical reference line
    line(0, 400, width, 400); // horizontal reference line

    noteFalling();
    beatShow();
    soundVisualization();

    pauseButton.display(mouseX, mouseY, "Pause Button");
    exitButton.display(mouseX, mouseY, "Exit Button");

    textSize(20);
    fill(255, 100, 0);
    text("current score   " + score, width / 2 - 80, 500);
  }
}

function soundVisualization() {
  var rms = analyzer.getLevel(); // get the average (root mean square) amplitude
  fill(map(rms, 0, 1.5, 0, 255), 0, 0);
  noStroke();
  //ellipse(width / 2, height / 2, 10 + rms * 200, 10 + rms * 200);
  //console.log(rms);

  var spectrum = fft.analyze(); // get amplitude values along the frequency domain. 
  noStroke();
  for (var i = 0; i < spectrum.length / 16; i++) {
    fill(spectrum[i], spectrum[i] / 10 + 100, 100, 200);
    var x = map(i, 0, spectrum.length / 16, 0, height);
    var h = map(spectrum[i], 80, 255, 0, width / 4);
    rect(0, x, h, spectrum.length / 256);
    rect(width, x, -h, spectrum.length / 256);
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
      textSize(50);
      fill(100, grn, 200);
      text("HIT", 550, 250);
      bonusFlowers[bonusFlowers.length - 1].display();
      bonusFlowers[bonusFlowers.length - 1].update();
      //image(imgs[5], width / 3 - imgs[5].width / 2, height / 2 - imgs[5].height / 2);
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

          var bonusf = new Flower(width / 3, height / 2 - 60, 180 * bonusFlowers.length);
          bonusFlowers.push(bonusf);
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
    background(imgs[4]);
    exitFlag = true;
    exitGame();
  }

  if ((mouseX > (width / 2 - imgs[1].width / 2)) && (mouseX < (width / 2 + imgs[1].width / 2)) && (mouseY > (height / 4 - imgs[1].height / 2)) && (mouseY < (height / 4 + imgs[1].height / 2))) {
    location.href = "index.html"; // shift to main interface
  }
}

function pauseGame() {
  if (pauseFlag) {
    textSize(30);
    fill(0);
    text("Pause", 150, height / 2);

    noLoop();
    song.pause();
  } else { // continue
    loop();
    song.play();
  }
}

function exitGame() {
  if (exitFlag) {
    background(imgs[4]);
    noStroke();
    fill(255, 100);
    rect(0, 0, width, height); // add white shade on background
    //image(imgs[1], width / 4 - imgs[1].width / 2, height / 2 + imgs[1].height / 2);

    textSize(20);
    fill(150);
    text("Game Over", width / 4 - 50, height / 2 - 50);
    text("Your score is  " + score, width / 4 - 60, height / 2 - 20);

    if (score > 0) {
      for (var i = 0; i < score; i++) {
        var scoref = new Flower(random(50, width / 2), random(50, height - 50), 36 * scoreFlowers.length);
        scoreFlowers.push(scoref);
        scoreFlowers[i].display();
        console.log("hello");
      }
    }

    song.stop();
    noLoop();
  }
}