class Enemy {
  constructor(x, ground, direction = "left") {
    this.h = 30;
    this.w = 50;
    this.dx = direction === "left" ? -1 : 1;

    this.x = x;

    this.y = ground.y - this.h;
  }
  draw() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    this.x += this.dx;

    if (this.x + this.w / 2 > width) {
      this.x -= this.dx;
      this.dx = this.dx * -1;
    } else if (this.x < this.w / 2 && this.dx < 0) {
      this.x -= this.dx;
      this.dx = this.dx * -1;
    }
  }
}
