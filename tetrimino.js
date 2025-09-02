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

// Function that will choose a random tetrimino of the seven available, and a given orientation between 0 and 3.
// This function returns a random 2D-array of a random tetrimino shape in one of its four orientations.
export function generateRandomTetrimino() {
    const tetriminoKeys = Object.keys(TETRIMINOS);
    const chosenKeyIndex = Math.floor(Math.random() * tetriminoKeys.length);
    const chosenKey = tetriminoKeys[chosenKeyIndex]; // just to fetch the string. This will be used to get other rotations for this shape later
    const randomTetrimino = TETRIMINOS[chosenKey]; // Randomly select one of the seven tetrimino keys    
    const randomRotation = Math.floor(Math.random() * ROTATIONS); // Generate random number between 0 and 3
    const selectedTetriminoShape = (randomTetrimino.rotations)[randomRotation]; // Select the tetrimino's shape based on generated index
    const tetriminoColour = randomTetrimino.colour;

    return [selectedTetriminoShape, tetriminoColour, chosenKey, randomRotation];
}

export function drawBlock(block) {
    block.blockElement.style.backgroundColor = block.colour;
}

// Function to draw a tetrimino on the grid at a given position/rotation
// drawTetrimino needs to return an updated gridBlocks array with the state of the board now that the tetrimino has been drawn
export function drawTetrimino(tetriminoShape, colour, posRow, posCol, toBePlaced) {
    for (let row = 0; row < tetriminoShape.length; row++) { // For each row in the tetrimino's shape
        for (let col = 0; col < tetriminoShape[row].length; col++) { // For each column in that row
            if (tetriminoShape[row][col] === 1) {
                // Calculate the required row/column in the grid for the block to be drawn based on specified position on the grid
                const blockPosRow = posRow + row;
                const blockPosCol = posCol + col;
                const blockToDraw = gridBlocks[blockPosRow][blockPosCol];
                blockToDraw.colour = colour
                if (toBePlaced) {
                    blockToDraw.occupied = true;
                }
                drawBlock(blockToDraw);
            }
        }
    }
}

// Note that we need to check all blocks for collision
export function checkVerticalCollision(tetriminoShape, rowToCheck, colToCheck) {
    for (let row = 0; row < tetriminoShape.length; row++) {
        for (let col = 0; col < (tetriminoShape[row]).length; col++) {
            if (tetriminoShape[row][col] === 1) {
                const blockPosRow = rowToCheck + row;
                const blockPosCol = colToCheck + col;

                // If there is a vertical collision, the block must be placed.
                if ((blockPosRow + 1) >= GRID_ROWS) { // Means that we're at the bottom of the grid
                    return true;
                }
                else if ((gridBlocks[blockPosRow + 1][blockPosCol]).occupied === true) { // Means that there is an occupied block below
                    return true;
                }
            }
        }
    }
    return false;
}

// for this function, I thought I only needed to check the leftmost column of the shape, but it's actually the entire shape that needs to be checked
export function checkLeftCollision(tetriminoShape, rowToCheck, colToCheck) {
    for (let row = 0; row < tetriminoShape.length; row++) { // For each row in the tetrimino's shape
        for (let col = 0; col < tetriminoShape[row].length; col++) {
            if (tetriminoShape[row][col] === 1) {
                const blockPosRow = rowToCheck + row;
                const blockPosCol = colToCheck + col;

                if ((blockPosCol - 1) < 0) { // Means that we're at the leftmost column
                    return true;
                }
                else if ((gridBlocks[blockPosRow][blockPosCol - 1]).occupied === true) { // Means that there is an occupied block to the left
                    return true;
                }
            }
        }
    }
    // Check for vertical collision to ensure that the piece won't interfere with a neighbouring piece
    return checkVerticalCollision(tetriminoShape, rowToCheck, colToCheck);
}

export function checkRightCollision(tetriminoShape, rowToCheck, colToCheck) {
    for (let row = 0; row < tetriminoShape.length; row++) { // For each row in the tetrimino's shape
        for (let col = 0; col < tetriminoShape[row].length; col++) {        
            if (tetriminoShape[row][col] === 1) {
                const blockPosRow = rowToCheck + row;
                const blockPosCol = colToCheck + col;

                if ((blockPosCol + 1) >= GRID_COLS) { // Means that we're at the rightmost column
                    return true;
                }
                else if ((gridBlocks[blockPosRow][blockPosCol + 1]).occupied === true) { // Means that there is an occupied block to the left
                    return true;
                }
            }
        }    
    }
    return checkVerticalCollision(tetriminoShape, rowToCheck, colToCheck);
}

export function fetchNextRotation(tetriminoKey, currentRotation) {
    let tetrimino = TETRIMINOS[tetriminoKey];
    if (currentRotation === 3) {
        currentRotation = 0;
    }
    else {
        currentRotation++;
    }
    return (tetrimino.rotations[currentRotation]);
}