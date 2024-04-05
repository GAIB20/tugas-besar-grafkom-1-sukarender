let xBefore = 0;
let yBefore = 0;
let count = 0;
let scaleBefore = 1;

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

function drawPolygon(){
    var verticesCount = vertices_polygon.length;
    var fragColorList = [];

    for (var i = 0; i < verticesCount; i++) {
        fragColorList.push([1.0, 0.0, 0.0, 1.0]); 
    }
    if (vertices_polygon.length < 3) {
        console.error("Not enough vertices to form a polygon");
        return;
    }
    shapeType = "polygon";
    verticesList = vertices_polygon;
    primitiveType = gl.TRIANGLE_FAN;
    console.log(verticesList);
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
        if (shapeType === "line") {
            primitiveType = gl.LINES;
        } else if (shapeType === "square" || shapeType === "rectangle") {
            primitiveType = gl.TRIANGLE_STRIP;
        } else if (shapeType === "polygon") {
            primitiveType = gl.TRIANGLE_FAN;
        } else {
            console.error("Invalid shape type");
            return;
        }

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
    const sliderY = document.getElementById('sliderY');

    let xVal = parseFloat(sliderX.value);
    let yVal = parseFloat(sliderY.value);


    // // check how many of the selected shapes are empty
    // let count = 0;
    // selectedVertices.forEach(( listIndex, indexShape ) => {
    //     if(listIndex.length < 1 ){
    //         count++;
    //     }
    // });

    selectedVertices.forEach(( listIndex, indexShape ) => {
        if(listIndex.length > 1 ){
            shapes[indexShape].verticesList.forEach(vertex => {
                vertex[0] += xVal - xBefore
                vertex[1] -= yVal - yBefore
            })
            redrawShape(indexShape)
        }
        else if(listIndex.length == 1){
            // check the shape type
            if(shapes[indexShape].shapeType == "line"){
                if(listIndex[0] == 0){
                    shapes[indexShape].verticesList[0][0] += xVal - xBefore
                    shapes[indexShape].verticesList[0][1] -= yVal - yBefore
                }
                else if(listIndex[0] == 1){
                    shapes[indexShape].verticesList[1][0] += xVal - xBefore
                    shapes[indexShape].verticesList[1][1] -= yVal - yBefore
                }
            }
            // check if the shape is a square
            if(shapes[indexShape].shapeType == "square"){
                if(listIndex[0] == 0){
                    shapes[indexShape].verticesList[0][0] += xVal - xBefore
                    shapes[indexShape].verticesList[0][1] -= xVal - xBefore
                    shapes[indexShape].verticesList[1][1] = shapes[indexShape].verticesList[0][1]
                    shapes[indexShape].verticesList[2][0] = shapes[indexShape].verticesList[0][0]
                    shapes[indexShape].verticesList[3][1] = shapes[indexShape].verticesList[2][1]
                }
                else if(listIndex[0] == 1){
                    shapes[indexShape].verticesList[1][0] += xVal - xBefore
                    shapes[indexShape].verticesList[1][1] += xVal - xBefore
                    shapes[indexShape].verticesList[0][1] = shapes[indexShape].verticesList[1][1]
                    shapes[indexShape].verticesList[3][0] = shapes[indexShape].verticesList[1][0]
                    shapes[indexShape].verticesList[2][1] = shapes[indexShape].verticesList[3][1]
                }
                else if(listIndex[0] == 2){
                    shapes[indexShape].verticesList[2][0] -= xVal - xBefore
                    shapes[indexShape].verticesList[2][1] -= xVal - xBefore
                    shapes[indexShape].verticesList[0][0] = shapes[indexShape].verticesList[2][0]
                    shapes[indexShape].verticesList[3][1] = shapes[indexShape].verticesList[2][1]
                    shapes[indexShape].verticesList[1][0] = shapes[indexShape].verticesList[3][0]
                    shapes[indexShape].verticesList[1][1] = shapes[indexShape].verticesList[0][1]
                }
                else if(listIndex[0] == 3){
                    shapes[indexShape].verticesList[3][0] += xVal - xBefore
                    shapes[indexShape].verticesList[3][1] -= xVal - xBefore
                    shapes[indexShape].verticesList[1][0] = shapes[indexShape].verticesList[3][0]
                    shapes[indexShape].verticesList[2][1] = shapes[indexShape].verticesList[3][1]
                    shapes[indexShape].verticesList
                }
            }
            // check if the shape is a rectangle
            if(shapes[indexShape].shapeType == "rectangle"){
                if(listIndex[0] == 0){
                    shapes[indexShape].verticesList[0][0] += xVal - xBefore
                    shapes[indexShape].verticesList[0][1] -= yVal - yBefore
                    shapes[indexShape].verticesList[1][1] = shapes[indexShape].verticesList[0][1]
                    shapes[indexShape].verticesList[2][0] = shapes[indexShape].verticesList[0][0]
                    
                }
                else if(listIndex[0] == 1){
                    shapes[indexShape].verticesList[1][0] += xVal - xBefore
                    shapes[indexShape].verticesList[1][1] -= yVal - yBefore
                    shapes[indexShape].verticesList[0][1] = shapes[indexShape].verticesList[1][1]
                    shapes[indexShape].verticesList[3][0] = shapes[indexShape].verticesList[1][0]
                }
                else if(listIndex[0] == 2){
                    shapes[indexShape].verticesList[2][0] += xVal - xBefore
                    shapes[indexShape].verticesList[2][1] -= yVal - yBefore
                    shapes[indexShape].verticesList[0][0] = shapes[indexShape].verticesList[2][0]
                    shapes[indexShape].verticesList[3][1] = shapes[indexShape].verticesList[2][1]
                }
                else if(listIndex[0] == 3){
                    shapes[indexShape].verticesList[3][0] += xVal - xBefore
                    shapes[indexShape].verticesList[3][1] -= yVal - yBefore
                    shapes[indexShape].verticesList[1][0] = shapes[indexShape].verticesList[3][0]
                    shapes[indexShape].verticesList[2][1] = shapes[indexShape].verticesList[3][1]
                }
            }
        redrawShape(indexShape)
    }
    });
    xBefore = xVal;
    yBefore = yVal;
}

