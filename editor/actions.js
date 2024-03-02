
function newFunction() {
    nodeBlocks.push(
        new FunctionNode(
            "Arithmetic", "Add",
            [{name: "Input 1", value: null}, {name: "Input 2", value: null}],
            [{name: "Output", value: null}]
        )
    );

    drawGrid();
}

function newTrigFunction() {
    nodeBlocks.push(
        new FunctionNode(
            "Trigonometry", "Sine",
            [{name: "Input", value: null}],
            [{name: "Output", value: null}]
        )
    );

    drawGrid();
}

function newUnaryFunction() {
    nodeBlocks.push(
        new FunctionNode(
            "Unary Operator", "Absolute Value",
            [{name: "Input", value: null}],
            [{name: "Output", value: null}]
        )
    );

    drawGrid();
}

function newInput() {
    nodeBlocks.push(
        new ValueNode(
            "Input", "5",
            [],
            [{name: "Value", value: 5}]
        )
    );

    drawGrid();
}

function newOutput() {
    nodeBlocks.push(new OutputNode());

    drawGrid();
}

function newVariable() {
    nodeBlocks.push(
        new ValueNode(
            "Variable", "x",
            [{name: "Value", value: "x"}]
        )
    );

    drawGrid();
}
