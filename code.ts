figma.showUI(__html__, { width: 240, height: 120 });
figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-shapes') {
    const numberOfShapes = msg.count;
    const nodes: SceneNode[] = [];
    for (let i = 0; i < numberOfShapes; i++) {
      const shape = figma.createRectangle();
      shape.x = i * (shape.width + 200);
      shape.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(shape);
      nodes.push(shape);
    }
    for (let i = 0; i < numberOfShapes - 1; i++) {
      const connector = figma.createLine();
      connector.strokeWeight = 8;
      connector.x = nodes[i].x + nodes[i].width;
      connector.y = nodes[i].y + nodes[i].height / 2;
      connector.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
      connector.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
      connector.constraints = {
        horizontal: 'SCALE',
        vertical: 'CENTER',
      };
      connector.resize(200, 0);
      figma.currentPage.appendChild(connector);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  figma.closePlugin();
};
