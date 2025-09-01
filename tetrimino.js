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

                    [[1],
                     [1],
                     [1],
                     [1]],

                    [[1, 1, 1, 1]],

                    [[1],
                     [1],
                     [1],
                     [1]]],
        colour: TURQUOISE
    },

    J: {
        rotations: [[[1, 0, 0],
                     [1, 1, 1]],

                    [[1, 1],
                     [1, 0],
                     [1, 0]],

                    [[1, 1, 1],
                     [0, 0, 1]],

                    [[0, 1],
                     [0, 1],
                     [1, 1]]],
        colour: BLUE
    },

    L: {
        rotations: [[[0, 0, 1],
                     [1, 1, 1]],

                    [[1, 0],
                     [1, 0],
                     [1, 1]],

                    [[1, 1, 1],
                     [1, 0, 0]],

                    [[1, 1],
                     [0, 1],
                     [0, 1]]],
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
                     [1, 1, 0]],

                    [[1, 0],
                     [1, 1],
                     [0, 1]],

                    [[0, 1, 1],
                     [1, 1, 0]],

                    [[1, 0],
                     [1, 1],
                     [0, 1]]],
        colour: GREEN
    },

    T: {
        rotations: [[[0, 1, 0],
                     [1, 1, 1]],

                    [[1, 0],
                     [1, 1],
                     [1, 0]],

                    [[1, 1, 1],
                     [0, 1, 0]],

                    [[0, 1],
                     [1, 1],
                     [0, 1]]],
        colour: PURPLE
    },

    Z: {
        rotations: [[[1, 1, 0],
                     [0, 1, 1]],

                    [[0, 1],
                     [1, 1],
                     [1, 0]],

                    [[1, 1, 0],
                     [0, 1, 1]],
                        
                    [[0, 1],
                     [1, 1],
                     [1, 0]]],
        colour: RED
    },
}

export function drawBlock(block) {
    block.blockElement.style.backgroundColor = block.colour;
}

// Returns a tuple that can be used to determine where (if any) collisions are occurring
function isValidBlockToOccupy(row, col) {
    return (checkVerticalCollision(row, col) && checkHorizontalLeftCollision(row, col) && checkHorizontalRightCollision(row, col));
}

// Function to draw a tetrimino on the grid at a given position/rotation
// drawTetrimino needs to return an updated gridBlocks array with the state of the board now that the tetrimino has been drawn
export function drawActiveTetrimino(tetriminoShape, colour, posRow, posCol) {
    for (let row = 0; row < tetriminoShape.length; row++) { // For each row in the tetrimino's shape
        for (let col = 0; col < tetriminoShape[row].length; col++) { // For each column in that row
            if (tetriminoShape[row][col] === 1) {
                // Calculate the required row/column in the grid for the block to be drawn based on specified position on the grid
                const blockPosRow = posRow + row;
                const blockPosCol = posCol + col;
                const blockToDraw = gridBlocks[blockPosRow][blockPosCol];
                blockToDraw.colour = colour
                
                // Check if the calculated position is already occupied
                if (isValidBlockToOccupy(blockToDraw, blockPosRow, blockPosCol)) {
                    blockToDraw.occupied = true; // Mark the block as occupied
                    drawBlock(blockToDraw); // Draw the block on the grid
                }
                // TODO: Handle case where part of tetrimino is out of bounds (e.g., at top or sides of grid)
            }
        }
    }
}

// Function that will choose a random tetrimino of the seven available, and a given orientation between 0 and 3.
// This function returns a random 2D-array of a random tetrimino shape in one of its four orientations.
export function generateRandomTetrimino() {
    const tetriminoKeys = Object.keys(TETRIMINOS);
    const randomTetrimino = TETRIMINOS[tetriminoKeys[Math.floor(Math.random() * tetriminoKeys.length)]]; // Randomly select one of the seven tetrimino keys    
    const randomRotation = Math.floor(Math.random() * ROTATIONS); // Generate random number between 0 and 3
    const selectedTetriminoShape = (randomTetrimino.rotations)[randomRotation]; // Select the tetrimino's shape based on generated index
    const tetriminoColour = randomTetrimino.colour;

    return [selectedTetriminoShape, tetriminoColour];
}

function checkVerticalCollision(blockPosRow, blockPosCol) {
    // If there is a vertical collision, the block must be placed.
    if ((blockPosRow + 1) < GRID_ROWS) { // Means that we're NOT at the bottom of the grid yet
        if ((gridBlocks[blockPosRow + 1][blockPosCol]).occupied === false) { // Means that there is NOT an occupied block below
            return false
        }
    }
    return true
}

// The horizontal collisions mean that the block is not allowed to move the corresponding direction (since there is something already there)
function checkHorizontalLeftCollision(blockPosRow, blockPosCol) {
    if ((blockPosCol - 1) > 0) { // Means that we're NOT at the leftmost column
        if ((gridBlocks[blockPosRow][blockPosCol - 1]).occupied === false) { // Means that there is NOT an occupied block to the left
            return false
        }
    }
    return true
}

function checkHorizontalRightCollision(blockPosRow, blockPosCol) {
    if ((blockPosCol + 1) < GRID_COLS) { // Means that we're NOT at the rightmost column
        if ((gridBlocks[blockPosRow][blockPosCol + 1]).occupied === false) { // Means that there is NOT an occupied block to the right
            return false
        }
    }
    return true
}