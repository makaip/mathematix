canvas.addEventListener("mousedown", (event) => {
    if (event.button === 0) {
        mouseDown = true;

        startX = event.clientX - canvas.getBoundingClientRect().left; // idk what's going on around here, but I hope it works
        startY = event.clientY - canvas.getBoundingClientRect().top;
        handleMenuItemClick(getMenuItemAtPosition(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top));

        let clickedNodeBlock = null;
        selectedNodeBlock = null;
        for (const nodeBlock of nodeBlocks) {
            if (boundsDetection(nodeBlock, startX, startY, 0, nodeBlock.width + 5, 0, nodeBlock.height)) {
                clickedNodeBlock = nodeBlock;
            }
        }

        if (clickedNodeBlock) {
            selectedNodeBlock = clickedNodeBlock;
        }

        if (clickedNodeBlock == null && !event.shiftKey) {
            isDragging = true;
            endX = startX;
            endY = startY;
        }

        if (clickedNodeBlock instanceof FunctionNode) {
            clickedNodeBlock.cycleNodeType();
        }

        if (selectedNodeBlock !== null) {
            resultOfOutputNoduleClicked = selectedNodeBlock.outputNoduleAt(startX, startY);

            if (resultOfOutputNoduleClicked) {
                let nodeSelected = resultOfOutputNoduleClicked;

                if (typeof nodeSelected === "object" && nodeSelected !== undefined && nodeSelected !== null) {
                    isDraggingLine = true;
                    lineStartX = nodeSelected.x;
                    lineStartY = nodeSelected.y;
                }
            }
        }

        hideMenu();
    }

    drawGrid();
});

