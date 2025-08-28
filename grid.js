export let gridBlocks = []; // Array holding each block in the grid

// For number of rows and columns specified, appends that many blocks to the grid element
export function initialiseGrid(rows, cols, grid) {
    for (let row = 0; row < rows; row++) {
        let rowBlocks = []; // Array to hold each block in the current row

        for (let col = 0; col < cols; col++) {
            let block = document.createElement("div");
            block.classList.add("block");
            grid.appendChild(block);
            rowBlocks.push(block);
        }
        rowBlocks.push(gridBlocks); // Add the final row to the gridBlocks array
    }
}