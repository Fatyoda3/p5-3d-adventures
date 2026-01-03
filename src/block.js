class Block {
  constructor(x, y, height, width, color = [150, 75, 0]) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
  }

  draw() {
    noStroke();
    fill(this.color);

    rect(this.x, this.y, this.width, this.height);
  }
}
