// actions.js

function newFunction() {
    console.log("Function menu item clicked");
    const cursorX = endX; // Get the X coordinate of the cursor
    const cursorY = endY; // Get the Y coordinate of the cursor

    // Create a new node block with the cursor's position and type (you can define types as needed)
    const newNodeBlock = {
        x: cursorX - offsetX,
        y: cursorY - offsetY,
        type: 'Function', // Replace with the appropriate node type
        inputs: ['Value', 'Value'],
        outputs: ['Value'],
        operation: 'Add'
    };

    // Add the new node block to the array
    nodeBlocks.push(newNodeBlock);
    console.log(newNodeBlock);

    hideMenu();
    // Redraw the grid to include the new node block
    drawGrid();
}

function newInput() {
    // Code for the "Input" menu item
    console.log("Input menu item clicked");
    const cursorX = endX; // Get the X coordinate of the cursor
    const cursorY = endY; // Get the Y coordinate of the cursor

    // Create a new node block with the cursor's position and type (you can define types as needed)
    const newNodeBlock = {
        x: cursorX - offsetX,
        y: cursorY - offsetY,
        type: 'Input', // Replace with the appropriate node type
        inputs: [],
        outputs: ['Value'],
        operation: null
    };

    // Add the new node block to the array
    nodeBlocks.push(newNodeBlock);
    console.log(newNodeBlock);

    hideMenu();
    // Redraw the grid to include the new node block
    drawGrid();
}

function newOutput() {
    // Code for the "Output" menu item
    console.log("Output menu item clicked");
    const cursorX = endX; // Get the X coordinate of the cursor
    const cursorY = endY; // Get the Y coordinate of the cursor

    // Create a new node block with the cursor's position and type (you can define types as needed)
    const newNodeBlock = {
        x: cursorX - offsetX,
        y: cursorY - offsetY,
        type: 'Output', // Replace with the appropriate node type
        inputs: ['Value'],
        outputs: [],
        operation: null
    };

    // Add the new node block to the array
    nodeBlocks.push(newNodeBlock);
    console.log(newNodeBlock);

    hideMenu();
    // Redraw the grid to include the new node block
    drawGrid();
}
