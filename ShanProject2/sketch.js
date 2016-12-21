var font;
var imgs = []; // for background and star button
var points = []; // for notes 
var flowers = [];
var gameLink = "index_game.html";

function preload() {
  for (var i = 0; i < 3; i++) {
    imgs[i] = loadImage('data/img' + i + '.png');
  }
  font = loadFont('data/font.otf');
}

function setup() {
  createCanvas(900, 600);
  noCursor(); // hide cursor
  textFont(font);
  textSize(15);
  
  flowers[0] = new Flower(width / 2, height / 2, 0, 12.0); // initialize flower array
}

function draw() {
  background(imgs[2]); // display background 
  noStroke();
  fill(255, 150); 
  rect(0, 0, width, height); // add white cover on it to make it fade

  for (var i = 0; i < 2; i++) {
    if ((mouseX > width / 2 - imgs[i].width) && (mouseX < (width / 2 + imgs[i].width)) && (mouseY > (height / 3 - imgs[i].height / 2)) && (mouseY < (height / 3 + imgs[i].height / 2))) {
      image(imgs[1], width / 2 - imgs[i].height / 2, height / 3 - imgs[1].height / 2); // mouse on star, open eye
      if (mouseIsPressed) { // click star
        location.href = gameLink; // shift to game interface
      }
    } else {
      image(imgs[0], width / 2 - imgs[0].height / 2, height / 3 - imgs[0].height / 2); // mouse off star, close eye
    }
  }

  for (var j = 0; j < flowers.length; j++) { // update flowers 
    flowers[j].display();
    flowers[j].update();
  }
  if (frameCount % 20 === 0) { // generate flowers every 20 frames automaticly
    var autof = new Flower(random(width), random(height), 36 * flowers.length, 12.0);
    flowers.push(autof);
  }
  
  noteCusor(); // display note cusor in stead of arrow
  
  noStroke();
  fill(100);
  text("click star to enter game", width/2 - 80, height/2);
}

function mousePressed() { // whenever click mouse, generate a flower
  var mousef = new Flower(mouseX, mouseY, 36 * flowers.length, 12.0);
  flowers.push(mousef);
}

function noteCusor() {
  /* single musical note
  fill(0);
  ellipse(mouseX, mouseY, 24, 20);
  stroke(0);
  line(mouseX + 12, mouseY, mouseX + 12, mouseY - 30);
  noFill();
  bezier(mouseX + 12, mouseY - 30, mouseX + 12, mouseY, mouseX + 24, mouseY - 45, mouseX + 24, mouseY - 15);
  */

  ///*  note-like mouse history
  var point = {
    x: mouseX,
    y: mouseY
  }
  points.push(point);

  if (points.length > 25) { // limit size of note array
    points.splice(0, 1); // not slice() !!!
  }

  for (var i = 0; i < points.length; i++) { // draw notes with same size, different color
    var j = points.length - 1;
    noStroke();
    fill(250 - 10 * i);
    ellipse(points[i].x, points[i].y, j + 2, j);
    stroke(0);
    line(points[i].x + (j + 2) / 2, points[i].y, points[i].x + (j + 2) / 2, points[i].y - 2 * j);
    noFill();
    bezier(points[i].x + (j + 2) / 2, points[i].y - 2 * j, points[i].x + (j + 2) / 2, points[i].y - j,
      points[i].x + (j + 2), points[i].y - j, points[i].x + (j + 2), points[i].y - j / 2);
  }
  //*/
}