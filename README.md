# mathematix
 A nodeblock-based math webapp.

## The Editor
Ok so basically there are a bunch of different functions for rendering all the elements of the canvas.

### Editor Rendering
All the different rendering functions are contained within the `draw.js` file, which is responsible for rendering everything in the editor.

 - `drawRoundedRect(ctx, x, y, width, height, radius)` draws rounded rectangles for nodes, menus, and other items.

 - `drawTop(ctx, x, y, width, height, radius)` draws the tops of the nodes.

 - `drawCircle(ctx, x, y, radius)` draws all the different nodules for connections to be made

 - `drawGrid()` is called on any modification event (movement of canvas, mousedown, onclick, etc.) and is responsible for drawing backgrounds, node connections, box selection, and nodeblocks. 

### Events and Actions
All the different events and actions are handled in `actions.js`, which is responsible for the creation and destruction of nodeblocks, and `events.js`, which is responsible for handling user input.

idk what happens in events.js, as it is entirely spahgetti code. no one goes down there anymore.

## Graph Rendering

sdghfksjdhfg will finish later or smthign idk