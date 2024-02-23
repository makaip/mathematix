class Nodule {
    constructor(isInput, name, value, parent) {
        this.isInput = isInput;
        this.name = name;
        this.connection = null;
        this.parent = parent;
    }

    draw(ctx, x, y, index, blockWidth, blockHeight) {
        let xOffset = this.isInput ? 1 : blockWidth - 1;
        let yOffset = this.isInput ? -25 * index + blockHeight - 30 : 25 * index + 55;

        ctx.fillStyle = '#9f9f9f';
        drawCircle(ctx, x + xOffset, y + yOffset, 6);
        ctx.fill();
        ctx.stroke();

        xOffset += this.isInput ? 10 : -10;

        ctx.fillStyle = "white";
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

    /**
     * Draws "structure" the node block.
     *
     * @param ctx The canvas context.
     * @param x The x-coordinate of the node block.
     * @param y The y-coordinate of the node block.
     */
    drawNodeBase(ctx, x, y) {
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
    }

    /**
     * Draws the nodules (attachment points) of the node block.
     *
     * @param ctx The canvas context.
     * @param x The x-coordinate of the node block.
     * @param y The y-coordinate of the node block.
     */
    drawNodules(ctx, x, y) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#141414';
        ctx.fillStyle = '#9f9f9f';

        this.inputs.forEach((item, index) => {
            item.draw(ctx, x, y, index, this.width, this.height);
        });

        this.outputs.forEach((item, index) => {
            item.draw(ctx, x, y, index, this.width, this.height);
        });
    }

    draw(ctx) {
        const x = this.x + offsetX;
        const y = this.y + offsetY;

        this.drawNodeBase(ctx, x, y);
        this.drawNodeHeader(ctx, x, y);

        this.drawNodules(ctx, x, y);

        // Draw the "box" used for input or function types
        if (this.type === "Input" || this.type === "Variable") {
            this.drawBox(ctx, x, y, 155, 75, 170, "center");
        }

        if (this.type === "Function") {
            this.drawBox(ctx, x, y, 75, 27, 90, "left");
        }
    }

    /**
     * @returns The formula of the node block, considering all sub-nodes.
     */
    getFormula() {
        throw new Error("This method must be overridden in a subclass");
    }
}

class ValueNode extends Node {
    constructor(type, category, operationtype, inputs, outputs) {
        super(type, category, operationtype, inputs, outputs);
        this.value = operationtype;
    }

    getFormula() {
        return this.value;
    }
}

class FunctionNode extends Node {
    constructor(type, category, operationtype, inputs, outputs) {
        super(type, category, operationtype, inputs, outputs);
    }

    getFormula() {
        let input1 = this.inputs[0] === undefined ? undefined : this.inputs[0].connection.parent.getFormula();
        let input2 = this.inputs[1] === undefined ? undefined : this.inputs[1].connection.parent.getFormula();

        let predictionMap = {
            "Add": "( " + input1 + " + " + input2 + " )",
            "Subtract": "( " + input1 + " - " + input2 + " )",
            "Multiply": "( " + input1 + " * " + input2 + " )",
            "Divide": "( " + input1 + " / " + input2 + " )",
            "Modulus": "( " + input1 + " % " + input2 + " )",
            "Exponent": "( " + input1 + " ** " + input2 + " )",
            "Radical": "( " + input1 + " ** " + ( 1 / input2 ) + " )",
            "Logarithm": "Math.log(" + input1 + ")",
            "Absolute Value": "Math.abs(" + input1 + ")",
            "Factorial": "( " + input1 + "! )",
            "Floor": "Math.floor(" + input1 + ")",
            "Ceiling": "Math.ceil(" + input1 + ")",
            "Sine": "Math.sin(" + input1 + ")",
            "Cosine": "Math.cos(" + input1 + ")",
            "Tangent": "Math.tan(" + input1 + ")",
            "Cosecant": "( " + "1 / Math.sin(" + input1 + ")" + " )",
            "Secant": "( " + "1 / Math.cos(" + input1 + ")" + " )",
            "Cotangent": "( " + "1 / Math.tan(" + input1 + ")" + " )"
        }

        return predictionMap[this.operationtype];
    }
}

class OutputNode extends Node {
    constructor(type, category, operationtype, inputs, outputs) {
        super(type, category, operationtype, inputs, outputs);
    }

    getFormula() {
        if (this.inputs[0].connection === null) {
            return "";
        }

        return this.inputs[0].connection.parent.getFormula();
    }
}

function newFunction() {
    nodeBlocks.push(
        new FunctionNode(
            "Function", "Arithmetic", "Add",
            [{name: "Input 1", value: null}, {name: "Input 2", value: null}],
            [{name: "Output", value: null}]
        )
    );

    drawGrid();
}

function newTrigFunction() {
    nodeBlocks.push(
        new FunctionNode(
            "Function", "Trigonometry", "Sine",
            [{name: "Input", value: null}],
            [{name: "Output", value: null}]
        )
    );

    drawGrid();
}

function newUnaryFunction() {
    nodeBlocks.push(
        new FunctionNode(
            "Function", "Unary Operators", "Absolute Value",
            [{name: "Input", value: null}],
            [{name: "Output", value: null}]
        )
    );

    drawGrid();
}

function newInput() {
    nodeBlocks.push(
        new ValueNode(
            "Input", "Input", "5",
            [],
            [{name: "Value", value: 5}]
        )
    );

    drawGrid();
}

function newOutput() {
    nodeBlocks.push(
        new OutputNode(
            "Output", "Output", null,
            [{name: "Graph", value: null}],
            []
        )
    );

    drawGrid();
}

function newVariable() {
    nodeBlocks.push(
        new ValueNode(
            "Variable", "Variable", "x",
            [],
            [{name: "Value", value: "x"}]
        )
    );

    drawGrid();
}
