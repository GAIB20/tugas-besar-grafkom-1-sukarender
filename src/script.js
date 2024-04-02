let gl; // Global variable to store the WebGL rendering context

function initWebGL(canvas) {
    gl = null;

    try {

        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {}


    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
    }

    return gl;
}

function start() {
    const canvas = document.getElementById("panel");
    gl = initWebGL(canvas); 

    if (!gl) {
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);
}

window.onload = start;
