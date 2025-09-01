import {initialiseGrid, clearGrid, GRID_COLS, GRID_ROWS, renderGrid} from "./grid.js";
import {drawTetrimino, generateRandomTetrimino, checkLeftCollision, checkRightCollision, checkVerticalCollision} from "./tetrimino.js";

const GRID = document.getElementById("grid");
globalThis.gridBlocks = []; // GLOBAL array to hold each block on the grid
let currentRow = 0;
let currentCol = 3;
let activeTetrimino = null;

// gridBlocks will hold the state of the grid
initialiseGrid(GRID_ROWS, GRID_COLS, GRID);
generateNewActiveTetrimino();

// add keyboard event listener to detect arrow key inputs
document.addEventListener("keydown", handleKeyInput);

setInterval(gameLoop, 500);

function gameLoop() {
    // Start by clearing grid so that the tetrimino can be drawn in its new position without leaving a trail.
    clearGrid();
    // Render all placed blocks onto the grid
    renderGrid();

    if (checkVerticalCollision(activeTetrimino[0], currentRow, currentCol)) {
        // If there is a vertical collision, the piece must be placed
        drawTetrimino(activeTetrimino[0], activeTetrimino[1], currentRow, currentCol, true)
        // Once current active tetrimino has been placed, we can now proceed to generate a new tetrimino at the top of the screen
        generateNewActiveTetrimino();
    }
    else {
        drawTetrimino(activeTetrimino[0], activeTetrimino[1], currentRow, currentCol, false)
        currentRow++;
    }
}

function generateNewActiveTetrimino() {
    activeTetrimino = generateRandomTetrimino();
    currentRow = 0;
    currentCol = 3;
}

function handleKeyInput(event) {
    switch (event.key) {
        case "ArrowLeft":
            // if there is no left collision, render the block in the new position!
            if (checkLeftCollision(activeTetrimino[0], currentRow, currentCol) === false) {
                currentCol--; // Decrement column to reflect shape moving left by one block
                clearGrid();
                renderGrid();
                drawTetrimino(activeTetrimino[0], activeTetrimino[1], currentRow, currentCol, false);
            }
            break;

        case "ArrowRight":
            // if there is no right collision, render the block in the new position!
            if (checkRightCollision(activeTetrimino[0], currentRow, currentCol) === false) {
                currentCol++; // Increment column to reflect shape moving right by one block
                clearGrid();
                renderGrid();
                drawTetrimino(activeTetrimino[0], activeTetrimino[1], currentRow, currentCol, false);
            }
            break;
    }
}
