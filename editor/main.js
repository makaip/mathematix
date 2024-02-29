const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let gridSize = 20;
let zoomFactor = 1;
let scale = 1;
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let offsetX = 0; // canvas offsets
let offsetY = 0; 

let isDragging = false;
let startX, startY, endX, endY;
// Node: StartX/Y are defined ON MOUSE DOWN, endX/Y are defined ON MOUSE MOVE
// used to compute change of canvas offset + alot of other stuff

let isMenuVisible = false;
let menuX = 0; // position of menu
let menuY = 0;

const times = [];
let fps;

let nodeSelected, nodeOver = null;
let isDraggingLine = false;
let lineStartX, lineStartY, lineEndX, lineEndY; // Line dragging

const menuItems = ['Variable', 'Arithmetic', 'Trigonometry', 'Unary Operators', 'Input', 'Output'];
const functionMenuItems = [
    [["Arithmetic"], ["Add", "Subtract", "Multiply", "Divide", "Exponent", "Modulus", "Radical", "Logarithm"]],
    [["Unary Operators"], ["Absolute Value", "Ceiling", "Floor"]], 
    // [["Unary Operators"], ["Absolute Value", "Factorial", "Ceiling", "Floor"]], (Copy of above line with factorial)
    //["Linear Algebra", ["Cross Product", "Magnitude", "Dot Product", "Matrix Multiply", "Matix Transpose", "Matrix Determinant"]], 
    //["Calculus", ["Limit", "Integral", "Derivative", "Gradient", "Summation", "Product"]],
    // [["Boolean Logic"], ["And", "Or", "Exclusive Or", "Logical Implies", "Negotiation", "Less Than", "Greater Than", "Equal"]],
    //["Set", ["Union", "Intersection", "Set Difference", "Subset", "Superset", "Proper Superset", "Element Of"]],
    [["Trigonometry"], ["Sine", "Cosine", "Tangent", "Cosecant", "Secant", "Cotangent", "Inverse Sine", "Inverse Cosine", "Inverse Tangent", "Inverse Cosecant", "Inverse Secant", "Inverse Cotangent"]]
    //["Statistics", ["Mean", "Median", "Minimum", "Maximum", "Quartile", "Quantile", "Standard Deviation", "Variance", "Mean Absolute Deviation", "Correlation", "Spearman", "Count", "Total"]],
    //["List Operations", ["Join", "Sort", "Shuffle", "Unique", "For"]],
    //["Visualizations", ["Histogram", "Dotplot", "Boxplot"]],
    //["Distributions", ["Normal", "Students", "Poisson", "Binomial", "Uniform", "PDF", "CDF"]],
    //["Number Theory", ["Least Common Multiple", "Greatest Common Denominator", "Round", "Sign", "nPr", "nCr"]]
];

const nodeBlocks = []; 
let selectedNodeBlock = null; // i have no idea what this does but if i touch it it breaks instantly
let isBoxSelecting = false; 
let isDraggingNodeBlock = false;

let resultOfOutputNoduleClicked = []; // Array to store the result of where the user is dragging from
let resultOfMouseOverNodule = []; // Array to store the result of where the user is dragging to (what nodule the user is hovering over)

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const selectedBlocks = []; // all the node blocks that are selected (still only has one at a time :[ )
let boxSelectStartX, boxSelectStartY; // Box selection start

ctx.imageSmoothingEnabled = false;

drawGrid();

// The difference between selectedNodeBlock and selectedBlocks is unknown. However, it would be good to find out because I frogot
// I think one of them switches between "[], null, undefined, and -4" and each case handles different oeprations of the block