/// <reference types="p5/global"/>
// @ts-nocheck

const GRAVITY = 0.1;

let ground;
let sun;
let mario;
function setup() {
  createCanvas(800, 400);

  mario = new Mario(40, 40, 40);
  sun = new Sun(100, 100, 100);

  const groundHeight = 40;
  ground = new Ground(height - groundHeight, groundHeight);
}

function draw() {
  background(135, 206, 235);

  ground.draw();
  sun.draw();
  mario.draw();
  mario.update();
}
