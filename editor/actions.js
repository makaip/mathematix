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
        this.width = 150;
        this.height = 200;

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

    draw(ctx) {
        const x = this.x + offsetX;
        const y = this.y + offsetY;

        // Draw a rounded rectangle representing the node block
        ctx.fillStyle = '#343434';
        if (this === selectedNodeBlock) {
            // The outline for the selected node block
            ctx.strokeStyle = '#00C49A';
            ctx.lineWidth = 2;
        } else {
            // The outline for the unselected node block
            ctx.strokeStyle = '#141414';
        }

        drawRoundedRect(ctx, x, y, this.width, this.height, 5);  // Adjust cornerRadius as needed
        ctx.fill();
        ctx.stroke();

        drawTop(ctx, x, y, this.width, 30, 5);  // Adjust cornerRadius as needed
        ctx.fillStyle = '#00C49A';
        ctx.fill();

        ctx.fillStyle = 'white';  // Text color
        ctx.font = '16px Poppins';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText(this.category, x + 10, y + 25);

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#141414';
        ctx.fillStyle = '#9f9f9f';

        this.inputs.forEach((item, index) => {
            item.draw(ctx, x, y, index, this.width, this.height);
        });

        this.outputs.forEach((item, index) => {
            item.draw(ctx, x, y, index, this.width, this.height);
        });

        if (this.type === "Input" || this.type === "Variable") {
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#3f3f3f';
            ctx.fillStyle = '#555555';
            drawRoundedRect(ctx, x + 15, y + 155, this.width - 30, this.height - 170, 5);  // Adjust cornerRadius as needed
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = 'white';  // Text color
            ctx.font = '14px Poppins';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.outputs[0].value, x + 75, y + 170);
        }

        if (this.type === "Function") {
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#3d3d3d';
            ctx.fillStyle = '#282828';
            drawRoundedRect(ctx, x + 15, y + 75, this.width - 30, this.height - 170, 5);  // Adjust cornerRadius as needed
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = 'white';  // Text color
            ctx.font = '14px Poppins';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.operationtype, x + 27, y + 90);
        }
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