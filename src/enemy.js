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

  isHit(x, y, h, w) {
    const enX2 = this.x + this.w;
    const enY2 = this.y + this.h;
    const isSameY = isBetween(this.y, y, enY2);
    const isInX = isBetween(this.x, x + w + 2, enX2);
    const isInXOtherSide = isBetween(this.x, x - w - 2, enX2);
    return isSameY && (isInX || isInXOtherSide);
  }

  move() {
    this.x += this.dx;
  }
}
