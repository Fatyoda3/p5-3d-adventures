class Pipe {
  constructor(x, y, gap, height, size = 40) {
    this.pos = createVector(x, y);
    this.height = height;
    this.gap = gap;
    this.width = size;
    this.speed = createVector(-1, 0);
  }

  reset() {
    this.pos.x = width;
    this.pos.y = 0;
    this.height = random(100, 300);
  }
  isOut() {
    return this.pos.x + this.width < 0;
  }

  isCollide(obj) {
    const isInX = obj.pos.x + obj.width > this.pos.x &&
      obj.pos.x < this.pos.x + this.width;

    const isInY = obj.pos.y + obj.height > this.pos.y &&
      obj.pos.y < this.pos.y + this.height;

    const isInY2 =
      obj.pos.y + obj.height > this.pos.y + this.height + this.gap &&
      obj.pos.y < width;

    return isInX && (isInY || isInY2);
  }

  update() {
    this.pos.add(this.speed);
    if (this.isOut()) {
      this.reset();
    }
  }

  draw() {
    fill(255, 0, 0);
    push();
    translate(this.pos.x, this.pos.y);
    rect(0, 0, this.width, this.height);
    rect(0, this.height + this.gap, this.width, height);
    pop();
  }
}