function rotateShape() {
    const angle = parseInt(document.getElementById('sliderR').value) * -1; // Get the slider value

    // Iterate over each shape
    selectedVertices.forEach((shape, shapeIndex) => {
        // Get the vertices of the shape
        const vertices = shapes[shapeIndex].verticesList;
        console.log(vertices);
        // Calculate the center of the shape
        const center = [
            vertices.reduce((sum, vertex) => sum + vertex[0], 0) / vertices.length,
            vertices.reduce((sum, vertex) => sum + vertex[1], 0) / vertices.length
        ];

        // Convert angle to radians
        const angleRadians = (angle * Math.PI) / 180;

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
        temp = shapes[shapeIndex].verticesList;
        shapes[shapeIndex].verticesList = rotatedVertices;
        console.log(shapeIndex);

        // Redraw the shape
        redrawShape(shapeIndex);

        // Restore the original vertices list
        shapes[shapeIndex].verticesList = temp;
    });
}

function dilatationShape(){

    const sliderD = document.getElementById('sliderD');
    let dVal = parseFloat(sliderD.value);
    // console.log(dVal)

    selectedVertices.forEach(( listIndex, indexShape) => {
        
        const vertices = shapes[indexShape].verticesList;
        const center = [
            vertices.reduce((sum, vertex) => sum + vertex[0], 0) / vertices.length,
            vertices.reduce((sum, vertex) => sum + vertex[1], 0) / vertices.length
        ];

        shapes[indexShape].verticesList.forEach(vertex => {
            vertex[0] = center[0] + ((vertex[0] - center[0]) * dVal) / scaleBefore;
            vertex[1] = center[1] + ((vertex[1] - center[1]) * dVal) / scaleBefore;
        });
        redrawShape(indexShape);
    })
    scaleBefore = dVal;
}
