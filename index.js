import {GRID_ROWS, GRID_COLS, initialiseGrid, clearGrid, renderGrid} from "./grid.js";
import {drawTetrimino, generateRandomTetrimino, checkLeftCollision, checkRightCollision, checkVerticalCollision, fetchNextRotation} from "./tetrimino.js";

const GRID = document.getElementById("grid");

// Interval by which the game state will update and hence the tetrimino will descend
const INTERVAL = 500; // (in ms)

// GLOBAL array holding each row of blocks on the grid at any given time.
globalThis.gridBlocks = [];

// All tetriminos spawn at position (0, 3) on the grid.
let currentRow = 0;
let currentCol = 3;

// activeTetrimino = [tetriminoShape, tetriminoColour, tetriminoIndex, tetriminoRotationIndex]
// tetriminoShape = [[1...0], etc.], tetriminoColour = (e.g.) RED, tetriminoIndex = (e.g.) "S" and tetriminoRotationIndex = 0-3
let activeTetrimino = [];

initialiseGrid(GRID_ROWS, GRID_COLS, GRID);

// Randomly fetches a tetrimino and sets its current row/column to the default start position.
generateNewActiveTetrimino();

// Add a keyboard event listener to detect key inputs.
document.addEventListener("keydown", handleKeyInput);

// gameLoop is run every time the interval period is elapsed.
setInterval(gameLoop, INTERVAL);

function gameLoop() {
    // Start by clearing grid so that the tetrimino can be drawn in its new position without leaving a trail.
    clearGrid();
    // Render all currently placed blocks onto the grid
    renderGrid();

    // Collision checks:
    if (checkVerticalCollision(activeTetrimino[0], currentRow, currentCol)) {
        // If there is a vertical collision, the piece must be placed
        drawTetrimino(activeTetrimino[0], activeTetrimino[1], currentRow, currentCol, true)
        // Once the current active tetrimino has been placed, a new tetrimino can be generated at the top of the screen.
        generateNewActiveTetrimino();
    }
    else {
        // Otherwise, render the current tetrimino on the screen since it hasn't collided with anything and is hence still descending.
        drawTetrimino(activeTetrimino[0], activeTetrimino[1], currentRow, currentCol, false)
        // Descend the current tetrimino by one row to reflect the passing of time.
        currentRow++;
    }
}

// Randomly generates a new active tetrimino, and resets the global variables to reflect a new tetrimino spawning at the top. 
function generateNewActiveTetrimino() {
    activeTetrimino = generateRandomTetrimino();
    currentRow = 0;
    currentCol = 3;
}

// Holds the code that will run upon a given event encounter.
// Currently, there are three options- either left, right or up arrow.
function handleKeyInput(event) {
    switch (event.key) {
        // ArrowLeft moves the tetrimino one block (column) to the left.
        case "ArrowLeft":
            if (!checkLeftCollision(activeTetrimino[0], currentRow, currentCol)) {
                // Decrement column to reflect shape moving left by one block.
                currentCol--;
                refreshFrame(activeTetrimino[0], activeTetrimino[1], currentRow, currentCol, false);
            }
            break;

        // ArrowRight moves the tetrimino one block (column) to the right.
        case "ArrowRight":
            if (!checkRightCollision(activeTetrimino[0], currentRow, currentCol)) {
                // Increment column to reflect shape moving right by one block.
                currentCol++;
                refreshFrame(activeTetrimino[0], activeTetrimino[1], currentRow, currentCol, false);
            }
            break;
        
        // ArrowUp denotes that the user would like to rotate their current piece. Rotation occurs clockwise.
        case "ArrowUp":
            // Passing in the string representing the type of tetrimino in play (e.g. "J") and the current rotation index (0-3)
            const proposedTetriminoRotation = fetchNextRotation(activeTetrimino[2], activeTetrimino[3]);

            // Check collisions to ensure that rotating the tetrimino won't move the piece to an invalid position.
            // Note that there is no need to check vertical collisions as they are checked by the left/right collision functions internally.
            if (!checkLeftCollision(proposedTetriminoRotation, currentRow, currentCol) &&
                !checkRightCollision(proposedTetriminoRotation, currentRow, currentCol)) {
                // If there are no collisions detected, perform the rotation.
                performRotation(proposedTetriminoRotation);
                break;
            }

            // If collisions have been detected, check to see if there is a left collision.
            // If so, try shifting the piece one column right and check again for collisions.
            else if (checkLeftCollision(proposedTetriminoRotation, currentRow, currentCol)) {
                // If there are no collisions, perform the rotation with the tetrimino shifted once to the right.
                if (!checkLeftCollision(proposedTetriminoRotation, currentRow, currentCol + 1) &&
                    !checkRightCollision(proposedTetriminoRotation, currentRow, currentCol + 1)) {
                    currentCol++;
                    performRotation(proposedTetriminoRotation);
                    break;
                }
            }
            
            // If no left collision detected, check to see if there is a right collision.
            // Right collision is more complicated since a rotated piece at the wall may need to be shifted by the length of the proposed rotation.
            else if (checkRightCollision(proposedTetriminoRotation, currentRow, currentCol)) {
                // If there are no collisions, perform the rotation with the tetrimino shifted to the right by number of columns in proposed shape.
                const shiftAmount = proposedTetriminoRotation[0].length - 1;
                if (!checkLeftCollision(proposedTetriminoRotation, currentRow, currentCol - shiftAmount) &&
                    !checkRightCollision(proposedTetriminoRotation, currentRow, currentCol - shiftAmount)) {
                    currentCol -= shiftAmount;
                    performRotation(proposedTetriminoRotation);
                    break;
                }
            }

            // Otherwise, just break without attempting to rotate the piece since it is not possible.
            else {
                break;
            }
    }
}

// Helper function that runs the necessary functions to refresh the frame when an event occurs.
function refreshFrame(tetriminoShape, tetriminoColour, row, column, toBePlaced) {
    clearGrid();
    renderGrid();
    drawTetrimino(tetriminoShape, tetriminoColour, row, column, toBePlaced);
}

// Helper function to run the functions needed to perform a rotation on a piece.
function performRotation(tetriminoRotation) {
    // Actually update the shape to the new orientation.
    activeTetrimino[0] = tetriminoRotation;

    // If rotation index 3, then reset to 0 again since there are four rotations.
    // Otherwise, increment the rotation index to reflect the new tetrimino orientation.
    activeTetrimino[3] === 3 ? activeTetrimino[3] = 0 : activeTetrimino[3]++;

    refreshFrame(activeTetrimino[0], activeTetrimino[1], currentRow, currentCol, false);
}