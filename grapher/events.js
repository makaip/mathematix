// Function to handle mouse wheel events (zoom in/out)
function handleMouseWheelRenderer(event) {
    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1; // Zoom in or out based on scroll direction

    // Calculate the center of the canvas
    const centerX = rcanvasWidth / 2;
    const centerY = rcanvasHeight / 2;

    // Calculate the offsets based on the zoom factor to keep the center point stationary while zooming
    roffsetX = (roffsetX - centerX) * zoomFactor + centerX;
    roffsetY = (roffsetY - centerY) * zoomFactor + centerY;

    rgridSize *= zoomFactor;

    // Limit the minimum and maximum grid size
    if (rgridSize < 5) {
        rgridSize = 5; // Minimum grid size
    } else if (rgridSize > 100) {
        rgridSize = 100; // Maximum grid size
    }

    drawGridRenderer();
}


// Function to handle middle mouse button drag (panning)
function handleMiddleMouseDragRenderer(event) {
    if (event.buttons === 4) {
        // Middle mouse button (button code 4)
        roffsetX -= event.movementX;
        roffsetY -= event.movementY;
        drawGridRenderer();
    }
}



// Add event listeners for wheel and mousemove events
rcanvas.addEventListener('wheel', handleMouseWheelRenderer);
rcanvas.addEventListener('mousemove', handleMiddleMouseDragRenderer);