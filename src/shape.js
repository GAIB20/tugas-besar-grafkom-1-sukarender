lineButton.addEventListener('click', function() {
    canvas.removeEventListener('mousedown', handleMouseDown);
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mouseup', handleMouseUp);
    currentShapeType = "line";
    isDrawing = false;
    canvas.addEventListener('mousedown', (event) => handleMouseDown(event, "line"));
    canvas.addEventListener('mousemove', (event) => handleMouseMove(event));
    canvas.addEventListener('mouseup', (event) => handleMouseUp(event, "line"));
});

squareButton.addEventListener('click', function() {
    canvas.removeEventListener('mousedown', handleMouseDown);
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mouseup', handleMouseUp);
    currentShapeType = "square";
    isDrawing = false;
    canvas.addEventListener('mousedown', (event) => handleMouseDown(event, "square"));
    canvas.addEventListener('mousemove', (event) => handleMouseMove(event));
    canvas.addEventListener('mouseup', (event) => handleMouseUp(event, "square"));
});

rectangleButton.addEventListener('click', function() {
    canvas.removeEventListener('mousedown', handleMouseDown);
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mouseup', handleMouseUp);
    currentShapeType = "rectangle";
    isDrawing = false;
    canvas.addEventListener('mousedown', (event) => handleMouseDown(event, "square"));
    canvas.addEventListener('mousemove', (event) => handleMouseMove(event));
    canvas.addEventListener('mouseup', (event) => handleMouseUp(event, "square"));
});
