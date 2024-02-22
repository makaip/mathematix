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

    /**
     * Draws the node header.
     *
     * @param ctx The canvas context.
     * @param x The x-coordinate of the node block.
     * @param y The y-coordinate of the node block.
     */
    drawNodeHeader(ctx, x, y) {
        // Draw the node header
        drawTop(ctx, x, y, this.width, 30, 5);
        ctx.fillStyle = '#00C49A';
        ctx.fill();

        // Draw the node header text
        ctx.fillStyle = 'white';  // Text color
        ctx.font = '16px Poppins';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText(this.category, x + 10, y + 25);
    }

    /**
     * Draws the box used to display the operation type of the node (e.g., sine, cosine).
     *
     * @param ctx The canvas context.
     * @param x The x-coordinate of the node block.
     * @param y The y-coordinate of the node block.
     * @param rectYOffset The y-offset of the rectangle.
     * @param textXOffset The x-offset of the text.
     * @param textYOffset The y-offset of the text.
     * @param textAlign The text alignment.
     */
    drawBox(ctx, x, y, rectYOffset, textXOffset, textYOffset, textAlign) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#3d3d3d';
        ctx.fillStyle = '#282828';
        drawRoundedRect(ctx, x + 15, y + rectYOffset, this.width - 30, this.height - 170, 5);  // Adjust cornerRadius as needed
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'white';  // Text color
        ctx.font = '14px Poppins';
        ctx.textAlign = textAlign;
        ctx.textBaseline = 'middle';
        ctx.fillText(this.operationtype, x + textXOffset, y + textYOffset);
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

        // Draw the node "body"
        drawRoundedRect(ctx, x, y, this.width, this.height, 5);
        ctx.fill();
        ctx.stroke();

        this.drawNodeHeader(ctx, x, y);

        // Draw the attachment points
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#141414';
        ctx.fillStyle = '#9f9f9f';

        this.inputs.forEach((item, index) => {
            item.draw(ctx, x, y, index, this.width, this.height);
        });

        this.outputs.forEach((item, index) => {
            item.draw(ctx, x, y, index, this.width, this.height);
        });

        // Draw the "box" used for input or function types
        if (this.type === "Input" || this.type === "Variable") {
            this.drawBox(ctx, x, y, 155, 75, 170, "center");
        }

        if (this.type === "Function") {
            this.drawBox(ctx, x, y, 75, 27, 90, "left");
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
            "Input", "Input", "5",
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
            "Variable", "Variable", "x",
            [],
            [{name: "Value", value: "x"}]
        )
    );

    drawGrid();
}