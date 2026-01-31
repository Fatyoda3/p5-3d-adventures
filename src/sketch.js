/// <reference types="p5/global"/>
// @ts-nocheck:
const SHAPES = [];
const DETAILS = {
  topAlign: 20,
  rightAlign: 120,
  textSize: 15
};
const MODES = {
  eye: 'eye',
  object: 'object'
};
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
  NINE: 57,
  ZERO: 48,
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
  M: 77,
  Q: 81,
  E: 69,
};

function setup() {
  createCanvas(600, 600);

  ((x) => {
    if (x) return;
    const cube1 = new Cube(0, 0, 1000, 100, 100, 100);
    const cube2 = new Cube(150, 150, 1000, 100, 100, 100);
    const cube3 = new Cube(-150, 150, 1000, 100, 100, 100);
    const cube4 = new Cube(-150, -150, 1000, 100, 100, 100);
    const cube5 = new Cube(150, -150, 1000, 100, 100, 100);

    SHAPES.push(cube1, cube2, cube3, cube4, cube5);
  })(false);

}

let selectedIdx = 0;

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

const callback = (shapes, mode = "eye") => {
  if (mode === "eye") {
    shapes.map((shape) => moveCallback(shape));
  } else {
    const selectedShape = shapes[selectedIdx];
    moveCallback(selectedShape);
  }
};

function keyPressed() {
  if (key === "M" || key === "m") {
    mode = mode === MODES.eye ? MODES.object : MODES.eye;
  }
  if (key === '[' || key === '{') {
    selectedIdx = (selectedIdx === 0) ? (SHAPES.length - 1) : (selectedIdx - 1);
  }
  if (key === ']' || key === '}') {
    selectedIdx = (selectedIdx + 1) % SHAPES.length;
  }



}


let mode = MODES.eye;

const showDetails = () => {
  push()
  translate(-width / 2, -height / 2);

  textSize(DETAILS.textSize);
  const formatted = `mode: ${mode}\ncurrent: ${selectedIdx}`;
  text(formatted, width - DETAILS.rightAlign, DETAILS.topAlign);
  pop()

}

function draw() {
  background(220, 220, 220);
  translate(width / 2, height / 2);
  callback(SHAPES, mode);
  // stateCallback()
  drawShapes(SHAPES);
  showDetails()
  // noLoop();
}
