class Grapher {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);

        this.ctx = this.canvas.getContext('2d');
        this.viewport = new Viewport();
        this.grid = new Grid(20);

        this.functions = [];
        this.controller = null;

        this.init();
    }

    init() {
        this.resize();

        this.ctx.imageSmoothingEnabled = false;
        this.controller = new GrapherController(this);

        this.render();
    }

    resize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.render();
    }

    render() {
        this.grid.draw(this.ctx, this.viewport, this.canvas.width, this.canvas.height);

        for (const func of this.functions) {
            func.plot(this.ctx, this.viewport, this.canvas.width, this.canvas.height);
        }
    }

    addFunction(func) {
        this.functions.push(func);
        this.render();

        return func;
    }

    removeFunction(func) {
        const index = this.functions.indexOf(func);

        if (index > -1) {
            this.functions.splice(index, 1);
            this.render();
        }
    }

    clear() {
        this.functions = [];
        this.render();
    }
}

const grapher = new Grapher('graphCanvas');

// new test functions
// grapher.addFunction(new PlottableFunction('x ** 3', '#ff5733'));
// grapher.addFunction(new PlottableFunction('Math.sin(x)', '#00C49A'));
// grapher.addFunction(new PlottableFunction('x - 1', '#3498db'));
// grapher.addFunction(new PlottableFunction('(x ** 4) - 2 * (x ** 2) - 5', '#e74c3c'));
// grapher.addFunction(new PlottableFunction('x ** 2', '#9b59b6'));

window.grapher = grapher;