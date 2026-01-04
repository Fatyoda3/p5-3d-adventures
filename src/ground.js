class Ground {
  constructor(x, y, height, width, color = [150, 75, 0]) {
    this.x = x;
    this.y = y;
    this.h = height;
    this.w = width;
    this.color = color;
  }

  draw() {
    noStroke();
    fill(this.color);

    rect(this.x, this.y, this.w, this.h);
  }
}
