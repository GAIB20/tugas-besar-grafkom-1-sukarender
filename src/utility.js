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
