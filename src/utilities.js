// @ts-nocheck:

const getProjection = (p, screenZ = WORLD_ITEMS.screenZ) => {
  const projectedX = screenZ * p.x / p.z;
  const projectedY = screenZ * p.y / p.z;

  return createVector(projectedX, projectedY);
};

const showDetails = () => {
  push();
  translate(-width / 2, -height / 2);
  textSize(DETAILS.textSize);
  const formatted = `mode: ${mode}\ncurrent: ${selectedIdx}`;
  text(formatted, width - DETAILS.rightAlign, DETAILS.topAlign);
  pop();
}

const drawShapes = (shapes) => {
  shapes.forEach((shape) => {

    const faces = shape.getWorldFacesPoint();

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
