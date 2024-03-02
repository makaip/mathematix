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
// used to compute change of canvas offset + a lot of other stuff

let isMenuVisible = false;
let menuX = 0; // position of menu
let menuY = 0;

const times = [];
let fps;

let isDraggingLine = false;
let lineStartX, lineStartY, lineEndX, lineEndY; // Line dragging

const menuItems = ['Variable', 'Arithmetic', 'Trigonometry', 'Unary Operators', 'Input', 'Output'];

const nodeBlocks = []; 
let selectedNodeBlock = null;

let resultOfOutputNoduleClicked = null;  // Array to store the result of where the user is dragging from
let resultOfMouseOverNodule = null;  // Array to store the result of where the user is dragging to (what nodule the user is hovering over)

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const selectedBlocks = [];  // all the node blocks that are selected (still only has one at a time :[ )

ctx.imageSmoothingEnabled = false;

drawGrid();

// The difference between selectedNodeBlock and selectedBlocks is unknown. However, it would be good to find out because I frogot
// I think one of them switches between "[], null, undefined, and -4" and each case handles different oeprations of the block