export const GRID_ROWS = 20;
export const GRID_COLS = 10;
const WHITE = "#FFFFFF";
import {drawBlock} from "./tetrimino.js";

// For number of rows and columns specified, appends that many blocks to the grid element
// This function returns the 2D array of blocks that make up the grid for external use
export function initialiseGrid(rows, cols, grid) {
    let gridBlocks = []; // Array to hold each row of blocks

    for (let row = 0; row < rows; row++) {
        let rowBlocks = []; // Array to hold each block in the current row

        for (let col = 0; col < cols; col++) {
            let blockElement = document.createElement("div");
            blockElement.classList.add("block");
            grid.appendChild(blockElement);
            let block = {blockElement: blockElement, occupied: false};
            rowBlocks.push(block);
        }
        gridBlocks.push(rowBlocks);
    }
    return gridBlocks;
}

// This functions takes our 2D-array of blocks and resets them all to the default colour (white).
// Note that clearGrid does not "clear" the grid by removing blocks, it simply resets their colour.
export function clearGrid(gridBlocks) {
    for (let row in gridBlocks) {
        for (let blockObject in row) {
            blockObject.occupied = false;
            drawBlock(blockObject.blockElement, WHITE);
        }
    }
}