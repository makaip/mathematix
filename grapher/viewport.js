class Viewport {
    constructor() {
        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = 0.025;
    }

    pan(dx, dy) {
        this.offsetX -= dx;
        this.offsetY -= dy;
    }

    zoom(factor, centerX, centerY) {
        this.offsetX = (this.offsetX - centerX) * factor + centerX;
        this.offsetY = (this.offsetY - centerY) * factor + centerY;
    }

    screenToWorld(x, y, canvasWidth, canvasHeight) {
        const worldX = (x - canvasWidth / 2 + this.offsetX) * this.scale;
        const worldY = -(y - canvasHeight / 2 + this.offsetY) * this.scale;
        return { x: worldX, y: worldY };
    }

    worldToScreen(x, y, canvasWidth, canvasHeight) {
        const screenX = x / this.scale + canvasWidth / 2 - this.offsetX;
        const screenY = -y / this.scale + canvasHeight / 2 - this.offsetY;
        return { x: screenX, y: screenY };
    }
}