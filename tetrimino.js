import {GRID_ROWS, GRID_COLS} from "./grid.js";

// Hex colour values for each tetrimino
const TURQUOISE = "#40e0d0ff";
const BLUE      = "#0000ff";
const ORANGE    = "#ffa500";
const YELLOW    = "#ffff00";
const GREEN     = "#00ff00";
const PURPLE    = "#800080";
const RED       = "#ff0000";

// Below is an exported object containing each tetrimino's four rotation states and corresponding colour.
// Each rotation state is represented by a 2D-array, where 1 indicates the presence of a block.
export const TETRIMINOS = {
    I: {
        rotations: [[[0, 0, 0, 0],
                     [1, 1, 1, 1],
                     [0, 0, 0, 0],
                     [0, 0, 0, 0]],
                    [[0, 0, 1, 0],
                     [0, 0, 1, 0],
                     [0, 0, 1, 0],
                     [0, 0, 1, 0]],
                    [[0, 0, 0, 0],
                     [0, 0, 0, 0],
                     [1, 1, 1, 1],
                     [0, 0, 0, 0]],
                    [[0, 1, 0, 0],
                     [0, 1, 0, 0],
                     [0, 1, 0, 0],
                     [0, 1, 0, 0]]],
        colour: TURQUOISE
    },

    J: {
        rotations: [[[1, 0, 0],
                     [1, 1, 1],
                     [0, 0, 0]],
                    [[0, 1, 1],
                     [0, 1, 0],
                     [0, 1, 0]],
                    [[0, 0, 0],
                     [1, 1, 1],
                     [0, 0, 1]],
                    [[0, 1, 0],
                     [0, 1, 0],
                     [1, 1, 0]]],
        colour: BLUE
    },

    L: {
        rotations: [[[0, 0, 1],
                     [1, 1, 1],
                     [0, 0, 0]],
                    [[0, 1, 0],
                     [0, 1, 0],
                     [0, 1, 1]],
                    [[0, 0, 0],
                     [1, 1, 1],
                     [1, 0, 0]],
                    [[1, 1, 0],
                     [0, 1, 0],
                     [0, 1, 0]]],
        colour: ORANGE
    },

    O: {
        rotations: [[[1, 1],
                     [1, 1]],
                    [[1, 1],
                     [1, 1]],
                    [[1, 1],
                     [1, 1]],
                    [[1, 1],
                     [1, 1]]],
        colour: YELLOW
    },

    S: {
        rotations: [[[0, 1, 1],
                     [1, 1, 0],
                     [0, 0, 0]],
                    [[0, 1, 0],
                     [0, 1, 1],
                     [0, 0, 1]],
                    [[0, 0, 0],
                     [0, 1, 1],
                     [1, 1, 0]],
                    [[1, 0, 0],
                     [1, 1, 0],
                     [0, 1, 0]]],
        colour: GREEN
    },

    T: {
        rotations: [[[0, 1, 0],
                     [1, 1, 1],
                     [0, 0, 0]],
                    [[0, 1, 0],
                     [0, 1, 1],
                     [0, 1, 0]],
                    [[0, 0, 0],
                     [1, 1, 1],
                     [0, 1, 0]],
                    [[0, 1, 0],
                     [1, 1, 0],
                     [0, 1, 0]]],
        colour: PURPLE
    },

    Z: {
        rotations: [[[1, 1, 0],
                     [0, 1, 1],
                     [0, 0, 0]],
                    [[0, 0, 1],
                     [0, 1, 1],
                     [0, 1, 0]],
                    [[0, 0, 0],
                     [1, 1, 0],
                     [0, 1, 1]],
                    [[0, 1, 0],
                     [1, 1, 0],
                     [1, 0, 0]]],
        colour: RED
    },
}

function drawBlock(blockRow, blockCol, blockColour, gridBlocks) {
    let block = gridBlocks[blockRow][blockCol];
    console.log(block);
    block.style.backgroundColor = blockColour;
}

// Function to draw a tetrimino on the grid at a given position/rotation
export function drawTetrimino(tetrimino, rotationIndex, posRow, posCol, gridBlocks) {
    const shape = tetrimino.rotations[rotationIndex];
    
    for (let row = 0; row < shape.length; row++) { // For each row in the tetrimino's shape
        for (let col = 0; col < shape[row].length; col++) { // For each column in that row
            if (shape[row][col] === 1) {
                // Calculate the corresponding row/column in the grid based on desired position
                const gridPosRow = posRow + row;
                const gridPosCol = posCol + col;
                
                // Check if the calculated position is within the grid boundaries
                if ((gridPosRow >= 0 && gridPosRow < GRID_ROWS) && (gridPosCol >= 0 && gridPosCol < GRID_COLS)) {
                    drawBlock(gridPosRow, gridPosCol, tetrimino.colour, gridBlocks);
                }   
            }    
        }
    }
}