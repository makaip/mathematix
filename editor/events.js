function isOutputNoduleClicked(nodeBlock, x, y) {
    let noduleClicked = null;
    
    if (nodeBlock !== null && x !== null && y !== null) {
        for (let index = 0; index < nodeBlock.outputs.length; index++) {
            if (x >= nodeBlock.x + 145 + offsetX &&
                x <= nodeBlock.x + 155 + offsetX &&
                y >= nodeBlock.y + (25 * index) + 50 + offsetY &&
                y <= nodeBlock.y + (25 * index) + 65 + offsetY) {
                    noduleClicked = index;
                    break;
                }
        }
        return noduleClicked;
    }
}

/*
function isInputNoduleOver(nodeBlock, x, y) {
    let noduleReleased = null;
    if (nodeBlock !== null && x !== null && y !== null) {
        for (let index = 0; index < nodeBlock.outputs.length; index++) {
            if (x >= nodeBlock.x + offsetX - 5 &&
                x <= nodeBlock.x + offsetX + 5 &&
                y >= nodeBlock.y + ( -25 * index ) + 200 - 25 + offsetY &&
                y <= nodeBlock.y + ( -25 * index ) + 200 - 35 + offsetY) {
                    noduleReleased = index;
                    break;
                }
        }
        return noduleReleased;
    }
}
*/

function handleMouseWheel(event) {
    /* DO NOT DELETE
    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1; // Zoom in or out based on scroll direction
    gridSize *= zoomFactor;

    // Limit the minimum and maximum grid size
    if (gridSize < 5) {
        gridSize = 5; // Minimum grid size
    } else if (gridSize > 100) {
        gridSize = 100; // Maximum grid size
    }

    drawGrid();
    */
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

canvas.addEventListener('wheel', handleMouseWheel);
canvas.addEventListener('mousemove', handleMiddleMouseDrag);

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

canvas.addEventListener('mousedown', (event) => {
    if (event.button == 0) {
        mouseDown = true;
        startX = event.clientX - canvas.getBoundingClientRect().left;
        startY = event.clientY - canvas.getBoundingClientRect().top;

        handleMenuItemClick(getMenuItemAtPosition(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top));

        // Check if the click is inside a node block
        let clickedNodeBlock = null;
        selectedNodeBlock = null;
        for (const nodeBlock of nodeBlocks) {
            const x = nodeBlock.x;
            const y = nodeBlock.y;
            const blockWidth = 150; // Replace with the width of your node block
            const blockHeight = 200; // Replace with the height of your node block
            if (
                startX >= x + offsetX &&
                startX <= x + blockWidth + offsetX + 5 &&
                startY >= y + offsetY &&
                startY <= y + blockHeight + offsetY
            ) {
                clickedNodeBlock = nodeBlock; // Store the clicked node block
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
            // Hide the menu when starting a drag
        }

        const nodeSelected = isOutputNoduleClicked(selectedNodeBlock, startX, startY);
        if (Number.isInteger(nodeSelected)) {
            // Start drawing a line from the selected output nodule
            console.log("Output Nodule Clicked " + nodeSelected)
            isDraggingLine = true;
            lineStartX = selectedNodeBlock.x + 149 + offsetX; // X coordinate of the output nodule
            lineStartY = selectedNodeBlock.y + offsetY + 55 + (25 * nodeSelected);
        }
        hideMenu();
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

    if (isDraggingLine) {
        lineEndX = endX;
        lineEndY = endY;
        drawGrid();
    } else if (isDragging) {
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
    } else if (selectedNodeBlock && !isDragging && mouseDown == 1) {
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
    mouseDown = false;

    if (isDraggingLine) {
        isDraggingLine = false;
        drawGrid();
    }

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
    // const nodeOver = isInputNoduleOver(selectedNodeBlock, endX, endY);
    // console.log(nodeOver);

    // Update the selected node blocks
    //selectedNodeBlock = null; // Clear previous selection
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

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideMenu(); // Hide the menu when pressing ESC
    }
    if (event.key === "A") {
        showMenu(endX, endY);
    }
    if (event.key === "F") {
        newFunction();
    }
    if (event.key === "R") {
        newInput();
    }
    if (event.key === "C") {
        newOutput();
    }
    if (event.key === "x" | event.key === "d" | event.key === "Backspace") {
        console.log("Deleted Block");
        nodeBlocks.splice(nodeBlocks.indexOf(selectedNodeBlock), 1);
        drawGrid();
    }
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Prevent the default context menu
    showMenu(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top);
});

function getMenuItemAtPosition(x, y) {
    // Define the menu item dimensions and spacing
    const menuItemWidth = 150; // Adjust as needed
    const menuItemHeight = 30; // Adjust as needed

    // Calculate the index of the clicked menu item based on the mouse position
    const menuItemIndex = Math.floor((y - menuY) / menuItemHeight);

    // Check if the mouse click is within the bounds of a menu item
    if (
        x >= menuX &&
        x <= menuX + menuItemWidth &&
        y >= menuY + menuItemIndex * menuItemHeight &&
        y <= menuY + (menuItemIndex + 1) * menuItemHeight
    ) {
        // Return the text of the clicked menu item
        return menuItems[menuItemIndex];
    } else {
        // If no menu item was clicked, return null
        return null;
    }
    
}

function handleMenuItemClick(itemText) {
    if (isMenuVisible == true) {
        switch (itemText) {
            case 'Function':
                newFunction();
                break;
            case 'Input':
                newInput();
                break;
            case 'Output':
                newOutput();
                break;
            default:
                break;
        }
    }
}

