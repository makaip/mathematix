class GrapherController {
    constructor(grapher) {
        this.grapher = grapher;
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.grapher.canvas.addEventListener('wheel', (e) => this.handleMouseWheel(e));
        this.grapher.canvas.addEventListener('mousemove', (e) => this.handleMouseDrag(e));
        window.addEventListener('resize', () => this.handleResize());
    }

    handleMouseWheel(event) {
        /* zoom is broken idk what happened
        const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
        const centerX = this.grapher.canvas.width / 2;
        const centerY = this.grapher.canvas.height / 2;
        
        this.grapher.viewport.zoom(zoomFactor, centerX, centerY);
        this.grapher.grid.size *= zoomFactor;
        
        if (this.grapher.grid.size < 5) {
            this.grapher.grid.size = 5;
        } else if (this.grapher.grid.size > 100) {
            this.grapher.grid.size = 100;
        }
        
        this.grapher.render();
        */
    }

    handleMouseDrag(event) {
        if (event.buttons === 4 || (event.buttons === 1 && event.shiftKey)) {
            this.grapher.viewport.pan(event.movementX, event.movementY);
            this.grapher.render();
        }
    }

    handleResize() {
        this.grapher.resize();
    }
}