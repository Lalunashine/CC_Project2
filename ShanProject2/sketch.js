var imgs = [];
var points = [];
var flowers = [];
var gameLink = "index_game.html";

function preload() {
  for (var i = 0; i < 3; i++) {
    imgs[i] = loadImage('data/img' + i + '.png');
  }
}

function setup() {
  createCanvas(900, 600);
  noCursor();

  flowers[0] = new Flower(width / 2, height / 2, 0, 12.0);
}

function draw() {
  background(imgs[2]);
  noStroke();
  fill(255, 150);
  rect(0, 0, width, height);
  
  for (var i = 0; i < 2; i++) {
    if ((mouseX > width / 2 ) && (mouseX < (width / 2 + imgs[i].width)) && (mouseY > (height / 4 - imgs[i].height / 2)) && (mouseY < (height / 4 + imgs[i].height / 2))) {
      image(imgs[1], width / 2, height / 4 - imgs[1].height / 2);
      if (mouseIsPressed) {
        location.href = gameLink; // shift to game interface
      }
    } else {
      image(imgs[0], width / 2 - 5, height / 4 - imgs[0].height / 2);
    }
  }

  for (var j = 0; j < flowers.length; j++) {
    flowers[j].display();
    flowers[j].update();
  }
  if (frameCount % 10 === 0) {
    var autof = new Flower(random(width), random(height), 36 * flowers.length, 12.0);
    flowers.push(autof);
  }

  noteCusor();
}

function mousePressed() {
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

  if (points.length > 25) {
    points.splice(0, 1); // not slice() !!!
  }
  
  for (var i = 0; i < points.length; i++) {
    var j = points.length - 1;
    noStroke();
    fill(250 - 10 * i);
    ellipse(points[i].x, points[i].y, j + 2, j);
    stroke(0);
    line(points[i].x + (j + 2) / 2, points[i].y, points[i].x + (j + 2) / 2, points[i].y - 2*j);
    noFill();
    bezier(points[i].x + (j + 2) / 2, points[i].y - 2*j, points[i].x + (j + 2) / 2, points[i].y -j,
      points[i].x + (j + 2), points[i].y - j, points[i].x + (j + 2), points[i].y - j/2);
  }
  //*/
}