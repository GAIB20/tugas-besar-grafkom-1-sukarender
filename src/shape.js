class Line {
    constructor(startX, startY, endX, endY, color) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color = color;
    }

    draw(gl) {
        drawLine(gl, this.startX, this.startY, this.endX, this.endY, this.color);
    }
}

class Square {
    constructor(centerX, centerY, size, color) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.size = size;
        this.color = color;
    }

    draw(gl) {
        drawSquare(gl, this.centerX, this.centerY, this.size, this.color);
    }
}

class Rectangle {
    constructor(centerX, centerY, width, height, color) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(gl) {
        drawRectangle(gl, this.centerX, this.centerY, this.width, this.height, this.color);
    }
}

class Polygon {
    constructor(vertices, color) {
        this.vertices = vertices;
        this.color = color;
    }

    draw(gl) {
        drawPolygon(gl, this.vertices, this.color);
    }
}