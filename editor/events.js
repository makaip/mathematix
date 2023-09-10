function handleMouseWheel(event) {
    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1; // Zoom in or out based on scroll direction
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
        //all-scroll
        document.getElementsByTagName("body")[0].style.cursor = "all-scroll";
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
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;

    // Check if the click is inside a node block
    let clickedNodeBlock = null;
    for (const nodeBlock of nodeBlocks) {
        const x = nodeBlock.x;
        const y = nodeBlock.y;
        const blockWidth = 150; // Replace with the width of your node block
        const blockHeight = 200; // Replace with the height of your node block
        if (
            startX >= x &&
            startX <= x + blockWidth &&
            startY >= y &&
            startY <= y + blockHeight
        ) {
            clickedNodeBlock = nodeBlock; // Store the clicked node block
            //break; // No need to check other node blocks
        }
    }

    if (clickedNodeBlock) {
        // If a node block is clicked, select it for dragging
        selectedNodeBlock = clickedNodeBlock;
    }
    if (clickedNodeBlock == null) {
        isDragging = true;
        endX = startX;
        endY = startY;
        hideMenu(); // Hide the menu when starting a drag
    }
    drawGrid();
});

/*
    endX = event.clientX - canvas.getBoundingClientRect().left;
    endY = event.clientY - canvas.getBoundingClientRect().top;
*/


canvas.addEventListener('mousemove', (event) => {
    endX = event.clientX - canvas.getBoundingClientRect().left;
    endY = event.clientY - canvas.getBoundingClientRect().top;
    const cursorX = event.clientX - canvas.getBoundingClientRect().left;
    const cursorY = event.clientY - canvas.getBoundingClientRect().top;

    if (isDragging) {
        // Calculate the movement of the cursor
        const deltaX = cursorX - startX;
        const deltaY = cursorY - startY;

        // Update the position of the selected node block
        if (selectedNodeBlock) {
            for (const block of selectedNodeBlock) {
                block.x += deltaX;
                block.y += deltaY;
            }
        }

        drawGrid();
    } else if (selectedNodeBlock && !isDragging) {
        // Handle node block dragging
        // Calculate the movement of the cursor
        const deltaX = cursorX - startX;
        const deltaY = cursorY - startY;

        // Update the position of the selected node block(s)
        if (Array.isArray(selectedNodeBlock)) {
            for (const block of selectedNodeBlock) {
                block.x += deltaX;
                block.y += deltaY;
            }
        } else {
            selectedNodeBlock.x += deltaX;
            selectedNodeBlock.y += deltaY;
        }

        startX = cursorX;
        startY = cursorY;
        
        drawGrid();
    }
});

document.addEventListener('mouseup', (event) => {
    selectedNodeBlock = null;
    if (isDragging) {
        isDragging = false;
        drawGrid();
    }
    if (event.button == "1") {
        document.getElementsByTagName("body")[0].style.cursor = "auto";
    }

    const endX = event.clientX - canvas.getBoundingClientRect().left;
    const endY = event.clientY - canvas.getBoundingClientRect().top;

    // Determine selected node blocks within the box
    var selectedBlocks = [];
    let boxSelectStartX, boxSelectStartY;
    for (const nodeBlock of nodeBlocks) {
        const x = nodeBlock.x;
        const y = nodeBlock.y;
        const blockWidth = 100; // Replace with the width of your node block
        const blockHeight = 50; // Replace with the height of your node block
        if (
            boxSelectStartX <= x + blockWidth &&
            endX >= x &&
            boxSelectStartY <= y + blockHeight &&
            endY >= y
        ) {
            selectedBlocks.push(nodeBlock);
        }
    }

    // Update the selected node blocks
    selectedNodeBlock = null; // Clear previous selection
    if (selectedBlocks.length > 0) {
        // Select the nodes within the box
        selectedNodeBlock = selectedBlocks;
    }
    drawGrid();
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

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideMenu(); // Hide the menu when pressing ESC
    }
    if (event.key === "A") {
        executeFunction();
    }
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Prevent the default context menu
    showMenu(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top);
    let menuItemText = getMenuItemAtPosition(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top);
    if (menuItemText) {
        handleMenuItemClick(menuItemText);
    }
});

function handleMenuItemClick(itemText) {
    switch (itemText) {
        case 'Function':
            executeFunction(); // Call the executeFunction from actions.js
            break;
        case 'Input':
            executeInput(); // Call the executeInput from actions.js
            break;
        case 'Output':
            executeOutput(); // Call the executeOutput from actions.js
            break;
        // Add more cases for other menu items if needed

        default:
            break;
    }
}



