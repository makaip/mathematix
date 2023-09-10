// actions.js

function executeFunction() {
    console.log("Function menu item clicked");
    const cursorX = endX; // Get the X coordinate of the cursor
    const cursorY = endY; // Get the Y coordinate of the cursor

    // Create a new node block with the cursor's position and type (you can define types as needed)
    const newNodeBlock = {
        x: cursorX,
        y: cursorY,
        type: 'Function' // Replace with the appropriate node type
    };

    // Add the new node block to the array
    nodeBlocks.push(newNodeBlock);

    // Redraw the grid to include the new node block
    drawGrid();
}

function executeInput() {
    // Code for the "Input" menu item
    console.log("Input menu item clicked");
}

function executeOutput() {
    // Code for the "Output" menu item
    console.log("Output menu item clicked");
}
