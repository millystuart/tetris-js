import {GRID_ROWS, GRID_COLS} from "./grid.js";

// Hex colour constants for each tetrimino.
const TURQUOISE = "#c3eee8ff";
const BLUE      = "#97d3fcff";
const ORANGE    = "#f8d799ff";
const YELLOW    = "#f5f5b7ff";
const GREEN     = "#a5f595ff";
const PURPLE    = "#e2bbfcff";
const RED       = "#ffbebeff";

// Each tetrimino will always four rotation states (0, 90, 180, 270 degrees)
const ROTATIONS = 4;

// TETRIMINOS object contains each tetrimino's four rotation states and corresponding colour.
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

// Chooses a random tetrimino of the seven available, and a given orientation between 0 and 3.
// This function returns an array containing the shape of the chosen tetrimino in its orientation (2D-array of 1s and 0s),
// its corresponding colour (e.g. PURPLE), the key (e.g. "J") and the chosen rotation (0-3).
export function generateRandomTetrimino() {
    const tetriminoKeys = Object.keys(TETRIMINOS); // ["I", "J", "L" etc...]
    const chosenKeyIndex = Math.floor(Math.random() * tetriminoKeys.length); // Number between 0-6.
    
    // Fetches the string key. This will be used to get other rotations for this shape later.
    const chosenKey = tetriminoKeys[chosenKeyIndex];
    
    // Holds the chosen tetrimino OBJECT.
    const chosenTetrimino = TETRIMINOS[chosenKey];

    const chosenRotation = Math.floor(Math.random() * ROTATIONS); // Number between 0 and 3.
    
    // Select the tetrimino's shape based on generated index
    const chosenTetriminoShape = (chosenTetrimino.rotations)[chosenRotation];

    const tetriminoColour = chosenTetrimino.colour;

    return [chosenTetriminoShape, tetriminoColour, chosenKey, chosenRotation];
}

// Graphical function that changes the colour of a passed block element to its required colour.
export function drawBlock(blockObject) {
    blockObject.blockElement.style.backgroundColor = blockObject.colour;
}

// Draws a tetrimino on the grid at a given position/rotation.
// Also takes a toBePlaced boolean to determine whether to set the occupied property to true or not.
export function drawTetrimino(tetriminoShape, colour, posRow, posCol, toBePlaced) {
    for (let row = 0; row < tetriminoShape.length; row++) {
        for (let col = 0; col < tetriminoShape[row].length; col++) {
            if (tetriminoShape[row][col] === 1) { // In other words, is there a block?
                // Calculate the required row/column in the grid for the block to be drawn based on specified position on the grid
                const blockPosRow = posRow + row;
                const blockPosCol = posCol + col;

                // Find the block object to be drawn in gridBlocks
                const blockToDraw = gridBlocks[blockPosRow][blockPosCol];

                // Reassign colour to the desired colour passed into drawTetrimino.
                blockToDraw.colour = colour;

                // Set occupied property to true if the tetrimino is being placed onto the grid.
                toBePlaced ? blockToDraw.occupied = true : blockToDraw.occupied = false;
                
                drawBlock(blockToDraw);
            }
        }
    }
}

// For each block of the tetrimino, check that it doesn't exceed the vertical bounds of the grid or collide with another placed tetrimino.
export function checkVerticalCollision(tetriminoShape, rowToCheck, colToCheck) {
    for (let row = 0; row < tetriminoShape.length; row++) {
        for (let col = 0; col < (tetriminoShape[row]).length; col++) {
            if (tetriminoShape[row][col] === 1) {
                // Calculate the projected position of the block on the grid relative to the rowToCheck and colToCheck.
                const blockPosRow = rowToCheck + row;
                const blockPosCol = colToCheck + col;

                // If a vertical collision is detected, the block must be placed.
                if ((blockPosRow + 1) >= GRID_ROWS) { // Meaning that piece is at the bottom of the grid
                    return true;
                }
                else if ((gridBlocks[blockPosRow + 1][blockPosCol]).occupied === true) { // Meaning that there is an occupied block below.
                    return true;
                }
            }
        }
    }
    return false;
}

// Upon a movement left, check if the piece is trying to move to an invalid position and colliding with something to the left.
export function checkLeftCollision(tetriminoShape, rowToCheck, colToCheck) {
    for (let row = 0; row < tetriminoShape.length; row++) {
        for (let col = 0; col < tetriminoShape[row].length; col++) {
            if (tetriminoShape[row][col] === 1) {
                // Calculate the projected position of the block on the grid relative to the rowToCheck and colToCheck.
                const blockPosRow = rowToCheck + row;
                const blockPosCol = colToCheck + col;

                if ((blockPosCol - 1) < 0) { // Meaning that we're at the leftmost column.
                    return true;
                }
                else if ((gridBlocks[blockPosRow][blockPosCol - 1]).occupied === true) { // Meaning that there is an occupied block to the left.
                    return true;
                }
            }
        }
    }
    // Once it is known that there are no left collisions, check for any vertical collision to ensure that the piece won't interfere with anything below it.
    return checkVerticalCollision(tetriminoShape, rowToCheck, colToCheck);
}

// Upon a movement right, check if the piece is trying to move to an invalid position and colliding with something to the right.
export function checkRightCollision(tetriminoShape, rowToCheck, colToCheck) {
    for (let row = 0; row < tetriminoShape.length; row++) {
        for (let col = 0; col < tetriminoShape[row].length; col++) {        
            if (tetriminoShape[row][col] === 1) {
                // Calculate the projected position of the block on the grid relative to the rowToCheck and colToCheck.
                const blockPosRow = rowToCheck + row;
                const blockPosCol = colToCheck + col;

                if ((blockPosCol + 1) >= GRID_COLS) { // Meaning that we're at the rightmost column.
                    return true;
                }
                else if ((gridBlocks[blockPosRow][blockPosCol + 1]).occupied === true) { // Meaning that there is an occupied block to the right.
                    return true;
                }
            }
        }    
    }
    // Once it is known that there are no right collisions, check for any vertical collision to ensure that the piece won't interfere with anything below it.
    return checkVerticalCollision(tetriminoShape, rowToCheck, colToCheck);
}

// Fetches the next rotation key- remember that this is a value between 0 and 3.
export function fetchNextRotation(tetriminoKey, currentRotation) {
    // Retrieve the tetrimino object based on the passed key so that its four rotation states can be fetched.
    let tetrimino = TETRIMINOS[tetriminoKey];

    if (currentRotation === 3) {
        // Reset back to 0 if the tetrimino is at the final rotation index (full circle).
        currentRotation = 0;
    }
    else {
        currentRotation++;
    }
    return (tetrimino.rotations[currentRotation]);
}