# mathematix
A nodeblock-based math webapp, designed to make the graphic calculator more accessible and easy to use!
<br> <br>
Have you ever found it difficult to use a graphing calculator because you couldn't remember mathematical formulas or their implementations? **Mathematix** removes the graphing knowledge barrier by simplifying formulas into a collection of *node blocks*, which can easily be connected to other blocks to create a visual math formula, all without requiring prior knowledge of how each functions works or is notated. See how you can simplify your math problems today by visiting [mathematix](https://makaip.github.io/mathematix/)!

## Usage

Users can right-click to open the context menu, where they can select from a variety of nodes to add to the canvas. Users can also press `Shift` + `A` to open the menu. Node blocks can also be added via a variety of hotkeys. For example:

 - **Input Nodes** can be added with `Shift` + `R`. 
 - **Function Nodes** can be added with `Shift` + `F`.
 - **Output Nodes** can be added with `Shift` + `C`.
 - **Variable Nodes** can be added with `Shift` + `V`.

 When connecting nodes together, a variable node and output node are nessecary. To cycle between different operations in the function node blocks, simply click the operation name. To delete a node block, you can simply select the desired node block to delete and use any of the following hotkeys:

  - **Regular Delete** can be done with `Backspace`
  - **Blender Delete** can be done with `x`
  - **(Neo)Vi(m) Delete** can be done with `d`

To pan around the editor or grapher, simply hold shift and drag. Dragging with the middle mouse wheel can also be used to pan. 

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
