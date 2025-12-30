let functionsToPlot = []; // legacy compatibility layer for editor

function drawGridRenderer() { 
    if (window.grapher) {
        // sync functionsToPlot array to grapher
        window.grapher.clear();
        for (const funcObj of functionsToPlot) {
            const func = new PlottableFunction(funcObj.function, funcObj.color); 
            func.asymptotes = funcObj.asymptotes || [];
            window.grapher.addFunction(func);
        }
    }
}

class Grid {
    constructor(size, backgroundColor = '#1d1d1d', lineColor = '#282828') {
        this.size = size;
        this.backgroundColor = backgroundColor;
        this.lineColor = lineColor;
        this.axisColor = '#fff';
    }

    draw(ctx, viewport, canvasWidth, canvasHeight) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = 1;

        for (let x = -this.size - 1; x < canvasWidth; x += this.size) {
            ctx.beginPath();
            ctx.moveTo(x - viewport.offsetX % this.size, 0);
            ctx.lineTo(x - viewport.offsetX % this.size, canvasHeight);
            ctx.stroke();
        }

        for (let y = -this.size - 5; y < canvasHeight; y += this.size) {
            ctx.beginPath();
            ctx.moveTo(0, y - viewport.offsetY % this.size);
            ctx.lineTo(canvasWidth, y - viewport.offsetY % this.size);
            ctx.stroke();
        }

        ctx.strokeStyle = this.axisColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvasHeight / 2 - viewport.offsetY);
        ctx.lineTo(canvasWidth, canvasHeight / 2 - viewport.offsetY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2 - viewport.offsetX, 0);
        ctx.lineTo(canvasWidth / 2 - viewport.offsetX, canvasHeight);
        ctx.stroke();
    }
}

// sort of weird to have the function handle its own plotting-- may fix this later
class PlottableFunction { 
    constructor(expression, color = "#00C49A") {
        this.expression = expression;
        this.color = color;
        this.asymptotes = [];
        this.visible = true;
    }

    evaluate(x) {
        try {
            return eval(this.expression.replaceAll("x", "(" + x + ")"));
        } catch (e) {
            return NaN;
        }
    }

    plot(ctx, viewport, canvasWidth, canvasHeight) {
        if (!this.visible) return;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2.25;
        ctx.beginPath();

        let lastRealX = viewport.screenToWorld(0, 0, canvasWidth, canvasHeight).x;

        for (let x = 0; x < canvasWidth; x++) {
            const realX = viewport.screenToWorld(x, 0, canvasWidth, canvasHeight).x;

            // asymptote check
            let isAsymptote = false;
            for (const asymptote of this.asymptotes) {
                if (lastRealX === asymptote || realX === asymptote ||
                    (lastRealX < asymptote && realX > asymptote)) {
                    isAsymptote = true;
                }
            }

            // eval function from screen X to get y, the conv to screen coords
            const y = this.evaluate(realX);
            const realY = -y * 40 + (canvasHeight / 2 - viewport.offsetY);

            if (x === 0 || isAsymptote) {
                ctx.moveTo(x, realY);
            } else {
                ctx.lineTo(x, realY);
            }

            lastRealX = realX;
        }

        ctx.stroke();
    }
}