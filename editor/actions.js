// actions.js

class Nodule {
    constructor(type, name, value, parent) {
        this.type = type;
        this.name = name;
        this.value = value;
        this.connection = null;
        this.parent = parent;
    }

    draw(ctx, x, y, index, blockWidth, blockHeight) {
        let xOffset = this.type === "input" ? 1 : blockWidth - 1;
        let yOffset = this.type === "output" ? -25 * index + blockHeight - 30 : 25 * index + 55;

        drawCircle(ctx, x + xOffset, y + yOffset, 6);
        ctx.fill();
        ctx.stroke();
    }
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
        newNodeBlock.inputs.push(new Nodule("input", input.name, input.value, newNodeBlock));
    })

    outputs.forEach(output => {
        newNodeBlock.outputs.push(new Nodule("output", output.name, output.value, newNodeBlock));
    });

    // Add the new node block to the array
    nodeBlocks.push(newNodeBlock);
    console.log(newNodeBlock);

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