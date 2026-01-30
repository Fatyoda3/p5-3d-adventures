/// <reference types="p5/global"/>
// @ts-nocheck:
// deno-lint-ignore-file no-unused-vars

const scaleFactor = 30;

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

class Cube {
  constructor(x, y, z, h, w, d) {
    this.centre = createVector(x, y, z);
    this.h = h;
    this.w = w;
    this.d = d;
    this.vertices = this.createVertices();
  }

  createVertices() {
    // {FRONT/BACK}<->{LEFT/RIGHT}<->{TOP/BOTTOM}
    const [w2, h2, d2] = [this.w / 2, this.h / 2, this.d / 2];
    const p1 = createVector(-w2, -h2, -d2); //(F-L-T)
    const p2 = createVector(-w2, +h2, -d2); //(F-L-B)
    const p3 = createVector(+w2, +h2, -d2); //(F-R-B)
    const p4 = createVector(+w2, -h2, -d2); //(F-R-T)
    const p5 = createVector(+w2, -h2, +d2); //(B-R-T)
    const p6 = createVector(+w2, +h2, +d2); //(B-R-B)
    const p7 = createVector(-w2, +h2, +d2); //(B-L-B)
    const p8 = createVector(-w2, -h2, +d2); //(B-L-T)
    return [p1, p2, p3, p4, p5, p6, p7, p8];
  }
}

const getProjection = (p, screenZ = WORLD_ITEMS.screenZ) => {
  const projectedX = screenZ * p.x / p.z;
  const projectedY = screenZ * p.y / p.z;

  return createVector(projectedX, projectedY);
};

let cube;
function setup() {
  createCanvas(400, 600);

  cube = new Cube(0, 0, 1000, 100, 100, 100);
}

function draw() {
  background(220, 220, 220);
  translate(width / 2, height / 2);

  cube.vertices.forEach((p, i) => {
    const actualPos = p5.Vector.add(p, cube.centre);

    const toProject = getProjection(actualPos);

    fill(WORLD_ITEMS.palette[i]);
    circle(toProject.x, toProject.y, 5);
  });

  noLoop();
}
