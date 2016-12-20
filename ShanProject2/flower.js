function Flower(_x, _y, _angle, _totalSize) {
  this.green = 0;
  this.blue = 0;
  this.alpha = random(150, 255);

  this.angle = _angle; // for petal
  this.theta = 0.01; // for rotate
  this.size = cos(radians(this.angle)) * _totalSize;

  this.position = createVector(_x, _y);
  this.direction = random(0, TWO_PI);

  this.display = function() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.theta);

    for (var a = 0; a < 360; a += 72) { // 5 petals
      var xoff = cos(radians(a)) * this.size; // x coordinate offset for petals 
      var yoff = sin(radians(a)) * this.size; // y coordiante offset for petals
      noStroke();
      fill(255, this.green, this.blue, this.alpha); // change color of petals with mouse location
      ellipse(xoff, yoff, this.size, this.size); // draw petals around mouse 
    }
    fill(235, 82, 9, 80); // orange
    ellipse(0, 0, 3, 3); // draw the flower heart

    pop();
  }

  this.update = function() {
    this.theta += 0.01; // rotate

    this.velocity = createVector(cos(this.direction), sin(this.direction));
    this.velocity = this.velocity.mult(0.5);
    this.position.add(this.velocity);

    this.green = map(this.position.x, 0, width, 100, 230);
    this.blue = map(this.position.y, 0, height, 50, 230);
  }
}