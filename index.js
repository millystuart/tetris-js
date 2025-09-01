import {initialiseGrid, clearGrid, GRID_COLS, GRID_ROWS} from "./grid.js";
import {drawTetrimino, generateRandomTetrimino} from "./tetrimino.js";

const GRID = document.getElementById("grid");
let startRow = 0;
let startCol = 3;

// gridBlocks will hold the state of the grid
let gridBlocks = initialiseGrid(GRID_ROWS, GRID_COLS, GRID);
let tetrimino = generateRandomTetrimino();

setInterval(gameLoop, 500);

function gameLoop() {
    descendTetrimino(tetrimino, gridBlocks)
}

function descendTetrimino(tetrimino, gridBlocks) {
    // Start by clearing grid so that the tetrimino can be drawn in its new position without leaving a trail.
    clearGrid(gridBlocks);
    gridBlocks = drawTetrimino(tetrimino[0], tetrimino[1], startRow, startCol, gridBlocks);
    startRow++;
    console.log(startRow);

    if (startRow > GRID_ROWS - tetrimino[0].length) {
        startRow = 0; // Reset tetrimino to the top
        console.log(gridBlocks)
    }
}