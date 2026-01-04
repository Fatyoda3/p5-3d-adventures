/// <reference types="p5/global"/>
// @ts-nocheck

const generatedItems = () => {
  const items = {};
  items.blocks = generateBlocks();
  items.grounds = generateGround();
  return items;
};

let sun;
let mario;

function setup() {
  createCanvas(800, 400);
  sun = new Sun(100, 100, 100);
  const gravity = createVector(0, 0.07);
  const friction = createVector(1, 0);
  const items = generatedItems();

  mario = new Mario(40, 40, 40);
  mario.addForce(gravity);

  items.grounds.forEach((ground) => mario.addGround(ground));

  items.blocks.forEach((block) => mario.addBlock(block));

  const enemies = generateEnemy(5, mario.grounds[0]);
  // enemies.forEach((enemy) => mario.addEnemies(enemy));
}
let reset = 0;
function draw() {
  background(135, 206, 235);
  if (mario.lifes === 0) {
    background(255, 0, 0, 250);
    return;
  }
  drawSurrounding();
  fill(9);

  mario.grounds.forEach((ground) => ground.draw());

  mario.enemies.forEach((enemy) => {
    enemy.draw();
    enemy.move();
  });

  if (reset <= 0) {
    mario.draw();
    mario.update();

    if (mario.outOfBound() || mario.isOut) {
      mario.lifes -= 1;
      mario.reset();
      reset = 100;
    }
  }

  reset--;
}
