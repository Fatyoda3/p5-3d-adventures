const moveCallback = (shape, delta = 5) => {
  if (keyIsDown(KEYS.LEFT)) {
    shape.centre.x -= delta;
  }
  if (keyIsDown(KEYS.RIGHT)) {
    shape.centre.x += delta;
  }
  if (keyIsDown(KEYS.UP)) {
    shape.centre.y -= delta;
  }
  if (keyIsDown(KEYS.DOWN)) {
    shape.centre.y += delta;
  }
  if (keyIsDown(KEYS.NINE)) {
    shape.centre.z -= delta;
  }
  if (keyIsDown(KEYS.ZERO)) {
    shape.centre.z += delta;
  }
};
