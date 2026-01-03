class Mario {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.size = size || 30;
    this.a = GRAVITY;
    this.v = createVector(0, 0);
  }
  draw() {
    fill(0, 20, 0);
    circle(this.pos.x, this.pos.y, this.size);
  }
  update() {
    this.pos.add(this.v);
  }
}
