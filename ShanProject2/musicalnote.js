function MusicalNote() {
  this.position = createVector(width / 2, 0);
  this.velocity = createVector(0, 3);
  this.c = color(random(255), random(255), random(255));

  this.display = function() {
    noStroke();
    fill(this.c);
    ellipse(this.position.x, this.position.y, 20, 20);
  }

  this.move = function() {
    this.position.add(this.velocity);
  }

  this.hit = function(beat) {
    if ((keyIsDown(32)) && (dist(this.position.x, this.position.y, beat.position.x, beat.position.y) < 5)) {
      this.velocity.y = 0;
      return true;
    } else {
      return false;
    }
  }

}