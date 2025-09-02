import {drawBlock} from "./tetrimino.js";
const WHITE = "#FFFFFF";
export const GRID_ROWS = 20;
export const GRID_COLS = 10;

// For number of rows and columns specified, append that many blocks to the grid element.
// This is done by pushing rows of blocks to a 2D array that make up the grid.
// These blocks are used to capture the state of the grid at any given time.
export function initialiseGrid(gridRows, gridCols, grid) {
    for (let gridRow = 0; gridRow < gridRows; gridRow++) {
        const rowBlocks = []; // Array to temporarily hold each block in the current row.

        for (let gridCol = 0; gridCol < gridCols; gridCol++) {
            const blockElement = document.createElement("div");
            blockElement.classList.add("block");
            grid.appendChild(blockElement);

            // Create a block object that will hold necessary properties of each block.
            const blockObject = {blockElement: blockElement, occupied: false, colour: WHITE};

            rowBlocks.push(blockObject);
        }
        gridBlocks.push(rowBlocks);
    }
}

// Resets all blocks to their default colour (white) if they are not occupied.
// Note that the clearGrid function does not "clear" the grid by removing blocks, it simply resets their colour and sets their occupied value to false.
export function clearGrid() {
    for (let gridRow = 0; gridRow < gridBlocks.length; gridRow++) {
        for (let gridCol = 0; gridCol < gridBlocks[gridRow].length; gridCol++) {
            const blockObject = gridBlocks[gridRow][gridCol];
            if (blockObject.occupied === false) {
                blockObject.colour = WHITE;
                drawBlock(blockObject);
            }            
        }
    }    
}

// Using the gridBlocks array, renderGrid draws any occupied blocks to the grid to update it to the latest state.
export function renderGrid() {
    for (let gridRow = 0; gridRow < gridBlocks.length; gridRow++) {
        for (let gridCol = 0; gridCol < (gridBlocks[gridRow]).length; gridCol++) {
            const blockToRender = gridBlocks[gridRow][gridCol].blockElement;
            if (blockToRender.occupied) {
                drawBlock(blockToRender);
            }
        }
    }
}