import {drawBlock} from "./tetrimino.js";
const WHITE = "#FFFFFF";
export const GRID_ROWS = 20;
export const GRID_COLS = 10;
global.gridBlocks = []; // GLOBAL array to hold each block on the grid

// For number of rows and columns specified, appends that many blocks to the grid element
// This function returns the 2D array of blocks that make up the grid for use in other modules
export function initialiseGrid(rows, cols, grid) {
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
}

// This functions takes our 2D-array of blocks and resets them all to the default colour (white).
// Note that clearGrid does not "clear" the grid by removing blocks, it simply resets their colour and sets their occupied value to false
export function clearGrid(gridBlocks) {
    for (let row = 0; row < gridBlocks.length; row++) {
        for (let col = 0; col < gridBlocks[row].length; col++) {
            let blockObject = gridBlocks[row][col];
            blockObject.occupied = false;
            drawBlock(blockObject.blockElement, WHITE);
        }
    }    
}