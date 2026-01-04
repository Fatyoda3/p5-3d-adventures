const drawLife = (x, y, size) => {
  circle(x, y, size);
};

const drawLifes = (lifes) => {
  for (let index = 0; index < lifes; index++) {
    drawLife(width - ((index + 1) * 20), 20, 10);
  }
};

const drawSurrounding = () => {
  sun.draw();
  drawLifes(mario.lifes);
};

const generateEnemy = (count = 4, ground) => {
  return Array.from(
    { length: count },
    () => new Enemy(random(0, width), ground, ["left", "right"][random(0, 2)]),
  );
};

const generateGround = () => {
  const grounds = [];

  const g1Color = [150, 75, 0, 100];
  grounds.push(new Ground(0, height - 40, 50, width / 2 - 50, g1Color));
  // grounds.push(new Ground(width / 2, height - 40, 50, width / 2, g1Color));
  grounds.push(new Ground(100, height - 80, 20, 100, g1Color));
  // grounds.push(new Ground(200, height - 120, 20, 200, g1Color));
  // grounds.push(new Ground(500, height - 160, 20, 200, g1Color));
  return grounds;
};
const generateBlocks = () => {
  const blocks = [];

  blocks.push(new Block(0, height - 150, 40, 40, [255, 0, 0]));
  blocks.push(new Block(200, height - 200, 40, 40, [255, 0, 0]));
  blocks.push(new Block(400, height - 230, 40, 40, [255, 0, 0]));

  return blocks;
};
