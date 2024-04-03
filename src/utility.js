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
        let sigmaX = endX - startX;
        let sigmaY = endY - startY;
        
        if(Math.abs(sigmaX) > Math.abs(sigmaY)){
            if(sigmaX > 0){
                if(sigmaY > 0){
                    endY = endX;
                }
                else{
                    endY = endX * -1;
                }
            }
            else{
                if(sigmaY > 0){
                    endY = endX * -1;
                }
                else{
                    endY = endX;
                }
            }
        }
        
        else{
            if(sigmaX > 0){
                if(sigmaY > 0){
                    endX = endY;
                }
                else{
                    endX = endY * -1;
                }
            }
            else{
                if(sigmaY > 0){
                    endX = endY * -1;
                }
                else{
                    endX = endY;
                }
            }
        }
        
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
    temp.verticesList[1][0]=endX / canvas.width * 2 - 1;
    temp.verticesList[1][1]=1 - endY / canvas.height * 2;
    shapes[n]=temp;
    redrawShape(n);
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
