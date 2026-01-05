class Bird {
  constructor(x, y, height, width, pipes) {
    this.pos = createVector(x, y);
    this.v = createVector(0, 0);
    this.a = createVector(0, 0);
    this._isDead = false;
    this.height = height;
    this.width = width;
    this.pipes = pipes;
  }

  addForce(force) {
    this.a.add(force);
  }
  isDead() {
    return this._isDead;
  }

  jump() {
    this.v.add(createVector(0, -3));
    if (this.v.y < -3) {
      this.v.y = -3;
    }
    if (this.v.y > 3) {
      this.v.y = 3;
    }
  }
  update() {
    this.v.add(this.a);
    this.pos.add(this.v);

    if (this.pos.y > height) {
      this._isDead = true;
    }

    if (this.pipes.some((pipe) => pipe.isCollide(this))) {
      this._isDead = true;
    }
  }

  draw() {
    fill(0, 255, 0);
    push();
    translate(this.pos.x, this.pos.y);
    rect(0, 0, this.width, this.height);
    pop();
  }
}