canvas.addEventListener("mousemove", (event) => {
    endX = event.clientX - canvas.getBoundingClientRect().left;
    endY = event.clientY - canvas.getBoundingClientRect().top; // mysterious code breaks when touched; not sure why it's not defined in main.js
    const cursorX = event.clientX - canvas.getBoundingClientRect().left;
    const cursorY = event.clientY - canvas.getBoundingClientRect().top;

    if (event.buttons === 4 || (event.buttons === 1 && event.shiftKey)) {
        document.getElementsByTagName("body")[0].style.cursor = "all-scroll";
        offsetX += event.movementX;
        offsetY += event.movementY;
        drawGrid();
    }

    let overNodeBlock = null;
    for (const nodeBlock of nodeBlocks) {
        // TODO: move into the NodeBlock class

        // AABB collision (what is aabb)
        if (
            boundsDetection(nodeBlock, cursorX, cursorY, -5, nodeBlock.width + 5, 0, nodeBlock.height)
            // 
        ) {
            overNodeBlock = nodeBlock; // Store the clicked node block
        }
    }

    // TODO: put in its own method
    // TODO: refactor huge if/else if blocks
    if (isDraggingLine) {
        lineEndX = endX;
        lineEndY = endY;
        
        if (overNodeBlock !== null) {
            resultOfMouseOverNodule = overNodeBlock.inputNoduleAt(cursorX, cursorY);
        }

        drawGrid();
    } else if (isDragging) {
        const deltaX = cursorX - startX;
        const deltaY = cursorY - startY;

        if (selectedNodeBlock) {
            for (const block of selectedNodeBlock) {
                block.x += deltaX;
                block.y += deltaY;
            }
        }

        drawGrid();
    } else if (selectedNodeBlock && !isDragging && mouseDown === true && !event.shiftKey) {
        const deltaX = cursorX - startX;
        const deltaY = cursorY - startY;

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

canvas.addEventListener("mouseup", (event) => {
    mouseDown = false;
    
    document.getElementsByTagName("body")[0].style.cursor = "auto";
    if (isDraggingLine) {
        isDraggingLine = false;

        if (resultOfOutputNoduleClicked !== null && resultOfMouseOverNodule !== null) {
            resultOfOutputNoduleClicked.connection = resultOfMouseOverNodule;
            resultOfMouseOverNodule.connection = resultOfOutputNoduleClicked;
        }

        drawGrid();
    }

    if (isDragging) {
        isDragging = false;
        drawGrid();
    }

    functionsToPlot = [];
    
    for (const nodeBlock of nodeBlocks) {
        if (nodeBlock instanceof OutputNode) {
            functionsToPlot.push({
                    "function": nodeBlock.getEvalFormula(),
                    "asymptotes": nodeBlock.getAsymptotes(roffsetX - rgridSize / 2, roffsetX + rgridSize / 2),
                    "color": "#00C49A"
            });
        }
    }

    // Draw the function of the selected node block
    if (selectedNodeBlock !== null) {
        functionsToPlot.push({
            "function": selectedNodeBlock.getEvalFormula(),
            "asymptotes": selectedNodeBlock.getAsymptotes(roffsetX - rgridSize / 2, roffsetX + rgridSize / 2),
            "color": "#ff3b65"  // the opposite color of Mathematix Mint Green (tm)
        })
    }

    drawGridRenderer();

    if (selectedBlocks.length > 0) {
        selectedNodeBlock = selectedBlocks;
    }

    drawGrid();
});

canvas.addEventListener("mouseout", (event) => {
    if (isDragging) {
        isDragging = false;
        drawGrid();
    }
});

window.addEventListener("keydown", (event) => {
    let keyMap = {
        "Escape": hideMenu,
        "A": () => showMenu(endX, endY),
        "F": newFunction,
        "R": newInput,
        "C": newOutput,
        "V": newVariable,
    }

    if (keyMap[event.key]) {
        keyMap[event.key]();
    }

    if (event.key === "x" || event.key === "d" || event.key === "Backspace" || event.key === "Delete") {
        for (const nodule of selectedNodeBlock.inputs.concat(selectedNodeBlock.outputs)) {
            // add this condition to prevent null pointer exceptions
            if (nodule.connection === null) {
                continue;
            }
            
            // this is some black magic trickery, but it makes sense if you synapse really hard
            nodule.connection.connection = null;
            nodule.connection = null;
        }

        nodeBlocks.splice(nodeBlocks.indexOf(selectedNodeBlock), 1);
        drawGrid();
    }
});

canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault(); // Prevent the default context menu
    showMenu(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top);
});

canvas.addEventListener("wheel", (event) => {
    // DO NOT DELETE THIS - IF YOU DELETE THIS YOU WILL GET DELETED
    // const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1; // Zoom in or out based on scroll direction
    // gridSize *= zoomFactor;
    // scale = gridSize / 20;
    //
    // // Limit the minimum and maximum grid size
    // if (gridSize < 10) {
    //     gridSize = 10; // Minimum grid size
    // } else if (gridSize > 100) {
    //     gridSize = 100; // Maximum grid size
    // }
    //
    // drawGrid();
});

function getMenuItemAtPosition(x, y) {

    const menuItemWidth = 150;
    const menuItemHeight = 30;
    const menuItemIndex = Math.floor((y - menuY) / menuItemHeight);

    if (
        x >= menuX &&
        x <= menuX + menuItemWidth &&
        y >= menuY + menuItemIndex * menuItemHeight &&
        y <= menuY + (menuItemIndex + 1) * menuItemHeight
    ) {
        return menuItems[menuItemIndex];
    } else {
        return null;
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

function handleMenuItemClick(itemText) {
    if (isMenuVisible !== true) {
        return;
    }

    let functionsByTitle = {
        "Function": newFunction,
        "Input": newInput,
        "Output": newOutput,
        "Variable": newVariable,
        "Arithmetic": newFunction,
        "Trigonometry": newTrigFunction,
        "Unary Operators": newUnaryFunction
    }

    if (functionsByTitle[itemText]) {
        functionsByTitle[itemText]();
    }
}

function boundsDetection(nodeBlock, xComp, yComp, gtx, ltx, gty, lty) {
    return xComp >= nodeBlock.x + offsetX + gtx && xComp <= nodeBlock.x + offsetX + ltx && yComp >= nodeBlock.y + offsetY + gty && yComp <= nodeBlock.y + offsetY + lty;
}