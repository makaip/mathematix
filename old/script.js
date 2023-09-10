const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

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

// Set the canvas resolution to match its CSS size
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Set the canvas rendering mode to "crisp edges" to make it look sharper
ctx.imageSmoothingEnabled = false;

function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
}

function drawGrid() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Set background color to dark gray
    ctx.fillStyle = '#1d1d1d'; // Dark gray
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Set dot color to #282828
    ctx.fillStyle = '#282828'; // Darker gray

    // Calculate the number of dots to draw based on the canvas size and gridSize
    const numHorizontalDots = Math.ceil(canvasWidth / gridSize);
    const numVerticalDots = Math.ceil(canvasHeight / gridSize);

    // Draw dots at grid intersections
    for (let y = offsetY % gridSize; y < canvasHeight; y += gridSize) {
        for (let x = offsetX % gridSize; x < canvasWidth; x += gridSize) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Draw the selection box
    if (isDragging) {
        ctx.strokeStyle = 'white'; // Box border color
        ctx.lineWidth = 2;

        // Set the fill color with transparency (RGBA)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; // Very transparent white
        ctx.beginPath();
        ctx.rect(startX, startY, endX - startX, endY - startY);
        ctx.fill();

        // Draw the box border
        ctx.stroke();
    }

    // Draw the menu with rounded corners
    if (isMenuVisible) {
        ctx.fillStyle = '#181818'; // Menu background color
        const menuWidth = 150;
        const menuHeight = menuItems.length * 30 + 10;
        const cornerRadius = 5; // Adjust as needed
        drawRoundedRect(ctx, menuX, menuY, menuWidth, menuHeight, cornerRadius);
        ctx.fill();

        ctx.fillStyle = 'white'; // Text color
        ctx.font = '16px Poppins';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        menuItems.forEach((item, index) => {
            ctx.fillText(item, menuX + 10, menuY + 30 * (index + 1));
        });
    }
}

function handleMouseWheel(event) {
    const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9; // Zoom in or out based on scroll direction
    gridSize *= zoomFactor;

    // Limit the minimum and maximum grid size
    if (gridSize < 5) {
        gridSize = 5; // Minimum grid size
    } else if (gridSize > 100) {
        gridSize = 100; // Maximum grid size
    }

    drawGrid();
}

function handleMiddleMouseDrag(event) {
    if (event.buttons === 4) {
        // Middle mouse button (button code 4)
        offsetX += event.movementX;
        offsetY += event.movementY;
        drawGrid();
    }
}

function showMenu(x, y) {
    isMenuVisible = true;
    menuX = x;
    menuY = y;
    drawGrid();
}

function hideMenu() {
    isMenuVisible = false;
    drawGrid();
}

canvas.addEventListener('wheel', handleMouseWheel);
canvas.addEventListener('mousemove', handleMiddleMouseDrag);

canvas.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        // Left mouse button (button code 0)
        isDragging = true;
        startX = event.clientX - canvas.getBoundingClientRect().left;
        startY = event.clientY - canvas.getBoundingClientRect().top;
        endX = startX;
        endY = startY;
        hideMenu(); // Hide the menu when starting a drag
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
        endX = event.clientX - canvas.getBoundingClientRect().left;
        endY = event.clientY - canvas.getBoundingClientRect().top;
        drawGrid();
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        drawGrid();
    }
});

canvas.addEventListener('mouseout', () => {
    if (isDragging) {
        isDragging = false;
        drawGrid();
    }
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Prevent the default context menu
    showMenu(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideMenu(); // Hide the menu when pressing ESC
    }
});

drawGrid();
