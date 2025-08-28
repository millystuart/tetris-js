import {initialiseGrid, GRID_COLS, GRID_ROWS} from "./grid.js";
import {TETRIMINOS, drawTetrimino} from "./tetrimino.js";

const GRID = document.getElementById("grid");

// gridBlocks will hold the state of the grid
let gridBlocks = initialiseGrid(GRID_ROWS, GRID_COLS, GRID);

drawTetrimino(TETRIMINOS.T, 0, 9, 4, gridBlocks);