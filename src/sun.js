class Sun {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  draw() {
    fill(201, 141, 38);
    circle(this.x, this.y, this.r);
  }
}
