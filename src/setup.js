const lineButton = document.getElementById('line');
const squareButton = document.getElementById('square');
const rectangleButton = document.getElementById('rect');
const polygonButton = document.getElementById('poly');

const sliderX = document.getElementById('sliderX');


var isDrawing = false;
var startX, startY, endX, endY;
var shapes = [];
let currentShapeType = null;

// Define the canvas and WebGL context variables in the global scope
var canvas = document.getElementById("panel");
var gl = canvas.getContext("webgl");

if (!gl) {
    console.error("Unable to initialize WebGL. Your browser may not support it.");
}

var shaderProgram;

function setupShapeDrawing(gl) {
    // Vertices shader code
    var vertCode =
        'attribute vec2 coordinates;' +
        'attribute vec4 vertexColor;' +
        'varying vec4 fragColor;' +
        'void main(void) {' +
        ' gl_Position = vec4(coordinates, 0.0, 1.0);' +
        ' fragColor = vertexColor;' +
        '}';

    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    // Fragment shader code
    var fragCode =
        'precision mediump float;' +
        'varying vec4 fragColor;' +
        'void main(void) {' +
        ' gl_FragColor = fragColor;' +
        '}';

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    gl.viewport(0, 0, canvas.width, canvas.height);
    // gl.clearColor(0, 0, 0, 1.0);
}