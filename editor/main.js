const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let gridSize = 20;
let zoomFactor = 1;
let scale = 1;
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let offsetX = 0;
let offsetY = 0;

let isDragging = false;
let startX, startY, endX, endY;

let isMenuVisible = false;
let menuX = 0;
let menuY = 0;

const times = [];
let fps;

let nodeSelected, nodeOver = null;
let isDraggingLine = false;
let lineStartX, lineStartY, lineEndX, lineEndY;

const menuItems = ['Variable', 'Arithmetic', 'Trigonometry', 'Unary Operators', 'Input', 'Output'];
const functionMenuItems = [
    [["Arithmetic"], ["Add", "Subtract", "Multiply", "Divide", "Exponent", "Modulus", "Radical", "Logarithm"]],

    [["Unary Operators"], ["Absolute Value", "Factorial", "Ceiling", "Floor"]], 

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
let selectedNodeBlock = null;
let isBoxSelecting = false;
let isDraggingNodeBlock = false;

let resultOfOutputNoduleClicked = [];
let resultOfMouseOverNodule = [];

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const selectedBlocks = [];
let boxSelectStartX, boxSelectStartY;

ctx.imageSmoothingEnabled = false;

drawGrid();

