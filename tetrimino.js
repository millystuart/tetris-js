import {GRID_ROWS, GRID_COLS} from "./grid.js";

// Hex colour values for each tetrimino
const TURQUOISE = "#c3eee8ff";
const BLUE      = "#97d3fcff";
const ORANGE    = "#f8d799ff";
const YELLOW    = "#f5f5b7ff";
const GREEN     = "#a5f595ff";
const PURPLE    = "#e2bbfcff";
const RED       = "#ffbebeff";

const ROTATIONS = 4; // Each tetrimino will always four rotation states (0, 90, 180, 270 degrees)

// Below is an exported object containing each tetrimino's four rotation states and corresponding colour.
// Each rotation state is represented by a 2D-array, where 1 indicates the presence of a block.
const TETRIMINOS = {
    I: {
        rotations: [[[1, 1, 1, 1]],

                    [      [1],
                           [1],
                           [1],
                           [1]   ],

                    [[1, 1, 1, 1]],

                    [   [1],
                        [1],
                        [1],
                        [1]      ]],
        colour: TURQUOISE
    },

    J: {
        rotations: [[[1],
                     [1, 1, 1]],

                    [[1, 1],
                     [1],
                     [1]      ],

                    [[1, 1, 1],
                           [1]],

                    [   [1],
                        [1],
                     [1, 1]   ]],
        colour: BLUE
    },

    L: {
        rotations: [[      [1],
                     [1, 1, 1]],

                    [   [1],
                        [1],
                        [1, 1]],

                    [[1, 1, 1],
                     [1]      ],

                    [[1, 1],
                        [1],
                        [1]   ]],
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
        rotations: [[   [1, 1],
                     [1, 1]   ],

                    [   [1],
                        [1, 1],
                           [1]],

                    [   [1, 1],
                     [1, 1]   ],

                    [[1],
                     [1, 1],
                        [1]   ]],
        colour: GREEN
    },

    T: {
        rotations: [[   [1],
                     [1, 1, 1]],

                    [   [1],
                        [1, 1],
                        [1]   ],

                    [[1, 1, 1],
                        [1]   ],

                    [   [1],
                     [1, 1],
                        [1]   ]],
        colour: PURPLE
    },

    Z: {
        rotations: [[[1, 1],
                        [1, 1]],

                    [      [1],
                        [1, 1],
                        [1]   ],

                    [[1, 1],
                        [1, 1]],
                        
                    [   [1],
                     [1, 1],
                     [1]      ]],
        colour: RED
    },
}

function drawBlock(block, blockColour) {
    block.style.backgroundColor = blockColour;
}

function isValidBlockToOccupy(gridBlock, row, col) {
    if ((row >= 0 && row < GRID_ROWS) && (col >= 0 && col < GRID_COLS)) { // check if the block is within the grid boundaries
        if (!gridBlock.occupied) { // check if the block is already occupied
            return true;
        }
    }
    return false;
}

// Function to draw a tetrimino on the grid at a given position/rotation
// drawTetrimino needs to return an updated gridBlocks array with the state of the board now that the tetrimino has been drawn
export function drawTetrimino(tetriminoShape, colour, posRow, posCol, gridBlocks) {    
    for (let row = 0; row < tetriminoShape.length; row++) { // For each row in the tetrimino's shape
        for (let col = 0; col < tetriminoShape[row].length; col++) { // For each column in that row
            if (tetriminoShape[row][col] === 1) {
                // Calculate the required row/column in the grid for the block to be drawn based on specified position on the grid
                const blockPosRow = posRow + row;
                const blockPosCol = posCol + col;
                const blockToDraw = gridBlocks[blockPosRow][blockPosCol];
                
                // Check if the calculated position is already occupied
                if (isValidBlockToOccupy(blockToDraw, blockPosRow, blockPosCol)) {
                    blockToDraw.occupied = true; // Mark the block as occupied
                    drawBlock(blockToDraw.blockElement, colour, gridBlocks); // Draw the block on the grid
                }
                // TODO: Handle case where part of tetrimino is out of bounds (e.g., at top or sides of grid)
            }
        }
    }
    return gridBlocks; // return the state of gridBlocks after drawing the tetrimino
}

// Function that will choose a random tetrimino of the seven available, and a given orientation between 0 and 3.
// This function returns a random 2D-array of a random tetrimino shape in one of its four orientations.
export function generateRandomTetrimino() {
    const tetriminoKeys = Object.keys(TETRIMINOS);
    const randomTetriminoKey = tetriminoKeys[Math.floor(Math.random() * tetriminoKeys.length)]; // Randomly select one of the seven tetrimino keys
    const randomRotation = Math.floor(Math.random() * ROTATIONS); // Generate random number between 0 and 3
    const randomTetriminoShape = TETRIMINOS[randomTetriminoKey].rotations[randomRotation]; // Select the tetrimino's shape based on generated values
    const tetriminoColour = TETRIMINOS[randomTetriminoKey].colour;

    return [randomTetriminoShape, tetriminoColour];
}