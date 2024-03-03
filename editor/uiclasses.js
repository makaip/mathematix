class Nodule {
    HITBOX_RADIUS = 10;

    constructor(isInput, name, value, parent, index) {
        this.isInput = isInput;
        this.name = name;
        this.connection = null;
        this.parent = parent;
        this.index = index;

        // defines x and y
        this.refreshPos();
    }

    /**
     * Refreshes the position based on the parent NodeBlock.
     */
    refreshPos() {
        let xOffset = this.isInput ? 1 : this.parent.width - 1;
        let yOffset = this.isInput ? -25 * this.index + this.parent.height - 30 : 25 * this.index + 55;

        this.x = this.parent.x + xOffset;
        this.y = this.parent.y + yOffset;
    }

    draw(ctx) {
        this.refreshPos();

        ctx.fillStyle = '#9f9f9f';
        drawCircle(ctx, this.x, this.y, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.font = "14px Poppins";
        ctx.textAlign = this.isInput ? "left" : "right";
        ctx.textBaseline = "middle";

        let textOffset = this.isInput ? 10 : -10;
        ctx.fillText(this.name, this.x + textOffset, this.y);
    }

    collidesWith(x, y) {
        return (this.x - x) ** 2 + (this.y - y) ** 2 < this.HITBOX_RADIUS ** 2;
    }
}

class Node {
    /**
     * @param category The category of node.
     * @param operationtype The operation type of the node. (null if not applicable, e.g., a value node)
     * @param inputs An array of objects. Each object has a title "name" and a value "value".
     * @param outputs An array of objects. Each object has a title "name" and a value "value".
     */
    constructor(category, operationtype, inputs, outputs) {
        this.width = 150;
        this.height = 200;

        this.x = endX - offsetX;
        this.y = endY - offsetY;

        this.category = category;
        this.inputs = [];
        this.outputs = [];
        this.operationtype = operationtype;

        inputs.toReversed().forEach((input, index) => {
            this.inputs.push(new Nodule(true, input.name, input.value, this, index));
        })

        outputs.toReversed().forEach((output, index) => {
            this.outputs.push(new Nodule(false, output.name, output.value, this, index));
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

        // Draw the "box" used for function types
        if (this instanceof FunctionNode) {
            this.drawBox(ctx, x, y, 75, 27, 90, "left");
        }
    }

    /**
     * @returns The formula of the node block, considering all sub-nodes.
     */
    getFormula() {
        throw new Error("This method must be overridden in a subclass");
    }

    getEvalFormula() {
        let replaceMap = {
            "log": "Math.log",
            "abs": "Math.abs",
            "floor": "Math.floor",
            "ceil": "Math.ceil",
            "sin": "Math.sin",
            "cos": "Math.cos",
            "tan": "Math.tan"
        }

        let formula = this.getFormula();

        for (const key in replaceMap) {
            formula = formula.replaceAll(key, replaceMap[key]);
        }

        return formula;
    }

    /**
     * @returns The asymptotes of the node block, considering all sub-nodes.
     */
    getAsymptotes(xMin, xMax) {
        throw new Error("This method must be overridden in a subclass");
    }

    cycleNodeType() {
        //x + 15, y + 75, blockWidth - 30, blockHeight - 170
        // Exit if the mouse is not within the bounds of the box
        if (startX < this.x + 15 + offsetX ||
            startX > this.x + 150 - 15 + offsetX ||
            startY < this.y + 75 + offsetY ||
            startY > this.y + 200 - 100 + offsetY)
        {
            return;
        }

        let operationsByCategory = {
            "Arithmetic": ["Add", "Subtract", "Multiply", "Divide", "Exponent", "Modulus", "Radical", "Logarithm"],
            "Unary Operators": ["Absolute Value", "Ceiling", "Floor"],
            "Trigonometry": ["Sine", "Cosine", "Tangent", "Cosecant", "Secant", "Cotangent"]
        }

        let operations = operationsByCategory[this.category];
        let operationTypeIndex = operations.indexOf(this.operationtype);
        let newOperationIndex = operationTypeIndex + 1;

        // "Roll over" the operations array
        if (newOperationIndex === operations.length - 1) {
            newOperationIndex = 0;
        }

        this.operationtype = operations[newOperationIndex];
    }

    inputNoduleAt(x, y) {
        for (const nodule of this.inputs) {
            if (nodule.collidesWith(x, y)) {
                return nodule;
            }
        }

        return null;
    }

    outputNoduleAt(x, y) {
        for (const nodule of this.outputs) {
            if (nodule.collidesWith(x, y)) {
                return nodule;
            }
        }

        return null;
    }

    /**
     * @param x The x coordinate to check collision for
     * @param y The y coordinate to check collision for
     * @returns {boolean} Whether the given x and y coordinates collide with the node block
     */
    collidesWithBlock(x, y) {
        return x >= this.x + offsetX && x <= this.x + this.width + offsetX
            && y >= this.y + offsetY && y <= this.y + this.height + offsetY;
    }
}

class ValueNode extends Node {
    constructor(category, operationtype, outputs) {
        super(category, operationtype, [], outputs);

        this.inputBox = new InputBox(
            this,
            this.x + this.width / 2, this.y + this.height * 2 / 3,
            this.width * 4/5, this.height / 6,
            this.value
        );

        this.inputBox.text = operationtype;
    }

    draw(ctx) {
        super.draw(ctx);
        this.inputBox.draw(ctx);
    }

    getFormula() {
        return this.inputBox.text;
    }

    getAsymptotes(xMin, xMax) {
        return [];
    }

    handleKeyEvent(event) {
        this.inputBox.handleKeyEvent(event);
    }
}

class FunctionNode extends Node {
    constructor(category, operationtype, inputs, outputs) {
        super(category, operationtype, inputs, outputs);

        console.log(getZeros("x^2 - 4"));
    }

    getFormula() {
        // Both inputs are numerical values?
        let input1 = this.inputs[0] === undefined ? undefined : this.inputs[0].connection.parent.getFormula();
        let input2 = this.inputs[1] === undefined ? undefined : this.inputs[1].connection.parent.getFormula();

        let predictionMap = {
            "Add": "( " + input1 + " + " + input2 + " )",
            "Subtract": "( " + input1 + " - " + input2 + " )",
            "Multiply": "( " + input1 + " * " + input2 + " )",
            "Divide": "( " + input1 + " / " + input2 + " )",
            "Modulus": "( " + input1 + " % " + input2 + " )",
            "Exponent": "( " + input1 + " ** " + input2 + " )",
            "Radical": "( " + input1 + " ** " + ( 1 / input2 ) + " )",  // WARNING: if an invalid input is given, the program will hang
            "Logarithm": "log(" + input1 + ") / log(" + input2 + ")",
            "Absolute Value": "abs(" + input1 + ")",
            // "Factorial": input1,  // TODO: implement factorial
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
        if (this.operationtype === "Divide" && input2Formula !== undefined ) {
            functionsToFindZerosOf.push(input2Formula);
        } else if (this.operationtype === "Logarithm" && input2Formula !== undefined) {
            // since this is the denominator in the change of base formula
            functionsToFindZerosOf.push("log(" + input2Formula + ")");
        } else if ((["Tangent", "Secant", "Cosecant", "Cotangent"].includes(this.operationtype)) && input1Formula !== undefined) {

            let isDenominatorSine = ["Cosecant", "Cotangent"].includes(this.operationtype);
            let funcInverseSolutions = getFunctionInverse(input1Formula);

            for (const solution of funcInverseSolutions) {
                let graphStart = getRealX(0);
                let graphEnd = getRealX(rcanvasWidth);

                let start = isDenominatorSine ? nthSineZero(input1Formula, graphStart) : nthCosineZero(input1Formula, graphStart);
                let end = isDenominatorSine ? nthSineZero(input1Formula, graphEnd) + 1: nthCosineZero(input1Formula, graphEnd) + 1;

                for (let i = start; i < end; i++) {
                    // since tan(x) = sin(x) / cos(x), we find when cos(x) = 0 to find asymptotes
                    // if we have the function cos(f(x)) = 0, we find x = f^-1(cos^-1(0) + pi * n), where n is the nth asymptote
                    // so if we substitute x for cos^-1(0) + pi * n, we get the x-value of the nth asymptote

                    let replaceValue = isDenominatorSine ? "pi *" : "pi / 2 + pi *"
                    asymptotes.push(Number(solution.sub("x", replaceValue + i).evaluate()));
                }
            }
        }

        let zeros = [];
        for (const func of functionsToFindZerosOf) {
            try {
                zeros = zeros.concat(getZeros(func));
            } catch (e) {
                // do nothing if a ParseError occurs, likely caused by setting 5 = 0 or something
                if (e.name !== "ParseError") {
                    throw e;
                }
            }
        }

        return asymptotes.concat(zeros);
    }
}

class OutputNode extends Node {
    constructor() {
        super("Output", null, [{name: "Graph", value: null}], []);
    }

    getFormula() {
        if (this.inputs[0].connection === null) {
            return "";
        }

        return this.inputs[0].connection.parent.getFormula();
    }

    getAsymptotes(xMin, xMax) {
        if (this.inputs[0].connection === null) {
            return [];
        }

        return this.inputs[0].connection.parent.getAsymptotes(xMin, xMax);
    }
}

class InputBox {
    /**
     * @param parent The parent node block. Used to stay with it when it moves.
     * @param x The x-coordinate of the box.
     * @param y The y-coordinate of the box.
     * @param width The width of the box.
     * @param height The height of the box.
     * @param text The text to display in the box.
     */
    constructor(parent, x, y, width, height, text) {
        this.parent = parent;
        this.originalParentX = parent.x;
        this.originalParentY = parent.y;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
    }

    draw(ctx) {
        let xOffset = this.parent.x - this.originalParentX;
        let yOffset = this.parent.y - this.originalParentY;

        ctx.strokeStyle = "#3d3d3d";
        if (this.parent === selectedNodeBlock) {
            ctx.strokeStyle = "#00C49A";
        }

        ctx.fillStyle = "#282828";
        ctx.lineWidth = 2;

        drawRoundedRect(
            ctx,
            this.x - this.width / 2 + xOffset, this.y - this.height / 2 + yOffset,
            this.width, this.height,
            5
        );

        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.font = "16px Poppins";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.x + xOffset, this.y + yOffset);
    }

    handleKeyEvent(event) {
        if (this.parent !== selectedNodeBlock) {
            return;
        }

        if (event.key === "Backspace") {
            this.text = this.text.slice(0, -1);
        } else if (event.key.length === 1) {
            this.text += event.key;
        }

        this.draw(ctx);
    }
}

function nthSineZero(func, x) {
    // floor((f(x) - sin^-1(0)) / pi) = floor(f(x) / pi)
    return Math.floor((Number(nerdamer(func).evaluate({"x": x})) / Math.PI));
}


/**
 * The floor of the nth zero at the value x for cosine. Used for finding the nth tangent asymptote at x = ?
 * @param func The inner function to find the zero of.
 * @param x The x-value to find the zero at.
 */
function nthCosineZero(func, x) {
    // floor((f(x) - cos^-1(0)) / pi)
    return Math.floor((Number(nerdamer(func).evaluate({"x": x}) - (Math.PI / 2)) / Math.PI));
}


function getFunctionInverse(funcStr) {
    funcStr = "y = " + funcStr;

    let func = nerdamer(funcStr);
    func = func.sub("x", "t");  // temp variable
    func = func.sub("y", "x");
    func = func.sub("t", "y");
    return func.solveFor("y");
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