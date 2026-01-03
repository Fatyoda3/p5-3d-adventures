/// <reference types="p5/global"/>
// @ts-nocheck

const g1Color = [150, 75, 0, 100];

let ground;
let sun;
let mario;

let blocks = [];

const smallBlock = (x, y) => {
  return new Block(x, y, 40, 40, [255, 0, 0]);
};
const generateEnemy = (count = 4, ground) => {
  return Array.from(
    { length: count },
    () => new Enemy(random(0, width), ground, ["left", "right"][random(0, 2)]),
  );
};

const generateGround = () => {
  const grounds = [];

  grounds.push(new Ground(100, height - 80, 50, 100, g1Color));
  grounds.push(new Ground(200, height - 120, 50, 200, g1Color));
  grounds.push(new Ground(500, height - 160, 50, 200, g1Color));
  return grounds;
};

function setup() {
  createCanvas(800, 400);

  const gravity = createVector(0, 0.1);
  sun = new Sun(100, 100, 100);

  const groundHeight = 40;

  const groundHeight2 = 150;
  const b1 = smallBlock(0, height - 150);
  blocks.push(b1);

  mario = new Mario(40, 40, 40);
  mario.addForce(gravity);
  mario.addBlock(b1);

  const mainGround = new Ground(0, height - 40, 50, width, g1Color);
  const grounds = generateGround();

  mario.addGround(mainGround);
  grounds.forEach((ground) => mario.addGround(ground));

  const enemies = generateEnemy(5, mainGround);
  enemies.forEach((enemy) => mario.addEnemies(enemy));

  const items = [mario, ground, sun];
}

let lives = 2;
let reset = 0;
function draw() {
  background(135, 206, 235);
  if (lives === 0) {
    background(255, 0, 0, 250);
    return;
  }

  for (let index = 0; index < lives; index++) {
    circle(width - ((index + 1) * 20), 20, 10);
  }

  sun.draw();

  mario.enemies.forEach((enemy) => {
    enemy.draw();
    enemy.move();
  });

  mario.grounds.forEach((ground) => ground.draw());
  mario.blocks.forEach((each) => each.draw());

  if (reset <= 0) {
    mario.draw();
    mario.update();

    if (mario.outOfBound()) {
      lives--;
      mario.pos.x = 50;
      mario.pos.y = 100;
      mario.v.x = 0;
      mario.v.y = 0;
      reset = 100;
    }
  }
  reset--;
}
