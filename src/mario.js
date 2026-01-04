const isBetween = (min, val, max) => {
  return min < val && val < max;
};

class Mario {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.size = size || 30;
    this.forces = [];
    this.v = createVector(0, 0);
    this.maxX = 3;
    this.maxY = 3;
    this.curMaxV = createVector(3, 3);
    this.onAir = true;

    this.friction = 2;

    this.lifes = 3;
    this.isOut = false;

    this.grounds = [];
    this.blocks = [];
    this.enemies = [];

    this.h = 40;
    this.w = 15;
  }
  reset() {
    this.v.x = 0;
    this.v.y = 0;
    this.pos.x = 50;
    this.pos.y = 100;
    this.isOut = false;
  }

  addGround(ground) {
    this.grounds.push(ground);
  }

  addBlock(block) {
    this.blocks.push(block);
    this.addGround(block);
  }

  addEnemies(enemy) {
    this.enemies.push(enemy);
  }

  addForce(force) {
    this.forces.push(force);
  }

  totalForce() {
    let dy = 0;
    let dx = 0;
    this.forces.map((force) => {
      dx += force.x;
      dy += force.y;
    });

    return createVector(dx, dy);
  }

  hitAnyBlock(x, y) {
    return this.blocks.find((block) => {
      const isSameY = isBetween(block.y, y - this.h, block.y + block.h);
      const isInX = isBetween(block.x, x, block.x + block.w);
      return isSameY && isInX;
    });
  }

  outOfBound() {
    return (this.pos.x < 0 ||
      this.pos.x > width || this.pos.y > height);
  }
  draw() {
    push();
    translate(this.pos.x, this.pos.y);

    //head
    fill(225, 172, 150);
    circle(0, -this.h, 20);
    // foot;
    fill(255, 0, 0);
    ellipse(0, 0, this.w, this.w / 2);
    fill(0, 20, 0, 100);

    // legs
    push();
    translate(0, -this.h / 2);
    ellipse(0, 0, this.w, this.h - 10);
    pop();

    pop();
  }
  isOnAnyGround() {
    return this.grounds.some((ground) =>
      this.isOnGround(ground, this.pos, this.pos)
    );
  }
  movements() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.v.x += 4;
      if (this.isOnAnyGround()) {
        this.curMaxV.x += 0.01;
        this.curMaxV.y += 0.01;
        this.prev = RIGHT_ARROW;
      }
    } else if (this.prev === RIGHT_ARROW) {
      this.prev = null;
      this.curMaxV.x = this.maxX;
      this.curMaxV.y = this.maxY;
    }

    if (keyIsDown(LEFT_ARROW)) {
      this.v.x -= 4;
      if (this.pos.x < 0) {
        this.pos.x = 2;
      }
      if (this.isOnAnyGround()) {
        this.prev = LEFT_ARROW;
        this.curMaxV.x += 0.01;
        this.curMaxV.y += 0.01;
      }
    } else if (this.prev === LEFT_ARROW) {
      this.prev = null;
      this.curMaxV.x = this.maxX;
      this.curMaxV.y = this.maxY;
    }

    if (keyIsDown(UP_ARROW)) {
      if (!this.onAir) {
        this.v.y -= 10;
        this.onAir = true;
      }
    }
  }

  handleEnemyHit() {
    if (this.v.y < 0) {
      return;
    }

    const possibleKill = this.enemies.find((enemy) => {
      const isSameY = isBetween(enemy.y, this.pos.y + 2, enemy.y + enemy.h);
      const isInX = isBetween(enemy.x, this.pos.x, enemy.x + enemy.w);
      return isSameY && isInX;
    });

    if (possibleKill) {
      this.onAir = false;
      this.enemies = this.enemies.filter((each) => each !== possibleKill);
      this.v.y = -1;
      return;
    }

    const isHitted = this.enemies.some((enemy) =>
      enemy.isHit(this.pos.x, this.pos.y, this.h, this.w)
    );

    if (isHitted) {
      mario.isOut = true;
    }
  }

  hitAbove(obj, prev, newPos) {
    const w2 = this.w / 2;
    const h2 = this.h / 2;
    if (!isBetween(obj.x - w2, newPos.x, obj.x + obj.w + w2)) {
      return false;
    }
    return ((prev.y - this.h) > (obj.y + obj.h)) &&
      (newPos.y - this.h <= obj.y + obj.h);
  }

  isOnGround(obj, prev, newPos) {
    const w2 = this.w / 2;

    if (!isBetween(obj.x - w2, newPos.x, obj.x + obj.w + w2)) {
      return false;
    }
    return newPos.y >= obj.y && prev.y <= obj.y;
  }
  isWallHitted(newPos) {
    const w2 = this.w / 2;
    const h2 = this.h / 2;
    return this.grounds.find((ground) => {
      const isXRange = isBetween(
        ground.x - w2 - 1,
        newPos.x,
        ground.x + ground.w + w2,
      );
      const isYRange = isBetween(
        ground.y + 2,
        newPos.y,
        ground.y + ground.w + this.h - 2,
      );
      return isXRange && isYRange;
    });
  }

  update() {
    const netForce = this.totalForce();
    const prev = { x: this.pos.x, y: this.pos.y };

    if (Math.abs(this.v.y) > this.curMaxV.y) {
      this.v.y = this.curMaxV.y * Math.sign(this.v.y);
    }
    if (Math.abs(this.v.x) > this.curMaxV.x) {
      this.v.x = this.curMaxV.x * Math.sign(this.v.x);
    }

    this.v.add(netForce);
    if (this.v.x !== 0) {
      if (Math.abs(this.v.x) < 1) {
        this.v.x = 0;
      } else {
        this.v.x += this.friction * -Math.sign(this.v.x);
      }
    }

    this.pos.add(this.v);

    const hitAboveGround = this.grounds.find((ground) => {
      return this.hitAbove(ground, prev, this.pos);
    });
    const onGround = this.grounds.find((ground) =>
      this.isOnGround(ground, prev, this.pos)
    );

    this.onAir = true;
    if (hitAboveGround) {
      this.pos.y = hitAboveGround.y + hitAboveGround.h + this.h;
      this.v.y = 0;
    } else if (onGround) {
      this.onAir = false;
      this.v.y = 0;
      this.pos.y = onGround.y;
    }

    const hitBlock = this.isWallHitted(this.pos);
    if (hitBlock) {
      if (this.v.x >= 0) {
        this.pos.x = hitBlock.x - this.w / 2;
      } else {
        this.pos.x = hitBlock.x + hitBlock.w + this.w / 2;
      }
    }

    const hittedBlock = this.hitAnyBlock(this.pos.x, this.pos.y - 1);

    if (hittedBlock && this.v.y <= 1) {
      this.v.y = 2;
      this.blocks = this.blocks.filter((each) => each !== hittedBlock);
      this.grounds = this.grounds.filter((each) => each !== hittedBlock);
    }

    this.handleEnemyHit();
    this.movements();
  }
}
