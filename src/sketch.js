/// <reference types="p5/global"/>
// @ts-nocheck

const GAP_RANGE = [70, 100];
const PIPE_WIDTH = 30;
const PIPE_HEIGHT_RANGE = [100, 200];

const generatePipes = (count) => {
  const arrangeSize = width / count;
  const pipes = [];
  for (let index = 0; index < count; index++) {
    const x = width + index * arrangeSize;
    const gap = random(...GAP_RANGE);
    const height = random(...PIPE_HEIGHT_RANGE);
    const pipe = new Pipe(x, 0, gap, height, PIPE_WIDTH);
    pipes.push(pipe);
  }
  return pipes;
};

let bird;
let pipes;

function setup() {
  createCanvas(800, 400);
  const gravity = createVector(0, 0.1);

  pipes = generatePipes(4);

  bird = new Bird(50, 50, 10, 50, pipes);
  bird.addForce(gravity);
}

function draw() {
  background(220);
  bird.update();
  bird.draw();
  pipes.forEach((pipe) => {
    pipe.draw();
    pipe.update();
  });

  if (bird.isDead()) {
    noLoop();
  }
  if (keyIsPressed) {
    bird.jump();
  }
}
