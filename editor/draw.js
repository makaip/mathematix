function resizeCanvas() {
    canvas.style.width ='100%';
    canvas.style.height='100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    drawGrid();
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
}

function drawTop(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
}

function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke(); // use fill() if u want to fill the circle
}

function drawGrid() {
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvasWidth + 5, canvasHeight + 5);
    ctx.fillStyle = '#1d1d1d';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = '#282828';

    for (let y = offsetY % gridSize; y < canvasHeight; y += gridSize) {
        for (let x = offsetX % gridSize; x < canvasWidth; x += gridSize) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    if (isDraggingLine) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(lineStartX, lineStartY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }

    for (const nodeBlock of nodeBlocks) {
        for (const output of nodeBlock.outputs) {
            if (output.connection !== null) {
                let index = null;
                // Iterate through the object keys
                for (const key in output.connection.parent.inputs) {
                    if (output.connection.parent.inputs[key] === output.connection) {
                        index = key;
                        break;
                    }
                }
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(output.parent.x + 150 + offsetX, output.parent.y + 55 + offsetY);
                ctx.lineTo(output.connection.parent.x + offsetX, output.connection.parent.y + ( -25 * index ) + 200 - 30 + offsetY);
                ctx.stroke();
            }
        }
    }

    for (const nodeBlock of nodeBlocks) {
        nodeBlock.draw(ctx);
    }

    if (isDragging) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.rect(startX, startY, endX - startX, endY - startY);
        ctx.fill();
        ctx.stroke();
    }

    if (isMenuVisible) {
        ctx.fillStyle = '#181818';
        const menuWidth = 150;
        const menuHeight = menuItems.length * 30 + 10;
        const cornerRadius = 5;
        drawRoundedRect(ctx, menuX, menuY, menuWidth, menuHeight, cornerRadius);
        ctx.fill();
        
        ctx.fillStyle = 'white';
        ctx.font = '16px Poppins';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        menuItems.forEach((item, index) => {
            ctx.fillText(item, menuX + 10, menuY + 30 * (index + 1));
        });
    }
}