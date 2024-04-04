let xBefore = 0;
let yBefore = 0;
let count = 0;

function drawShape(gl, startX, startY, endX, endY, shapeType) {
    var vertices = [];
    var fragColorList = [ [1.0, 0.0, 0.0, 1.0], 
                          [0.0, 1.0, 0.0, 1.0], 
                          [0.0, 0.0, 1.0, 1.0], 
                          [0.0, 1.0, 1.0, 1.0] ];

    if (shapeType === "line"){
        var verticesList = [ [startX / canvas.width * 2 - 1, 1 - startY / canvas.height * 2],
                         [endX / canvas.width * 2 - 1, 1 - endY / canvas.height * 2] ];
        primitiveType = gl.LINES;
    } else if (shapeType === "square"){
       var verticesList = [[startX / canvas.width * 2 - 1, 1 - startY / canvas.height * 2],
                            [startX / canvas.width * 2 - 1, 1 - endY / canvas.height * 2],
                            [endX / canvas.width * 2 - 1, 1 - startY / canvas.height * 2],
                            [endX / canvas.width * 2 - 1, 1 - endY / canvas.height * 2] ];
        primitiveType = gl.TRIANGLE_STRIP;
    } else if (shapeType === "rectangle"){
        var verticesList = [[startX / canvas.width * 2 - 1, 1 - startY / canvas.height * 2],
                            [startX / canvas.width * 2 - 1, 1 - endY / canvas.height * 2],
                            [endX / canvas.width * 2 - 1, 1 - startY / canvas.height * 2],
                            [endX / canvas.width * 2 - 1, 1 - endY / canvas.height * 2] ];
        primitiveType = gl.TRIANGLE_STRIP;
    } else {
        console.error("Invalid shape type");
        return;
    }
    
    vertices = verticesList.flat();
    fragColor = fragColorList.flat();
    console.log(vertices);
    var shaderProgram = setupShapeDrawing(gl, vertices, fragColor);
    gl.drawArrays(primitiveType, 0, vertices.length / 2);
    storeShape(verticesList, shapeType, fragColorList);
    console.log(shapes);
    displayShape(shapes);
    redrawShape(shapes.length - 1);
}

function redrawShape(shapeIndex, color) {
    gl.clear(gl.COLOR_BUFFER_BIT); // Clear the canvas

    shapes.forEach(function(shape, index) {
        var verticesList = shape.verticesList;
        var shapeType = shape.shapeType;
        var vertices = verticesList.flat();
        var fragColorList = shape.fragColorList;

        if (index === shapeIndex && color) {
            fragColorList = Array.from({ length: fragColorList.length }, () => [...color]);
        }

        var primitiveType;
        var primitiveType = shapeType === "line" ? gl.LINES : gl.TRIANGLE_STRIP;

        setupShapeDrawing(gl);

        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fragColorList.flat()), gl.STATIC_DRAW);

        var coord = gl.getAttribLocation(shaderProgram, "coordinates");
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coord);

        var vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(vertexColor, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexColor);

        gl.drawArrays(primitiveType, 0, vertices.length / 2);
    });

}

function redrawAllShapes() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    shapes.forEach((shape, index) => redrawShape(index));
}

window.onload = function() {
    const sliderX = document.getElementById('sliderX');
    sliderX.value = 0; 
    sliderX.min = -1;
    sliderX.max = 1;
    sliderX.step = 0.01;

    const sliderY = document.getElementById('sliderY');
    sliderY.value = 0;
    sliderY.min = -1;
    sliderY.max = 1;
    sliderY.step = 0.01;
};

function editShapes() {

    // Transformation X
    const sliderX = document.getElementById('sliderX');
    let xVal = parseFloat(sliderX.value);
    shapes[0].verticesList.forEach(vertex => {
        vertex[0] += xVal - xBefore;
    });
    redrawShape(0)
    xBefore = xVal;

    // Transformation Y
    const sliderY = document.getElementById('sliderY');
    let yVal = parseFloat(sliderY.value);
    shapes[0].verticesList.forEach(vertex => {
        vertex[1] -= yVal - yBefore;
    });
    redrawShape(0)
    yBefore = yVal;
}

function rotateShape() {
    const angle = parseInt(document.getElementById('sliderR').value)*-1; // Get the slider value

    // Rotate by the angle degrees
    const vertices = shapes[0].verticesList;

    // Calculate the center of the shape
    const center = [
        vertices.reduce((sum, vertex) => sum + vertex[0], 0) / vertices.length,
        vertices.reduce((sum, vertex) => sum + vertex[1], 0) / vertices.length
    ];

    // Convert angle to radians
    const angleRadians = (angle * Math.PI) / 180;
    console.log(angleRadians);

    // Rotate each vertex around the center
    const rotatedVertices = vertices.map(vertex => {
        const x = vertex[0];
        const y = vertex[1];

        // Translate the vertex relative to the center
        const translatedX = x - center[0];
        const translatedY = y - center[1];

        // Rotate the translated vertex
        const rotatedX = translatedX * Math.cos(angleRadians) - translatedY * Math.sin(angleRadians);
        const rotatedY = translatedX * Math.sin(angleRadians) + translatedY * Math.cos(angleRadians);

        // Translate the rotated vertex back
        const finalX = rotatedX + center[0];
        const finalY = rotatedY + center[1];

        return [finalX, finalY];
    });

    // Update vertices with rotated vertices
    temp=shapes[0].verticesList;
    shapes[0].verticesList = rotatedVertices;

    // Redraw the shape
    redrawShape(0);
    shapes[0].verticesList = temp;
}

