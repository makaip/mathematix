// actions.js

class Nodule {
    constructor(isInput, name, value, parent) {
        this.isInput = isInput;
        this.name = name;
        this.value = value;
        this.connection = null;
        this.parent = parent;
    }

    draw(ctx, x, y, index, blockWidth, blockHeight) {
        let xOffset = this.isInput ? 1 : blockWidth - 1;
        let yOffset = this.isInput ? -25 * index + blockHeight - 30 : 25 * index + 55;

        // Draw the nodule
        ctx.fillStyle = '#9f9f9f';
        drawCircle(ctx, x + xOffset, y + yOffset, 6);
        ctx.fill();
        ctx.stroke();

        // Draw nodule label
        xOffset += this.isInput ? 10 : -10;

        ctx.fillStyle = "white"; // Text color
        ctx.font = "14px Poppins";
        ctx.textAlign = this.isInput ? "left" : "right";
        ctx.textBaseline = "middle";
        ctx.fillText(this.name, x + xOffset, y + yOffset);
    }
}


class Node {
    /**
     * @param type The type of node.
     * @param category The category of node.
     * @param operationtype The operation type of the node. (null if not applicable, e.g., a value node)
     * @param inputs An array of objects. Each object has a title "name" and a value "value".
     * @param outputs An array of objects. Each object has a title "name" and a value "value".
     */
    constructor(type, category, operationtype, inputs, outputs) {
        this.x = endX - offsetX;
        this.y = endY - offsetY;

        this.type = type;
        this.category = category;
        this.inputs = [];
        this.outputs = [];
        this.operationtype = operationtype;

        inputs.forEach(input => {
            this.inputs.push(new Nodule(true, input.name, input.value, this));
        })

        outputs.forEach(output => {
            this.outputs.push(new Nodule(false, output.name, output.value, this));
        });
    }
}

function newFunction() {
    nodeBlocks.push(
        new Node(
            "Function", "Arithmetic", "Add",
            [{name: "Input 1", value: null}, {name: "Input 2", value: null}],
            [{name: "Output", value: null}]
        )
    );

    drawGrid();
}

function newTrigFunction() {
    nodeBlocks.push(
        new Node(
            "Function", "Trigonometry", "Sine",
            [{name: "Input", value: null}],
            [{name: "Output", value: null}]
        )
    );

    drawGrid();
}

function newUnaryFunction() {
    nodeBlocks.push(
        new Node(
            "Function", "Unary Operators", "Absolute Value",
            [{name: "Input", value: null}],
            [{name: "Output", value: null}]
        )
    );

    drawGrid();
}

function newInput() {
    nodeBlocks.push(
        new Node(
            "Input", "Input", null,
            [],
            [{name: "Value", value: 5}]
        )
    );

    drawGrid();
}

function newOutput() {
    nodeBlocks.push(
        new Node(
            "Output", "Output", null,
            [{name: "Graph", value: null}],
            []
        )
    );

    drawGrid();
}

function newVariable() {
    nodeBlocks.push(
        new Node(
            "Variable", "Variable", null,
            [],
            [{name: "Value", value: "x"}]
        )
    );

    drawGrid();
}