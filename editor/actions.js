// actions.js

function newNodule(type, name, value, relation, connection, parent) {
    return {
        type: type,  // input, output
        name: name,  // Value, Sum, Graph, etc.
        value: value,  // [x, y, z, ... ] | [1, 2, 3, ... ] | null
        relation: relation,  // borrower, lender
        connection: connection,  // null
        parent: parent  // null
    };
}


/**
 * Creates a new node to the given specification.
 *
 * @param type The type of node.
 * @param category The category of node.
 * @param operationtype The operation type of the node. (null if not applicable, e.g., a value node)
 * @param inputs An array of objects. Each object has a title "name" and a value "value".
 * @param outputs An array of objects. Each object has a title "name" and a value "value".
 */
function newNode(type, category, operationtype, inputs, outputs) {
    const cursorX = endX; // Get the X coordinate of the cursor
    const cursorY = endY; // Get the Y coordinate of the cursor

    // Create a new node block with the cursor's position and type (you can define types as needed)
    let newNodeBlock;

    if (operationtype !== null) {
        newNodeBlock = {
            x: cursorX - offsetX,
            y: cursorY - offsetY,
            type: type,
            category: category,
            inputs: [],
            outputs: [],
            operationtype: operationtype,
            operation: null
        }
    } else {
        newNodeBlock = {
            x: cursorX - offsetX,
            y: cursorY - offsetY,
            type: type,
            category: category,
            inputs: [],
            outputs: [],
        };
    }

    inputs.forEach(input => {
        newNodeBlock.inputs.push(newNodule("input", input.name, input.value, "borrower", null, newNodeBlock));
    })

    outputs.forEach(output => {
        newNodeBlock.outputs.push(newNodule("output", output.name, output.value, "lender", null, newNodeBlock));
    });

    // Add the new node block to the array
    nodeBlocks.push(newNodeBlock);
    console.log(newNodeBlock);

    hideMenu();
    // Redraw the grid to include the new node block
    drawGrid();
}

function newFunction() {
    newNode(
        "Function", "Arithmetic", "Add",
        [{name: "Input 1", value: null}, {name: "Input 2", value: null}],
        [{name: "Output", value: null}]
    );
}

function newTrigFunction() {
    newNode(
        "Function", "Trigonometry", "Sine",
        [{name: "Input", value: null}],
        [{name: "Output", value: null}]
    );
}

function newUnaryFunction() {
    newNode(
        "Function", "Unary Operators", "Absolute Value",
        [{name: "Input", value: null}],
        [{name: "Output", value: null}]
    );
}

function newInput() {
    newNode(
        "Input", "Input", null,
        [],
        [{name: "Value", value: 5}]
    );
}

function newOutput() {
    newNode(
        "Output", "Output", null,
        [{name: "Graph", value: null}],
        []
    );
}

function newVariable() {
    newNode(
        "Variable", "Variable", null,
        [],
        [{name: "Value", value: "x"}]
    );
}