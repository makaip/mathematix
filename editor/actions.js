
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
