// Function to draw the infinite grid and axes
function drawGridRenderer() {
    rctx.clearRect(0, 0, rcanvasWidth, rcanvasHeight);

    // Set background color to dark gray
    rctx.fillStyle = '#1d1d1d'; // Dark gray
    rctx.fillRect(0, 0, rcanvasWidth, rcanvasHeight);

    // Set grid line color to #282828
    rctx.strokeStyle = '#282828'; // Darker gray
    rctx.lineWidth = 1;

    // Draw vertical grid lines
    for (let x = -rgridSize; x < rcanvasWidth; x += rgridSize) {
        rctx.beginPath();
        rctx.moveTo(x - roffsetX % rgridSize, 0);
        rctx.lineTo(x - roffsetX % rgridSize, rcanvasHeight);
        rctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = -rgridSize; y < rcanvasHeight; y += rgridSize) {
        rctx.beginPath();
        rctx.moveTo(0, y - roffsetY % rgridSize);
        rctx.lineTo(rcanvasWidth, y - roffsetY % rgridSize);
        rctx.stroke();
    }

    // Draw X-axis
    rctx.strokeStyle = '#fff'; // Red
    rctx.lineWidth = 2;
    rctx.beginPath();
    rctx.moveTo(0, rcanvasHeight / 2 - roffsetY);
    rctx.lineTo(rcanvasWidth, rcanvasHeight / 2 - roffsetY);
    rctx.stroke();

    // Draw Y-axis
    rctx.strokeStyle = '#fff'; // Green
    rctx.lineWidth = 2;
    rctx.beginPath();
    rctx.moveTo(rcanvasWidth / 2 - roffsetX, 0);
    rctx.lineTo(rcanvasWidth / 2 - roffsetX, rcanvasHeight);
    rctx.stroke();

    rctx.strokeStyle = '#00C49A'; // Purple color for function plots
    rctx.lineWidth = 2.25;

    for (const funcString of functionsToPlot) {
        rctx.beginPath();

        // Plot the function points within the canvas bounds
        for (let x = 0; x < rcanvasWidth; x++) {
            const realX = x - rcanvasWidth / 2 + roffsetX;
            const realY = -evaluateFunction(funcString, realX) + rcanvasHeight / 2 - roffsetY;

            if (x === 0) {
                rctx.moveTo(x, realY);
            } else {
                rctx.lineTo(x, realY);
            }
        }

        rctx.stroke();
    }
}