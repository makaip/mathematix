# mathematix
 **A nodeblock-based math webapp, designed to make the graphic calculator more accessible and easy to use!**

## [The Editor](https://github.com/makaip/mathematix/tree/main/editor)
This project consists of a number of different functions that serve to render all of the elements of the canvas, which draws the objects that are seen. A few of them are listed below.

### Editor Rendering
All the different rendering functions are contained within the `draw.js` file, which is responsible for rendering everything in the editor.

 - `drawRoundedRect(ctx, x, y, width, height, radius)` draws rounded rectangles for nodes, menus, and other items.

 - `drawTop(ctx, x, y, width, height, radius)` draws the tops of the nodes.

 - `drawCircle(ctx, x, y, radius)` draws all the different nodules for connections to be made

 - `drawGrid()` is called on any modification event (movement of canvas, mousedown, onclick, etc.) and is responsible for drawing backgrounds, node connections, box selection, and nodeblocks. 

### Events and Actions
All the different events and actions are handled in [`actions.js`](https://github.com/makaip/mathematix/blob/main/editor/actions.js), which is responsible for the creation and destruction of nodeblocks, and [`events.js`](https://github.com/makaip/mathematix/blob/main/editor/events.js), which is responsible for handling user input, such as clicking and dragging.

Events.js also handles mathematical operation selection (for example, generating new variables or trigonometric functions), based on the nodes that the user selects, and then works in conjunction with actions.js to develop the new nodes.

## Graph Rendering

sdghfksjdhfg will finish later or smthign idk
