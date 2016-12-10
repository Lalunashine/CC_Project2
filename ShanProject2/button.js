Button = function(_x, _y, _w, _h) {
  var x = _x;
  var y = _y;
  var w = _w;
  var h = _h;

  // Is a point inside the button? (used for mouse rollover, etc.)
  this.contain = function(mx, my) {
    if ((mx > x) && (mx < x + w) && (my > y) && (my < y + h)) {
      return true;
    } else {
      return false;
    }
  };

  // Show the button
  this.display = function(mx, my, word) {
    if (this.contain(mx, my)) {
      fill(100);
    } else {
      fill(175);
    }
    noStroke(0);
    rect(x, y, w, h);

    fill(50);
    textSize(10);
    text(word, x, y + h*2/3);
  };
}