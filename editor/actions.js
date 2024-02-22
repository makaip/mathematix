// actions.js

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