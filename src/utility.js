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
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
    endX = event.offsetX+1;
    endY = event.offsetY+1;
    if (currentShapeType === "line") {
        drawShape(gl, startX, startY, endX, endY, "line");
    } 
    else if (currentShapeType === "square") {
        // let sigmaX = endX - startX;
        // let sigmaY = endY - startY;
        
        // if(Math.abs(sigmaX) > Math.abs(sigmaY)){
        //     if(sigmaX > 0){
        //         if(sigmaY > 0){
        //             endY = endX;
        //         }
        //         else{
        //             endY = endX * -1;
        //         }
        //     }
        //     else{
        //         if(sigmaY > 0){
        //             endY = endX * -1;
        //         }
        //         else{
        //             endY = endX;
        //         }
        //     }
        // }
        
        // else{
        //     if(sigmaX > 0){
        //         if(sigmaY > 0){
        //             endX = endY;
        //         }
        //         else{
        //             endX = endY * -1;
        //         }
        //     }
        //     else{
        //         if(sigmaY > 0){
        //             endX = endY * -1;
        //         }
        //         else{
        //             endX = endY;
        //         }
        //     }
        // }
        
        drawShape(gl, startX, startY, endX, endY, "square");
    } 

    else if (currentShapeType === "rectangle") {
        drawShape(gl, startX, startY, endX, endY, "rectangle");
    }
}

function handleMouseMove(event){
    if (!isDrawing) return;
    endX = event.offsetX;
    endY = event.offsetY;
    n=shapes.length-1;
    temp=shapes[n];
    // change the endx and endy of the last shape in the shapes array
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
                if (vertexCheckbox.checked) {
                    selectedVertices.push({ shapeIndex, vertexIndex });
                    console.log(`Shape ${shapeIndex + 1}-Vertex ${vertexIndex + 1} selected`);
                } else {
                    selectedVertices = selectedVertices.filter(vertex => vertex.shapeIndex !== shapeIndex || vertex.vertexIndex !== vertexIndex);
                }
                console.log(selectedVertices);
            });
        });

        shapeButton.addEventListener('click', () => {
            console.log(`Shape ${shapeIndex + 1} clicked`);
            shape.verticesList.forEach((_, vertexIndex) => {
                console.log(`Shape ${shapeIndex + 1}-Vertex ${vertexIndex + 1} clicked`);
                console.log(`Coordinate: (${shape.verticesList[vertexIndex][0]}, ${shape.verticesList[vertexIndex][1]})`);
                const vertexCheckbox = document.getElementById(`vertex-${shapeIndex}-${vertexIndex}`);
                vertexCheckbox.checked = true;
            });
        });
    });
}

colorPicker.addEventListener('input', function() {
    const pickedColor = colorPicker.value; 
    const rgbaColor = hexToRgb(pickedColor);

    selectedVertices.forEach(({ shapeIndex, vertexIndex }) => {
        shapes[shapeIndex].fragColorList[vertexIndex] = rgbaColor;
    });

    redrawAllShapes();
});

