export const GRID_ROWS = 20;
export const GRID_COLS = 10;
const WHITE = "#FFFFFF";

// For number of rows and columns specified, appends that many blocks to the grid element
// This function returns the 2D array of blocks that make up the grid for external use
export function initialiseGrid(rows, cols, grid) {
    let gridBlocks = []; // Array to hold each row of blocks

    for (let row = 0; row < rows; row++) {
        let rowBlocks = []; // Array to hold each block in the current row

        for (let col = 0; col < cols; col++) {
            let block = document.createElement("div");
            block.classList.add("block");
            grid.appendChild(block);
            rowBlocks.push(block);
        }
        gridBlocks.push(rowBlocks);
    }
    return gridBlocks;
}

// This functions takes our 2D-array of blocks and resets them all to the default colour (white).
// Note that clearGrid does not "clear" the grid by removing blocks, it simply resets their colour.
export function clearGrid(gridBlocks) {
    for (let row of gridBlocks) {
        for (let col of row) {
            drawBlock(row, col, WHITE, gridBlocks);
        }
    }
}

export function descendTetrimino(gridBlocks) {
    // start by clearing grid so that the tetrimino can be drawn in its new position without leaving a trail.
    clearGrid(gridBlocks);
    
}