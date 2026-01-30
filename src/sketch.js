/// <reference types="p5/global"/>
// @ts-nocheck:
const scaleFactor = 30;

const WORLD_ITEMS = {
  screenZ: 700,
  x: [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ].map((group) => group.map((p) => p * scaleFactor)),
};

let pC, pC2;
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

  // cube = new Cube(0, 0, 1000, 200, 200, 200);
  pC = createVector(100, 200, 900);
  pC2 = createVector(100, 200, 700);
}

const size = 40;

function draw() {
  background(220, 220, 220);
  translate(width / 2, height / 2);

  const projectedPoint = getProjection(pC);
  fill(255, 0, 0);
  circle(projectedPoint.x, projectedPoint.y, size);

  const projectedPoint2 = getProjection(pC2);
  fill(0, 255, 0, 100);
  circle(projectedPoint2.x, projectedPoint2.y, size);
  fill(255, 0, 0, 100);
  circle(pC.x, pC.y, 20);




}
