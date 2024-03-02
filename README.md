# mathematix
A nodeblock-based math webapp, designed to make the graphic calculator more accessible and easy to use!

![image](https://github.com/makaip/mathematix/assets/98898166/3f581f15-5e96-402a-bdbc-c68c58e43e32)

## Website

You can view the website running the code at [makaip.github.io/mathematix]()

## Usage

Users can right-click to open the context menu, where they can select from a variety of nodes to add to the canvas.

### Example Graph `y = sin(x) - 5`

Let's create a simple graph, `y = sin(x) - 5`.

The first for any graph is to create an `output` node, which will display the contents of the graph. To do this, right click to open the context menu. Then click on `Output` to add an output node to the canvas.

![image](https://github.com/makaip/mathematix/assets/98898166/d2d80d0f-d21a-40c4-ad91-8265ef1d6237)

Now, we need to make our graph. Mathematix includes 17 mathematical functions, as well as the variable `x` and numerical constants (e.g., 1, 2, 3, etc.), which allow for a diverse range of graphs to be created. 

This graph need one arithmetic node for subtraction, one trigonometry node for sine, one variable node for `x`, and one input node for the number `5`. After using the context menu to create these nodes, it should look like the following:

![image](https://github.com/makaip/mathematix/assets/98898166/55968581-4722-4222-9079-7ea2ec05adf2)

The final step is to connect the nodes together. To do this, drag the nodules from the right side of each node to the left side of the next node. The final graph should look like the following:

![image](https://github.com/makaip/mathematix/assets/98898166/05c55784-1577-4826-a577-e68e6901fcfe)

Finally, we need to click the box showing `Add` in the arithmetic node to switch it to subtraction. 

![image](https://github.com/makaip/mathematix/assets/98898166/5f5ac6da-0c98-4810-9e73-1f6490027df7)

If you want to continue experimenting with the graph, try changing the operation types (by clicking "Sine" or "Subtract") or adding more nodes. Thank you for following!

## Hotkeys & More Actions

To pan around the editor or graph, simply `Middle Click` or use `Shift` + `Left Click` and drag.

| Action            | Hotkey        |
|-------------------|---------------|
| Open Context Menu | `Shift` + `A` |
|                   |               |
| Add Input Node    | `Shift` + `R` |
| Add Function Node | `Shift` + `F` |
| Add Output Node   | `Shift` + `C` |
| Add Variable Node | `Shift` + `V` |


 To delete a node block, you can simply select the desired node block (it should have a green outline) then use any of the following hotkeys:

| Deletion Action         | Key                         |
|-------------------------|-----------------------------|
| Regular Delete          | `Delete` key or `Backspace` |
| Blender-Style Delete    | `x`                         |
| (Neo)Vi(m)-Style Delete | `d`                         |


