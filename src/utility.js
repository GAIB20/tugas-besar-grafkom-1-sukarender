let selectedShapeIndex = null;
let selectedVertexIndex = null;
let selectedVertices = [];

const colorPicker = document.getElementById('color-picker');

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
    if (count==0){
        isDrawing = true;
        startX = event.offsetX;
        startY = event.offsetY;
        endX = event.offsetX;
        endY = event.offsetY;
        if (currentShapeType === "line") {
            drawShape(gl, startX, startY, endX, endY, "line");
            console.log("line");
        }
        else if (currentShapeType === "square") {
            drawShape(gl, startX, startY, endX, endY, "square");
            console.log("square");
        } 

        else if (currentShapeType === "rectangle") {
            drawShape(gl, startX, startY, endX, endY, "rectangle");
            console.log("rectangle");
        }
        count++;
    }
}

function handleMouseMove(event){
    if (!isDrawing) return;
    endX = event.offsetX;
    endY = event.offsetY;
    n=shapes.length-1;
    temp=shapes[n];
    if (currentShapeType === "line") {
        temp.verticesList[1][0]=endX / canvas.width * 2 - 1;
        temp.verticesList[1][1]=1 - endY / canvas.height * 2;
        shapes[n]=temp;
        redrawShape(n);
        return;
    }

    else if (currentShapeType === "square"){
        
        let sqlen = Math.abs(endX - startX);
        let newX, newY
        
        if(endX < startX){
            if(endY < startY){
                newX = startX - sqlen;
                newY = startY - sqlen;
            }
            else {
                newX = startX - sqlen;
                newY = startY + sqlen;
            }
        }
        else{
            if(endY < startY){
                newX = startX + sqlen;
                newY = startY - sqlen;
            }
            else{
                newX = startX + sqlen;
                newY = startY + sqlen;
            }
        }

        temp.verticesList[3][0]=newX / canvas.width * 2 - 1;
        temp.verticesList[3][1]=1 - newY / canvas.height * 2;
        temp.verticesList[1][0]=newX / canvas.width * 2 - 1;
        temp.verticesList[2][1]=1 - newY / canvas.height * 2;

        shapes[n]=temp;
        redrawShape(n);
        return;
    }

    else if (currentShapeType === "rectangle"){
        temp.verticesList[3][0]=endX / canvas.width * 2 - 1;
        temp.verticesList[3][1]=1 - endY / canvas.height * 2;
        temp.verticesList[1][0]=endX / canvas.width * 2 - 1;
        temp.verticesList[2][1]=1 - endY / canvas.height * 2;
        shapes[n]=temp;
        redrawShape(n);
        return;
    
    }
}

function handleMouseUp(event, shapeType){
    if (!isDrawing) return;
    isDrawing = false;
    checkShape();
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

function checkShape(){
    // check all the shapes in the shapes array and pop if all vertices are same
    for (let i=0; i<shapes.length; i++){
        let shape = shapes[i];
        let vertices = shape.verticesList;
        if (vertices[0][0] == vertices[1][0] && vertices[0][1] == vertices[1][1]){
            delete shapes[i];
        }
    }
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
            // check if vertex is in selectedVertices
            if (selectedVertices[shapeIndex] && selectedVertices[shapeIndex].includes(vertexIndex)) {
                vertexCheckbox.checked = true;
            }
            vertexDiv.appendChild(vertexCheckbox);
        
            const vertexLabel = document.createElement('label');
            vertexLabel.htmlFor = vertexCheckbox.id;
            vertexLabel.textContent = `Vertex ${vertexIndex + 1}`;
            vertexDiv.appendChild(vertexLabel);

            // vertexCheckbox.addEventListener('change', () => {
            //     if (vertexCheckbox.checked) {
            //         selectedVertices.push({ shapeIndex, vertexIndex });
            //         console.log(`Shape ${shapeIndex + 1}-Vertex ${vertexIndex + 1} selected`);
            //     } else {
            //         selectedVertices = selectedVertices.filter(vertex => vertex.shapeIndex !== shapeIndex || vertex.vertexIndex !== vertexIndex);
            //     }
            //     console.log(selectedVertices);
            // });
            vertexCheckbox.addEventListener('change', () => {
                if (vertexCheckbox.checked) {
                    if (!selectedVertices[shapeIndex]) {
                        selectedVertices[shapeIndex] = [];
                    }
                    selectedVertices[shapeIndex].push(vertexIndex);
                } else {
                    if (selectedVertices[shapeIndex]) {
                        selectedVertices[shapeIndex] = selectedVertices[shapeIndex].filter(index => index !== vertexIndex);
                        if (selectedVertices[shapeIndex].length === 0) {
                            delete selectedVertices[shapeIndex];
                        }
                    }
                }
                console.log(selectedVertices);
                
            });

        });

        shapeButton.addEventListener('click', () => {
            // check if shape index is in vertices list
            console.log(`Shape ${shapeIndex + 1} clicked`);
            if (selectedVertices[shapeIndex]) {
                selectedVertices[shapeIndex].forEach(vertexIndex => {
                    const vertexCheckbox = document.getElementById(`vertex-${shapeIndex}-${vertexIndex}`);
                    vertexCheckbox.checked = false;
                });
                delete selectedVertices[shapeIndex];
            }
            else {
                shape.verticesList.forEach((_, vertexIndex) => {
                    console.log(`Shape ${shapeIndex + 1}-Vertex ${vertexIndex + 1} clicked`);
                    console.log(`Coordinate: (${shape.verticesList[vertexIndex][0]}, ${shape.verticesList[vertexIndex][1]})`);
                    const vertexCheckbox = document.getElementById(`vertex-${shapeIndex}-${vertexIndex}`);
                    vertexCheckbox.checked = true;
                    if (!selectedVertices[shapeIndex]) {
                        selectedVertices[shapeIndex] = [];
                    }
                    selectedVertices[shapeIndex].push(vertexIndex);
                });
            }
            console.log(selectedVertices);
        });
    });
}

colorPicker.addEventListener('input', function() {
    const pickedColor = colorPicker.value; 
    const rgbaColor = hexToRgb(pickedColor);

    selectedVertices.forEach((vertexIndices, shapeIndex) => {
        if (vertexIndices) {
            console.log(`Shape ${shapeIndex + 1} length of checked vertices is ${vertexIndices.length}`);
            vertexIndices.forEach(vertexIndex => {
                shapes[shapeIndex].fragColorList[vertexIndex] = rgbaColor;
            });
        }
    });


    redrawAllShapes();
});
function saveJson(){
    var json = JSON.stringify(shapes);
    var blob = new Blob([json], {type: "application/json"});
    var url  = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.download    = "shapes.json";
    a.href        = url;
    a.click();
}

function loadJson(){
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => { 
        var file = e.target.files[0]; 
        var reader = new FileReader();
        reader.readAsText(file,'UTF-8');
        reader.onload = readerEvent => {
            var content = readerEvent.target.result;
            shapes = JSON.parse(content);
            redrawAllShapes();
        }
    }
    input.click();
}
