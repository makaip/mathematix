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
    ctx.stroke(); // You can also use fill() if you want to fill the circle
}

function drawGrid() {
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvasWidth + 5, canvasHeight + 5);

    // Set background color to dark gray
    ctx.fillStyle = '#1d1d1d'; // Dark gray
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Set dot color to #282828
    ctx.fillStyle = '#282828'; // Darker gray

    // Calculate the number of dots to draw based on the canvas size and gridSize
    const numHorizontalDots = Math.ceil(canvasWidth / gridSize);
    const numVerticalDots = Math.ceil(canvasHeight / gridSize);

    // Draw dots at grid intersections
    for (let y = offsetY % gridSize; y < canvasHeight; y += gridSize) {
        for (let x = offsetX % gridSize; x < canvasWidth; x += gridSize) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    //NODEBLOCKS

    for (const nodeBlock of nodeBlocks) {
        const x = nodeBlock.x + offsetX;
        const y = nodeBlock.y + offsetY;
        const blockWidth = 150; // Replace with the width of your node block
        const blockHeight = 200; // Replace with the height of your node block
        
        // Draw a rounded rectangle representing the node block
        ctx.fillStyle = '#343434'; // Replace with the color you want for node blocks
        if (nodeBlock === selectedNodeBlock) {
            ctx.strokeStyle = '#00C49A'; // Outline color for selected node block
            ctx.lineWidth = 2; // Outline width
        } else {
            ctx.strokeStyle = '#141414'; // No outline for unselected node blocks
        }
        drawRoundedRect(ctx, x, y, blockWidth, blockHeight, 5); // Adjust cornerRadius as needed
        ctx.fill();
        ctx.stroke();

        drawTop(ctx, x, y, blockWidth, 30, 5); // Adjust cornerRadius as needed
        ctx.fillStyle = '#00C49A';
        ctx.fill();

        ctx.fillStyle = 'white'; // Text color
        ctx.font = '16px Poppins';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText(nodeBlock.type, x + 10, y + 25);

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#141414';
        ctx.fillStyle = '#9f9f9f';

        nodeBlock.inputs.forEach(function (item, index) {
            drawCircle(ctx, x + 1, y + ( 25 * index ) + 55, 6);
            ctx.fill();
            ctx.stroke();
        })
        
        nodeBlock.outputs.forEach(function (item, index) {
            drawCircle(ctx, x + 149, y + ( 25 * index ) + 55, 6);
            ctx.fill();
            ctx.stroke();
        })
    }

    ///SELECTION

    // Draw the selection box
    if (isDragging) {
        ctx.strokeStyle = 'white'; // Box border color
        ctx.lineWidth = 2;

        // Set the fill color with transparency (RGBA)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Very transparent white
        ctx.beginPath();
        ctx.rect(startX, startY, endX - startX, endY - startY);
        ctx.fill();
        ctx.stroke();
    }

    // Draw the menu with rounded corners
    if (isMenuVisible) {
        ctx.fillStyle = '#181818'; // Menu background color
        const menuWidth = 150;
        const menuHeight = menuItems.length * 30 + 10;
        const cornerRadius = 5; // Adjust as needed
        drawRoundedRect(ctx, menuX, menuY, menuWidth, menuHeight, cornerRadius);
        ctx.fill();
        
        ctx.fillStyle = 'white'; // Text color
        ctx.font = '16px Poppins';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        menuItems.forEach((item, index) => {
            ctx.fillText(item, menuX + 10, menuY + 30 * (index + 1));
        });
    }
}