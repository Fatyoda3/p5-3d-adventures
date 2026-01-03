class Ground {
  constructor(y, height) {
    this.y = y;
    this.height = height;
  }
  draw() {
    noStroke();
    fill(150, 75, 0);
    rect(0, this.y, width, this.height);
  }
}
