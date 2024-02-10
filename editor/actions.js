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
        inputs: [],
        outputs: [],
        operation: null
    };

    newNodeBlock.inputs.push(newNodule("input", null, "borrower", null));
    newNodeBlock.inputs.push(newNodule("input", null, "borrower", null));
    newNodeBlock.outputs.push(newNodule("output", newNodeBlock.operation, "lender", null));
    newNodeBlock.operation = newNodeBlock.inputs[0].value + newNodeBlock.inputs[1].value;

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
        outputs: [],
        operation: null
    };

    newNodeBlock.outputs.push(newNodule("output", 5, "lender", null));

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

    newNodeBlock.inputs.push(newNodule("input", null, "borrower", null));

    // Add the new node block to the array
    nodeBlocks.push(newNodeBlock);
    console.log(newNodeBlock);

    hideMenu();
    // Redraw the grid to include the new node block
    drawGrid();
}

function newVaraible() {
    // Code for the "Input" menu item
    console.log("Variable menu item clicked");
    const cursorX = endX; // Get the X coordinate of the cursor
    const cursorY = endY; // Get the Y coordinate of the cursor

    // Create a new node block with the cursor's position and type (you can define types as needed)
    const newNodeBlock = {
        x: cursorX - offsetX,
        y: cursorY - offsetY,
        type: 'Variable', // Replace with the appropriate node type
        inputs: [],
        outputs: [],
        operation: null
    };

    newNodeBlock.outputs.push(newNodule("output", "x", "lender", null));

    // Add the new node block to the array
    nodeBlocks.push(newNodeBlock);
    console.log(newNodeBlock);

    hideMenu();
    // Redraw the grid to include the new node block
    drawGrid();
}

function newNodule(type, value, relation, connection) {
    const newNodule = {
        type: type, //input, output
        value: value, //[x, y, z, ...] | null
        relation: relation, //borrower, lender
        connection: connection //null
    }
    return newNodule;
}
