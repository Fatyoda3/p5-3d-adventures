const isBetween = (min, val, max) => {
  return min < val && val < max;
};

class Mario {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.size = size || 30;
    this.forces = [];
    this.v = createVector(0, 0);
    this.grounds = [];
    this.blocks = [];
    this.enemies = [];
    this.h = 40;
    this.w = 15;
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

  isOnInAnyGroud(x, y) {
    return this.grounds.some((ground) => {
      const isSameY = isBetween(ground.y, y, ground.y + ground.height);
      const isInX = isBetween(ground.x, x, ground.x + ground.width);
      return isSameY && isInX;
    });
  }

  isOnInAnyBlock(x, y) {
    return this.blocks.find((block) => {
      const isSameY = isBetween(block.y, y - this.h, block.y + block.height);
      const isInX = isBetween(block.x, x, block.x + block.width);
      return isSameY && isInX;
    });
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

  outOfBound() {
    return (this.pos.x < 0 ||
      this.pos.x > width || this.pos.y > height);
  }
  draw() {
    fill(255, 0, 0);
    circle(this.pos.x, this.pos.y, 10);
    fill(0, 20, 0, 100);
    translate(0, -this.h / 2);
    ellipse(this.pos.x, this.pos.y, this.w, this.h);
  }

  movements() {
    if (
      keyIsDown(RIGHT_ARROW) && !this.isOnInAnyGroud(this.pos.x + 1, this.pos.y)
    ) {
      this.pos.x += 4;
    }

    if (
      keyIsDown(LEFT_ARROW) && !this.isOnInAnyGroud(this.pos.x - 1, this.pos.y)
    ) {
      this.pos.x -= 4;
      if (this.pos.x < 0) {
        this.pos.x = 2;
      }
    }
    if (keyIsDown(UP_ARROW)) {
      if (this.isOnInAnyGroud(this.pos.x, this.pos.y + 2)) {
        this.v.y -= 8;
      }
    }
  }

  handleEnemyHit() {
    if (this.v.y <= 0) {
      return;
    }

    const possibleEnemy = this.enemies.find((enemy) => {
      const isSameY = isBetween(
        enemy.y,
        this.pos.y + 2,
        enemy.y + enemy.h,
      );
      const isInX = isBetween(enemy.x, this.pos.x, enemy.x + enemy.w);

      return isSameY && isInX;
    });

    if (possibleEnemy) {
      this.enemies = this.enemies.filter((each) => each !== possibleEnemy);
      this.v.y = 2;
    }
  }
  update() {
    const netForce = this.totalForce();

    if (this.isOnInAnyGroud(this.pos.x, this.pos.y + 1) && this.v.y >= 0) {
      this.v.y = 0;
      netForce.y = 0;
    } else if (
      this.isOnInAnyGroud(this.pos.x, this.pos.y - 1) && this.v.y <= 0
    ) {
      this.v.y = 0;
      if (netForce.y < 0) {
        netForce.y = 0;
      }
    }

    const possibleEffectiveBlock = this.isOnInAnyBlock(
      this.pos.x,
      this.pos.y - 1,
    );

    if (possibleEffectiveBlock && this.v.y <= 0) {
      this.v.y = 0;
      this.blocks = this.blocks.filter((each) =>
        each !== possibleEffectiveBlock
      );
      this.grounds = this.grounds.filter((each) =>
        each !== possibleEffectiveBlock
      );
    }

    this.handleEnemyHit();
    this.v.add(netForce);

    if (this.v.y > 3) {
      this.v.y = 3;
    }
    if (this.v.y < -3) {
      this.v.y = -3;
    }

    this.pos.add(this.v);

    if (this.isOnInAnyGroud(this.pos.x, this.pos.y)) {
      const ground = this.grounds.find((ground) => {
        const isSameY = isBetween(
          ground.y,
          this.pos.y,
          ground.y + ground.height,
        );
        const isInX = isBetween(ground.x, this.pos.x, ground.x + ground.width);
        return isSameY && isInX;
      });
      this.pos.y = ground.y - 1;
    }

    this.movements();
  }
}
