function hexToRgb(hex) {
    hex = hex.replace('#', '');
    return [
        parseInt(hex.substring(0, 2), 16) / 255,
        parseInt(hex.substring(2, 4), 16) / 255,
        parseInt(hex.substring(4, 6), 16) / 255,
        1.0
    ];
}
function handleMouseDown(event){
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
}

function handleMouseMove(event){
    if (!isDrawing) return;
    endX = event.offsetX;
    endY = event.offsetY;
}

function handleMouseUp(event, shapeType){
    if (!isDrawing) return;
    isDrawing = false;
    if (currentShapeType === "line") {
        drawShape(gl, startX, startY, endX, endY, "line");
    } else if (currentShapeType === "square") {
        drawShape(gl, startX, startY, 80, 80, "square");
    } else if (currentShapeType === "rectangle") {
        drawShape(gl, startX, startY, endX, endY, "rectangle");
    }
    return shapes;
}
function storeShape(verticesList, shapeType, fragColorList) {
    var shape = {
        verticesList: verticesList,
        shapeType: shapeType,
        fragColorList: fragColorList
    };
    shapes.push(shape);
    return shapes;
}

function displayShape(arrayShape) {
    var shapeList = document.getElementById("container");

    shapeList.innerHTML = '';

    arrayShape.forEach((shape, shapeIndex) => {
        const shapeDiv = document.createElement('div');
        shapeDiv.className = 'shape-div';
        shapeList.appendChild(shapeDiv);

        const shapeButton = document.createElement('button');
        shapeButton.textContent = `Shape ${shapeIndex + 1}`;
        shapeButton.className = 'btn-shape';
        shapeDiv.appendChild(shapeButton);

        shape.verticesList.forEach((vertex, vertexIndex) => {
            const vertexDiv = document.createElement('div');
            vertexDiv.className = 'vertex-div';
            shapeDiv.appendChild(vertexDiv);
        
            const vertexCheckbox = document.createElement('input');
            vertexCheckbox.type = 'checkbox';
            vertexCheckbox.id = `vertex-${shapeIndex}-${vertexIndex}`;
            vertexCheckbox.className = 'btn-vertex';
            vertexDiv.appendChild(vertexCheckbox);
        
            const vertexLabel = document.createElement('label');
            vertexLabel.htmlFor = vertexCheckbox.id;
            vertexLabel.textContent = `Vertex ${vertexIndex + 1}`;
            vertexDiv.appendChild(vertexLabel);

            vertexCheckbox.addEventListener('change', () => {
                console.log(`Shape ${shapeIndex + 1}-Vertex ${vertexIndex + 1} ${vertexCheckbox.checked ? 'selected' : 'deselected'}`);
                console.log(`Coordinate: (${vertex[0]}, ${vertex[1]})`);
                console.log(`Color: (${shape.fragColorList[vertexIndex][0]}, ${shape.fragColorList[vertexIndex][1]}, ${shape.fragColorList[vertexIndex][2]}, ${shape.fragColorList[vertexIndex][3]})`);
            });
        });

        shapeButton.addEventListener('click', () => {
            console.log(`Shape ${shapeIndex + 1} clicked`);
            shape.verticesList.forEach((_, vertexIndex) => {
                console.log(`Shape ${shapeIndex + 1}-Vertex ${vertexIndex + 1} clicked`);
                console.log(`Coordinate: (${shape.verticesList[vertexIndex][0]}, ${shape.verticesList[vertexIndex][1]})`);
            });
        });
    });
}