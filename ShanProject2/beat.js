function Beat() {
  this.position = createVector(width/2, 400);
  this.c = 0;

  this.display = function() {
    noStroke();
    fill(this.c);
    ellipse(this.position.x, this.position.y, 20, 20);
  }
  
  this.update = function() {
    this.c += 8;
  }
  
  this.disappear = function() {
    if(this.c >= 255) {
      return true;
    }
    return false;
  }
}