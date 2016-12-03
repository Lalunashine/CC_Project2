var font;
var img;
var gameLink;

function preload() {
  font = loadFont('data/font1.otf');
  img = loadImage('data/image.png');
}

function setup() {
  createCanvas(600, 450);
  tint(200);
  background(img);
  textFont(font);

  var startButton;
  gameLink = "index_game.html";
  startButton = createButton("Play Now");
  startButton.position(280, 330);
  startButton.mousePressed(shiftPage);

  fill(255);
  textSize(20);
  text("Hello", 100, 100);
}

function draw() {
  // more visual effect and interactivity for welcome interface 
  // similar as flying bird in http://www.thewildernessdowntown.com/
}

function shiftPage() {
  location.href = gameLink; // shift to game interface
}
