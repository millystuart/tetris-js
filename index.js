import {initialiseGrid, clearGrid, GRID_COLS, GRID_ROWS, renderGrid} from "./grid.js";
import {drawActiveTetrimino, generateRandomTetrimino} from "./tetrimino.js";

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
    
    if (drawActiveTetrimino(activeTetrimino[0], activeTetrimino[1], currentRow, currentCol)) {
        // Once current active tetrimino has been placed, we can now proceed to generate a new tetrimino at the top of the screen
        generateNewActiveTetrimino();
    }
    else {
        // If false, continue dropping the active tetrimino.
        currentRow++;
    }
}

function generateNewActiveTetrimino() {
    activeTetrimino = generateRandomTetrimino();
    currentRow = 0;
    currentCol = 3;
}

function handleKeyInput(event) {
    switch(event.key) {
        case "ArrowLeft":
            currentCol--; // Decrement column to reflect shape moving left by one block
        case "ArrowRight":
            currentCol++; // Increment column to reflect shape moving right by one block
        case "ArrowUp":
    }
}
