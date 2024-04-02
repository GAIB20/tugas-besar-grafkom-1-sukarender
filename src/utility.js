function drawLine(gl, startX, startY, endX, endY, color) {
    const vertices = new Float32Array([
        startX, startY,
        endX, endY
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const vertexShaderCode = `
        attribute vec2 coordinates;
        void main(void) {
            gl_Position = vec4(coordinates, 0.0, 1.0);
        }
    `;

    const fragmentShaderCode = `
        precision mediump float;
        uniform vec4 u_color;
        void main(void) {
            gl_FragColor = u_color;
        }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    const coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    const colorLocation = gl.getUniformLocation(shaderProgram, "u_color");
    gl.uniform4fv(colorLocation, color);

    gl.drawArrays(gl.LINES, 0, 2);
}

function drawSquare(gl, centerX, centerY, size, color) {
    const halfSize = size / 2;
    const vertices = new Float32Array([
        centerX - halfSize, centerY + halfSize,
        centerX + halfSize, centerY + halfSize,
        centerX - halfSize, centerY - halfSize,
        centerX + halfSize, centerY - halfSize
    ]);

}

function drawRectangle(gl, centerX, centerY, width, height, color) {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const vertices = new Float32Array([
        centerX - halfWidth, centerY + halfHeight,
        centerX + halfWidth, centerY + halfHeight,
        centerX - halfWidth, centerY - halfHeight,
        centerX + halfWidth, centerY - halfHeight
    ]);

}

function drawPolygon(gl, vertices, color) {
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

}

function translate(gl, translationX, translationY) {
    // Implementasi translasi
}

function rotate(gl, angle) {
    // Implementasi rotasi
}

function scale(gl, scaleX, scaleY) {
    // Implementasi dilatasi
}