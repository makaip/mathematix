const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas resolution to match its CSS size
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let gridSize = 20; // Initial size of each grid cell
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let offsetX = 0;
let offsetY = 0;

let isDragging = false; // Flag to track if the user is dragging
let startX, startY, endX, endY;

let isMenuVisible = false; // Flag to track if the menu is visible
let menuX = 0;
let menuY = 0;

const menuItems = ['Function', 'Input', 'Output']; // Replace with your menu items

const nodeBlocks = []; // Store information about node blocks
let selectedNodeBlock = null; // Variable to keep track of the selected node block
let isBoxSelecting = false; // Flag to track box selection
let isDraggingNodeBlock = false; // Flag to track node block dragging

// Set the canvas resolution to match its CSS size
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Set the canvas rendering mode to "crisp edges" to make it look sharper
ctx.imageSmoothingEnabled = false;

drawGrid();