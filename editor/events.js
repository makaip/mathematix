function isOutputNoduleClicked(nodeBlock, x, y) {
    let noduleClicked = null;
    let noduleClickedIndex = null;
    
    if (nodeBlock !== null && x !== null && y !== null) {
        for (let index = 0; index < nodeBlock.outputs.length; index++) {
            if (x >= nodeBlock.x + 145 + offsetX &&
                x <= nodeBlock.x + 155 + offsetX &&
                y >= nodeBlock.y + (25 * index) + 50 + offsetY &&
                y <= nodeBlock.y + (25 * index) + 65 + offsetY) {
                    noduleClicked = nodeBlock.outputs[index];
                    noduleClickedIndex = index;
                    break;
                }
        }
        return [noduleClicked, noduleClickedIndex];
    }
}

function isMouseOverNodule(nodeBlock, x, y) {
    let noduleOver = null;
    let noduleOverIndex = null;

    if (nodeBlock !== null && x !== null && y !== null) {
        for (let index = 0; index < nodeBlock.inputs.length; index++) {
            const noduleX = nodeBlock.x + offsetX - 5; // X coordinate of the nodule
            const noduleY = nodeBlock.y + ( -25 * index ) + 200 - 35 + offsetY; // Y coordinate of the nodule

            console.log(noduleX, noduleY);
            const noduleWidth = 10; // Adjust as needed
            const noduleHeight = 10; // Adjust as needed
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


function handleMouseWheel(event) {
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
}

function handleMiddleMouseDrag(event) {
    if (event.buttons === 4 | (event.buttons === 1 && event.shiftKey)) {
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
        if (clickedNodeBlock == null && !event.shiftKey) {
            isDragging = true;
            endX = startX;
            endY = startY;
            // Hide the menu when starting a drag
        }

        if (clickedNodeBlock) {
            
            //x + 15, y + 75, blockWidth - 30, blockHeight - 170
            if (clickedNodeBlock.type == "Function") {
                if (startX >= clickedNodeBlock.x + 15 + offsetX &&
                    startX <= clickedNodeBlock.x + 150 - 15 + offsetX &&
                    startY >= clickedNodeBlock.y + 75 + offsetY &&
                    startY <= clickedNodeBlock.y + 200 - 100 + offsetY) {
                        if (clickedNodeBlock.category == "Arithmetic") {
                            let operations = ["Add", "Subtract", "Multiply", "Divide", "Modulus", "Exponent", "Radical", "Logarithm", "RESET"];
                            if (operations[operations.indexOf(clickedNodeBlock.operationtype) + 1] == "RESET") {
                                clickedNodeBlock.operationtype = operations[0]
                            } else if (clickedNodeBlock.operationtype == operations[operations.indexOf(clickedNodeBlock.operationtype)]) {
                                clickedNodeBlock.operationtype = operations[operations.indexOf(clickedNodeBlock.operationtype) + 1];
                            }
                        }
                        if (clickedNodeBlock.category == "Unary Operators") {
                            let operations = ["Absolute Value", "Factorial", "Ceiling", "Floor", "RESET"];
                            if (operations[operations.indexOf(clickedNodeBlock.operationtype) + 1] == "RESET") {
                                clickedNodeBlock.operationtype = operations[0]
                            } else if (clickedNodeBlock.operationtype == operations[operations.indexOf(clickedNodeBlock.operationtype)]) {
                                clickedNodeBlock.operationtype = operations[operations.indexOf(clickedNodeBlock.operationtype) + 1];
                            }
                        }
                        if (clickedNodeBlock.category == "Trigonometry") {
                            let operations = ["Sine", "Cosine", "Tangent", "Cosecant", "Secant", "Cotangent", "RESET"];
                            if (operations[operations.indexOf(clickedNodeBlock.operationtype) + 1] == "RESET") {
                                clickedNodeBlock.operationtype = operations[0]
                            } else if (clickedNodeBlock.operationtype == operations[operations.indexOf(clickedNodeBlock.operationtype)]) {
                                clickedNodeBlock.operationtype = operations[operations.indexOf(clickedNodeBlock.operationtype) + 1];
                            }
                        }
                }
            }
        }

        resultOfOutputNoduleClicked = isOutputNoduleClicked(selectedNodeBlock, startX, startY);

        let nodeSelected, nodeSelectedIndex;

        try {
            nodeSelected = resultOfOutputNoduleClicked[0];
            nodeSelectedIndex = resultOfOutputNoduleClicked[1];
        } catch {
        }

        if (typeof nodeSelected === "object" && nodeSelected !== undefined && nodeSelected !== null) {
            // Start drawing a line from the selected output nodule
            console.log("Output Nodule Clicked " + nodeSelected.name);
            isDraggingLine = true;
            lineStartX = clickedNodeBlock.x + 149 + offsetX; // X coordinate of the output nodule
            lineStartY = clickedNodeBlock.y + offsetY + 55 + (25 * nodeSelectedIndex);
            //console.log(clickedNodeBlock, lineStartX, lineStartY);
        }
        hideMenu();

        if (clickedNodeBlock) {
            document.getElementById("propertyType").innerHTML = clickedNodeBlock.type;
            document.getElementById("propertyCategory").innerHTML = clickedNodeBlock.category;
            document.getElementById("propertyInputs").innerHTML = clickedNodeBlock.inputs[0].value + ", " + clickedNodeBlock.inputs[1].value;
            document.getElementById("propertyOutputs").innerHTML = clickedNodeBlock.outputs[0].value;
        }
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

    let overNodeBlock = null;
    overNodeBlock = null;
    for (const nodeBlock of nodeBlocks) {
        const x = nodeBlock.x;
        const y = nodeBlock.y;
        const blockWidth = 150; // Replace with the width of your node block
        const blockHeight = 200; // Replace with the height of your node block
        if (
            cursorX >= x + offsetX - 5 &&
            cursorX <= x + blockWidth + offsetX + 5 &&
            cursorY >= y + offsetY &&
            cursorY <= y + blockHeight + offsetY
        ) {
            overNodeBlock = nodeBlock; // Store the clicked node block
        }
    }

    if (isDraggingLine) {
        lineEndX = endX;
        lineEndY = endY;
        
        if (overNodeBlock !== null) {
            resultOfMouseOverNodule = isMouseOverNodule(overNodeBlock, cursorX, cursorY);
            let nodeOver, nodeOverIndex;
            try {
                nodeOver = resultOfMouseOverNodule[0];
                nodeOverIndex = resultOfMouseOverNodule[1];
            } catch {
            }
            console.log(nodeOver);
            if (typeof nodeOver === "object" && nodeOver !== undefined && nodeOver !== null) {
                //console.log("Output Nodule Over " + nodeOver.name);
                //console.log(nodeOver, lineStartX, lineStartY);
            }
            
        }
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
    } else if (selectedNodeBlock && !isDragging && mouseDown == 1 && !event.shiftKey) {
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
    
    document.getElementsByTagName("body")[0].style.cursor = "auto";
    if (isDraggingLine) {
        isDraggingLine = false;
        console.log(resultOfOutputNoduleClicked[0].name + " to " + resultOfMouseOverNodule[0].name);
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
        if (nodeBlock.type == "Input" | nodeBlock.type == "Variable") {
            if (nodeBlock.outputs[0].connection !== null) {
                nodeBlock.outputs[0].connection.value = nodeBlock.outputs[0].value;
                console.log(nodeBlock.outputs[0].value);
            }
        }
        if (nodeBlock.type == "Function") {
            let functionPrediction;
            console.log(nodeBlock.operationtype);
            switch (nodeBlock.operationtype) {
                case 'Add':
                    functionPrediction = ("( " + nodeBlock.inputs[0].value + " + " + nodeBlock.inputs[1].value + " )");
                    break;
                case 'Subtract':
                    functionPrediction = ("( " + nodeBlock.inputs[0].value + " - " + nodeBlock.inputs[1].value + " )");
                    break;
                case 'Multiply':
                    functionPrediction = ("( " + nodeBlock.inputs[0].value + " * " + nodeBlock.inputs[1].value + " )");
                    break;
                case 'Divide':
                    functionPrediction = ("( " + nodeBlock.inputs[0].value + " / " + nodeBlock.inputs[1].value + " )");
                    break;
                case 'Modulus':
                    functionPrediction = ("( " + nodeBlock.inputs[0].value + " % " + nodeBlock.inputs[1].value + " )");
                    break;
                case 'Exponent':
                    functionPrediction = ("( " + nodeBlock.inputs[0].value + " ** " + nodeBlock.inputs[1].value + " )");
                    break;
                case 'Radical':
                    functionPrediction = ("( " + nodeBlock.inputs[0].value + " ** " + ( 1 / nodeBlock.inputs[1].value ) + " )");
                    break;
                case 'Logarithm':
                    functionPrediction = ("Math.log(" + nodeBlock.inputs[0].value + ")");
                    break;
                
                case 'Absolute Value':
                    functionPrediction = ("Math.abs(" + nodeBlock.inputs[0].value + ")");
                    break;
                case 'Factorial':
                    functionPrediction = ("( " + nodeBlock.inputs[0].value + "! )");
                    break;
                case 'Floor':
                    functionPrediction = ("Math.floor(" + nodeBlock.inputs[0].value + ")");
                    break;
                case 'Ceiling':
                    functionPrediction = ("Math.ceil(" + nodeBlock.inputs[0].value + ")");
                    break;
                
                case 'Sine':
                    functionPrediction = ("Math.sin(" + nodeBlock.inputs[0].value + ")");
                    break;
                case 'Cosine':
                    functionPrediction = ("Math.cos(" + nodeBlock.inputs[0].value + ")");
                    break;
                case 'Tangent':
                    functionPrediction = ("Math.tan(" + nodeBlock.inputs[0].value + ")");
                    break;
                case 'Cosecant':
                    functionPrediction = ("( " + "1 / Math.sin(" + nodeBlock.inputs[0].value + ")" + " )");
                    break;
                case 'Secant':
                    functionPrediction = ("( " + "1 / Math.cos(" + nodeBlock.inputs[0].value + ")" + " )");
                    break;
                case 'Cotangent':
                    functionPrediction = ("( " + "1 / Math.tan(" + nodeBlock.inputs[0].value + ")" + " )");
                    break;
            }
            if (nodeBlock.outputs[0].connection !== null) {
                nodeBlock.operation = functionPrediction;
                nodeBlock.outputs[0].value = nodeBlock.operation;
                nodeBlock.outputs[0].connection.value = nodeBlock.outputs[0].value;
            }
            
        }
        if (nodeBlock.type == "Output") {
            console.log("Blub: " + nodeBlock.inputs[0].value);
            functionsToPlot.push(nodeBlock.inputs[0].value);
        }
    }

    drawGridRenderer();

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
    if (event.key === "V") {
        newVariable();
    }
    if (event.key === "x" | event.key === "d" | event.key === "Backspace") {
        console.log("Deleted Block");

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
            case 'Variable':
                newVariable();
                break;
            case 'Arithmetic':
                newFunction();
                break;
            case 'Trigonometry':
                newTrigFunction();
                break;
            case 'Unary Operators':
                newUnaryFunction();
                break;
            default:
                break;
        }
    }
}

