canvas.addEventListener('mousedown', (event) => {
    if (event.button == 0) {
        mouseDown = true;
        startX = event.clientX - canvas.getBoundingClientRect().left; //idk whats goin on around here but i hope it works
        startY = event.clientY - canvas.getBoundingClientRect().top;
        handleMenuItemClick(getMenuItemAtPosition(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top));

        let clickedNodeBlock = null;
        selectedNodeBlock = null;
        for (const nodeBlock of nodeBlocks) {
            const x = nodeBlock.x;
            const y = nodeBlock.y;
            const blockWidth = 150;
            const blockHeight = 200;
            if (boundsDetection(nodeBlock, startX, startY, 0, blockWidth + 5, 0, blockHeight)) {
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

        // TODO: omg what the heck is this mess of code
        if (clickedNodeBlock) {
            handleNodeTypeChange(clickedNodeBlock);
        }

        resultOfOutputNoduleClicked = isOutputNoduleClicked(selectedNodeBlock, startX, startY);

        let nodeSelected, nodeSelectedIndex;

        // TODO: remove try/catch and actually fix the *farting* error
        try {
            nodeSelected = resultOfOutputNoduleClicked[0];
            nodeSelectedIndex = resultOfOutputNoduleClicked[1];
        } catch {
            console.log("I love try blocks. They fix all of my errors. Its like even better than cgshat gpt");
        }
        if (typeof nodeSelected === "object" && nodeSelected !== undefined && nodeSelected !== null) {
            isDraggingLine = true;
            lineStartX = clickedNodeBlock.x + 149 + offsetX;
            lineStartY = clickedNodeBlock.y + offsetY + 55 + (25 * nodeSelectedIndex);
        }
        hideMenu();

        if (clickedNodeBlock) {
            document.getElementById("propertyType").innerHTML = clickedNodeBlock.type;
            document.getElementById("propertyCategory").innerHTML = clickedNodeBlock.category;
            document.getElementById("propertyFunction").innerHTML = clickedNodeBlock.getFormula();
        }
    }
    drawGrid();
});

canvas.addEventListener('mousemove', (event) => {
    endX = event.clientX - canvas.getBoundingClientRect().left;
    endY = event.clientY - canvas.getBoundingClientRect().top; // mysterious code breaks when touched; not sure why its not defined in main.js
    const cursorX = event.clientX - canvas.getBoundingClientRect().left;
    const cursorY = event.clientY - canvas.getBoundingClientRect().top;

    if (event.buttons === 4 | (event.buttons === 1 && event.shiftKey)) {
        document.getElementsByTagName("body")[0].style.cursor = "all-scroll";
        offsetX += event.movementX;
        offsetY += event.movementY;
        drawGrid();
    }

    let overNodeBlock = null;
    overNodeBlock = null;
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
            resultOfMouseOverNodule = isMouseOverNodule(overNodeBlock, cursorX, cursorY);
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
    } else if (selectedNodeBlock && !isDragging && mouseDown == 1 && !event.shiftKey) {
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

canvas.addEventListener('mouseup', (event) => {
    mouseDown = false;
    
    document.getElementsByTagName("body")[0].style.cursor = "auto";
    if (isDraggingLine) {
        isDraggingLine = false;
        resultOfOutputNoduleClicked[0].connection = resultOfMouseOverNodule[0];
        resultOfMouseOverNodule[0].connection = resultOfOutputNoduleClicked[0];
        drawGrid();
    }

    if (isDragging) {
        isDragging = false;
        drawGrid();
    }

    const endX = event.clientX - canvas.getBoundingClientRect().left;
    const endY = event.clientY - canvas.getBoundingClientRect().top;

    functionsToPlot = [];
    
    for (const nodeBlock of nodeBlocks) {
        if (nodeBlock instanceof OutputNode) {
            functionsToPlot.push({
                    "function": nodeBlock.getEvalFormula(),
                    "asymptotes": nodeBlock.getAsymptotes(roffsetX - rgridSize / 2, roffsetX + rgridSize / 2)
            });
        }
    }

    drawGridRenderer();

    // const nodeOver = isInputNoduleOver(selectedNodeBlock, endX, endY);
    // console.log(nodeOver);

    //selectedNodeBlock = null;
    if (selectedBlocks.length > 0) {
        selectedNodeBlock = selectedBlocks;
    }
    drawGrid();
});

canvas.addEventListener('mouseout', (event) => {
    if (isDragging) {
        isDragging = false;
        drawGrid();
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideMenu();
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
    if (event.key === "V") {
        newVariable();
    }
    if (event.key === "x" | event.key === "d" | event.key === "Backspace") {
        //WHY THIS NO WORK AAAAAAA
        /*
        for (length = 0; length < selectedNodeBlock.inputs.length; length++) {
            for (asdf = 0; asdf < selectedNodeBlock.inputs[length].connection.parent.inputs.length; asdf++) {
                selectedNodeBlock.inputs[length].connection.parent.inputs[asdf].connection = null;
            }
            console.log(selectedNodeBlock.inputs[length].connection.parent.inputs);
            selectedNodeBlock.inputs[length].connection = null;
        }
        */
        nodeBlocks.splice(nodeBlocks.indexOf(selectedNodeBlock), 1);
        drawGrid();
    }
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Prevent the default context menu
    showMenu(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top);
});

canvas.addEventListener('wheel', (event) => {
    /* DO NOT DELETE | IF YOU DELETE THIS YOU WILL GET DELETED
    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1; // Zoom in or out based on scroll direction
    gridSize *= zoomFactor;
    scale = gridSize / 20;

    // Limit the minimum and maximum grid size
    if (gridSize < 10) {
        gridSize = 10; // Minimum grid size
    } else if (gridSize > 100) {
        gridSize = 100; // Maximum grid size
    }

    drawGrid();
    */
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

function isOutputNoduleClicked(nodeBlock, x, y) {
    // TODO: move to the Nodule class

    let noduleClicked = null;
    let noduleClickedIndex = null;
    if (nodeBlock !== null && x !== null && y !== null) {
        for (let index = 0; index < nodeBlock.outputs.length; index++) {
            if (boundsDetection(nodeBlock, startX, startY, 145, 155, (25 * index) + 50, (25 * index) + 65)) {
                    try {
                        noduleClicked = nodeBlock.outputs[index];
                        noduleClickedIndex = index;
                    } catch {
                        console.log("The following error was written and defined by Github Copilot. I have no idea what is happening. I simply typed 'bruh' and copilot did the rest: ")
                        console.log("Bruh moment in the try/catch block in events.js line 168. This is a temporary fix. Please fix this. Thank you. - The Management Team of the Math Function Grapher Project. (TM) (C) 2021. All rights reserved. All trademarks are property of their respective owners.");
                    }
                    break;
                }
        }
        return [noduleClicked, noduleClickedIndex];
    }
}

function isMouseOverNodule(nodeBlock, x, y) {
    // TODO: move to a method in the Nodule class
    let noduleOver = null;
    let noduleOverIndex = null;

    if (nodeBlock !== null && x !== null && y !== null) {
        for (let index = 0; index < nodeBlock.inputs.length; index++) {
            const noduleX = nodeBlock.x + offsetX - 5;
            const noduleY = nodeBlock.y + ( -25 * index ) + 200 - 35 + offsetY;

            const noduleWidth = 10;
            const noduleHeight = 10;
            if (
                x >= noduleX &&
                x <= noduleX + noduleWidth &&
                y >= noduleY &&
                y <= noduleY + noduleHeight
            ) {
                noduleOver = nodeBlock.inputs[index];
                noduleOverIndex = index;
                break;
            }
        }
        return [noduleOver, noduleOverIndex];
    }
}

function handleNodeTypeChange(nodeBlockToChange) {
    //x + 15, y + 75, blockWidth - 30, blockHeight - 170
    if (nodeBlockToChange.type == "Function") {
        if (startX >= nodeBlockToChange.x + 15 + offsetX &&
            startX <= nodeBlockToChange.x + 150 - 15 + offsetX &&
            startY >= nodeBlockToChange.y + 75 + offsetY &&
            startY <= nodeBlockToChange.y + 200 - 100 + offsetY)
        {
            if (nodeBlockToChange.category == "Arithmetic") {
                let operations = ["Add", "Subtract", "Multiply", "Divide", "Modulus", "Exponent", "Radical", "Logarithm", "RESET"];
                if (operations[operations.indexOf(nodeBlockToChange.operationtype) + 1] == "RESET") {
                    nodeBlockToChange.operationtype = operations[0]
                } else if (nodeBlockToChange.operationtype == operations[operations.indexOf(nodeBlockToChange.operationtype)]) {
                    nodeBlockToChange.operationtype = operations[operations.indexOf(nodeBlockToChange.operationtype) + 1];
                }
            }
            if (nodeBlockToChange.category == "Unary Operators") {
                let operations = ["Absolute Value", "Ceiling", "Floor", "RESET"];
                //let operations = ["Absolute Value", "Factorial", "Ceiling", "Floor", "RESET"]; (copy of above line with factorial)
                if (operations[operations.indexOf(nodeBlockToChange.operationtype) + 1] == "RESET") {
                    nodeBlockToChange.operationtype = operations[0]
                } else if (nodeBlockToChange.operationtype == operations[operations.indexOf(nodeBlockToChange.operationtype)]) {
                    nodeBlockToChange.operationtype = operations[operations.indexOf(nodeBlockToChange.operationtype) + 1];
                }
            }
            if (nodeBlockToChange.category == "Trigonometry") {
                let operations = ["Sine", "Cosine", "Tangent", "Cosecant", "Secant", "Cotangent", "RESET"];
                if (operations[operations.indexOf(nodeBlockToChange.operationtype) + 1] == "RESET") {
                    nodeBlockToChange.operationtype = operations[0]
                } else if (nodeBlockToChange.operationtype == operations[operations.indexOf(nodeBlockToChange.operationtype)]) {
                    nodeBlockToChange.operationtype = operations[operations.indexOf(nodeBlockToChange.operationtype) + 1];
                }
            }
        }
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

function boundsDetection(nodeBlock, xcomp, ycomp, gtx, ltx, gty, lty) {
    return xcomp >= nodeBlock.x + offsetX + gtx && xcomp <= nodeBlock.x + offsetX + ltx && ycomp >= nodeBlock.y + offsetY + gty && ycomp <= nodeBlock.y + offsetY + lty;
}