// Define rcanvas and context
const rcanvas = document.getElementById('graphCanvas');
const rctx = rcanvas.getContext('2d');

// Set the rcanvas resolution to match its CSS size
rcanvas.width = rcanvas.clientWidth;
rcanvas.height = rcanvas.clientHeight;

// Initial grid size and rcanvas dimensions
let rgridSize = 20;
let rcanvasWidth = rcanvas.width;
let rcanvasHeight = rcanvas.height;

// Offset values for panning
let roffsetX = 0;
let roffsetY = 0;

let functionsToPlot = [];

// Set the rcanvas rendering mode to "crisp edges" to make it look sharper
rctx.imageSmoothingEnabled = false;

function getRealX(x) {
    return (x - rcanvasWidth / 2 + roffsetX) * 0.025;
}

function evaluateFunction(funcString, x) {
    console.log(funcString);
    return nerdamer(funcString.replace("x", x));
}

// Push mathematical functions as strings to the functionsToPlot array
//functionsToPlot.push("(x ** 3)");
//functionsToPlot.push("Math.sin(x)");
//functionsToPlot.push("x - 1")
//functionsToPlot.push("Math.sin(x)")
//functionsToPlot.push("(x ** 4) - 2 * (x ** 2) - 5")
//functionsToPlot.push("x ** 2")

// Initial drawing of the grid
drawGridRenderer();



