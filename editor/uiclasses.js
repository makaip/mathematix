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

    /**
     * @returns The asymptotes of the node block, considering all sub-nodes.
     */
    getAsymptotes(xMin, xMax) {
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

    getAsymptotes(xMin, xMax) {
        return [];
    }
}

class FunctionNode extends Node {
    constructor(type, category, operationtype, inputs, outputs) {
        super(type, category, operationtype, inputs, outputs);

        console.log(getZeros("x^2 - 4"));
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
            "Logarithm": "log(" + input1 + ")",  // TODO: add base
            "Absolute Value": "abs(" + input1 + ")",
            "Factorial": "( " + input1 + "! )",
            "Floor": "floor(" + input1 + ")",
            "Ceiling": "ceil(" + input1 + ")",
            "Sine": "sin(" + input1 + ")",
            "Cosine": "cos(" + input1 + ")",
            "Tangent": "tan(" + input1 + ")",
            "Cosecant": "(1 / sin(" + input1 + "))",
            "Secant": "(1 / cos(" + input1 + "))",
            "Cotangent": "(1 / tan(" + input1 + "))"
        }

        return predictionMap[this.operationtype];
    }

    getAsymptotes(xMin, xMax) {
        let input1Formula = this.inputs[0] === undefined ? undefined : this.inputs[0].connection.parent.getFormula();
        let input2Formula = this.inputs[1] === undefined ? undefined : this.inputs[1].connection.parent.getFormula();

        let input1Asymptotes = this.inputs[0] === undefined ? undefined : this.inputs[0].connection.parent.getAsymptotes(xMin, xMax);
        let input2Asymptotes = this.inputs[1] === undefined ? undefined : this.inputs[1].connection.parent.getAsymptotes(xMin, xMax);

        let asymptotes = [];

        if (input1Asymptotes !== undefined) {
            asymptotes = asymptotes.concat(input1Asymptotes);
        } if (input2Asymptotes !== undefined) {
            asymptotes = asymptotes.concat(input2Asymptotes);
        }

        let functionsToFindZerosOf = [];
        if (this.operationtype === "Divide" && input2Formula !== undefined) {
            functionsToFindZerosOf.push(input2Formula);
        } else if (this.operationtype === "Radical" && input1Formula !== undefined) {
            functionsToFindZerosOf.push(input1Formula);
        } else if (this.operationtype === "Logarithm" && input1Formula !== undefined) {
            functionsToFindZerosOf.push(input1Formula);
        } else if (this.operationtype === "Tangent" && input1Formula !== undefined) {
            let funcInverseSolutions = getFunctionInverse(input1Formula);

            for (const solution of funcInverseSolutions) {
                for (let i = -10; i < 10; i++) {
                    asymptotes.push(Number(solution.sub("x", "pi / 2 + pi * " + i).evaluate()));
                }
            }
        }

        console.log(functionsToFindZerosOf);

        let zeros = [];
        for (const func of functionsToFindZerosOf) {
            zeros = zeros.concat(getZeros(func));
        }

        console.log(zeros);

        asymptotes = asymptotes.concat(zeros);

        return asymptotes;
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

    getAsymptotes(xMin, xMax) {
        return this.inputs[0].connection.parent.getAsymptotes(xMin, xMax);
    }
}


function getFunctionInverse(funcStr) {
    funcStr = "y = " + funcStr;

    let func = nerdamer(funcStr);
    func = func.sub("x", "t");  // temp variable
    func = func.sub("y", "x");
    func = func.sub("t", "y");
    let solutions = func.solveFor("y");

    return solutions;
}


function getZeros(funcStr) {
    funcStr += " = 0";
    let solutions = nerdamer.solve(funcStr, "x").evaluate();
    let zeros = eval(solutions.text());  // TODO: eval is a lazy way to convert a string to a number or list of numbers

    if (typeof zeros === "number") {
        zeros = [zeros];
    }

    return zeros;
}