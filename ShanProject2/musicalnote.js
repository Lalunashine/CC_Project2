function MusicalNote() {
  this.position = createVector(width/2, 0);
  this.velocity = createVector(0, 3);
  this.c = color(random(100,200), random(100,200), random(100,200));

  this.display = function() {
    noStroke();
    fill(this.c, 200);
    ellipse(this.position.x, this.position.y, 24, 20);
    
    stroke(0);
    line(this.position.x + 12, this.position.y, this.position.x + 12, this.position.y - 30);
    
    noFill();
    bezier(this.position.x + 12, this.position.y - 30, this.position.x + 12, this.position.y,
      this.position.x + 24, this.position.y - 45, this.position.x + 24, this.position.y - 15);
  }

  this.move = function() {
    this.position.add(this.velocity);
  }

  this.hit = function(beat) { // judge distance between note and beat
    if ((keyIsDown(32)) && (dist(this.position.x, this.position.y, beat.position.x, beat.position.y) < 5)) {
      this.velocity.y = 0;
      this.position.add(0);
      return true;
    } else {
      return false;
    }
  }
}