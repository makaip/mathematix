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
        category: 'Arithmetic',
        inputs: [],
        outputs: [],
        operationtype: "Add",
        operation: null
    };

    newNodeBlock.inputs.push(newNodule("input", "Input 1", null, "borrower", null, newNodeBlock));
    newNodeBlock.inputs.push(newNodule("input", "Input 2", null, "borrower", null, newNodeBlock));
    
    newNodeBlock.outputs.push(newNodule("output", "Output", newNodeBlock.operation, "lender", null, newNodeBlock));

    // Add the new node block to the array
    nodeBlocks.push(newNodeBlock);
    console.log(newNodeBlock);

    hideMenu();
    // Redraw the grid to include the new node block
    drawGrid();
}

function newTrigFunction() {
    console.log("Function menu item clicked");
    const cursorX = endX; // Get the X coordinate of the cursor
    const cursorY = endY; // Get the Y coordinate of the cursor

    // Create a new node block with the cursor's position and type (you can define types as needed)
    const newNodeBlock = {
        x: cursorX - offsetX,
        y: cursorY - offsetY,
        type: 'Function', // Replace with the appropriate node type
        category: 'Trigonometry',
        inputs: [],
        outputs: [],
        operationtype: "Sine",
        operation: null
    };

    newNodeBlock.inputs.push(newNodule("input", "Input 1", null, "borrower", null, newNodeBlock));
    
    newNodeBlock.outputs.push(newNodule("output", "Output", newNodeBlock.operation, "lender", null, newNodeBlock));

    // Add the new node block to the array
    nodeBlocks.push(newNodeBlock);
    console.log(newNodeBlock);

    hideMenu();
    // Redraw the grid to include the new node block
    drawGrid();
}

function newUnaryFunction() {
    console.log("Function menu item clicked");
    const cursorX = endX; // Get the X coordinate of the cursor
    const cursorY = endY; // Get the Y coordinate of the cursor

    // Create a new node block with the cursor's position and type (you can define types as needed)
    const newNodeBlock = {
        x: cursorX - offsetX,
        y: cursorY - offsetY,
        type: 'Function', // Replace with the appropriate node type
        category: 'Unary Operators',
        inputs: [],
        outputs: [],
        operationtype: "Absolute Value",
        operation: null
    };

    newNodeBlock.inputs.push(newNodule("input", "Input 1", null, "borrower", null, newNodeBlock));
    
    newNodeBlock.outputs.push(newNodule("output", "Output", newNodeBlock.operation, "lender", null, newNodeBlock));

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
        category: 'Input',
        inputs: [],
        outputs: [],
    };

    newNodeBlock.outputs.push(newNodule("output", "Value", "5", "lender", null, newNodeBlock));

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
        category: 'Output',
        inputs: [],
        outputs: [],
    };

    newNodeBlock.inputs.push(newNodule("input", "Graph", null, "borrower", null, newNodeBlock));

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
        category: 'Variable',
        inputs: [],
        outputs: [],
    };

    newNodeBlock.outputs.push(newNodule("output", "Value", "x", "lender", null, newNodeBlock));

    // Add the new node block to the array
    nodeBlocks.push(newNodeBlock);
    console.log(newNodeBlock);

    hideMenu();
    // Redraw the grid to include the new node block
    drawGrid();
}

function newNodule(type, name, value, relation, connection, parent) {
    const newNodule = {
        type: type, //input, output
        name: name, //Value, Sum, Graph, etc.
        value: value, //[x, y, z, ... ] | [1, 2, 3, ... ] | null
        relation: relation, //borrower, lender
        connection: connection, //null
        parent: parent //null
    }
    return newNodule;
}
