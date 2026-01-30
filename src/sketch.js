/// <reference types="p5/global"/>
// @ts-nocheck:
// deno-lint-ignore-file no-unused-vars
const WORLD_ITEMS = {
  screenZ: 700,
  palette: [
    "#FFFFFF", // Pure White
    "#E6F0FA", // Soft Ice Blue
    "#B3D4F5", // Light Sky Blue
    "#4A90E2", // Medium Blue
    "#1F4FD8", // Royal Blue
    "#0B2C5D", // Deep Navy
    "#00A8E8", // Bright Cyan
    "#6C8EBF", // Muted Steel Blue
    "#F2F4F8", // Cool Off-White
    "#A3BFFA", // Periwinkle
  ],
};
const KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,

  PLUS: 187,
  MINUS: 189,

  W: 87,
  A: 65,
  S: 83,
  D: 68,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  Q: 81,
  E: 69,
};

const getProjection = (p, screenZ = WORLD_ITEMS.screenZ) => {
  const projectedX = screenZ * p.x / p.z;
  const projectedY = screenZ * p.y / p.z;

  return createVector(projectedX, projectedY);
};

const cubes = [];

function setup() {
  createCanvas(400, 600);

  const cube1 = new Cube(0, 0, 1000, 100, 100, 100);
  const cube2 = new Cube(150, 150, 1000, 100, 100, 100);
  const cube3 = new Cube(-150, 150, 1000, 100, 100, 100);
  const cube4 = new Cube(-150, -150, 1000, 100, 100, 100);
  const cube5 = new Cube(150, -150, 1000, 100, 100, 100);

  cubes.push(cube1, cube2, cube3, cube4, cube5);
}

const drawShapes = (cubes) => {
  cubes.forEach((cube, i) => {
    const faces = cube.getWorldFacesPoint();

    faces.forEach((vertices, j) => {
      fill(WORLD_ITEMS.palette[j]);

      beginShape();
      vertices.forEach((p) => {
        const projected = getProjection(p);
        vertex(projected.x, projected.y);
      });
      const projected = getProjection(vertices[0]);
      vertex(projected.x, projected.y);
      endShape();
    });
  });
};
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
};
const callback = (shapes, mode = "eye") => {
  if (mode === "eye") {
    shapes.map((shape) => moveCallback(shape));
  }
};
function draw() {
  background(220, 220, 220);
  translate(width / 2, height / 2);
  callback(cubes);
  drawShapes(cubes);
  // noLoop();
}
