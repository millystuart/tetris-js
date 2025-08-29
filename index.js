import {initialiseGrid, GRID_COLS, GRID_ROWS} from "./grid.js";
import {drawTetrimino, generateRandomTetrimino} from "./tetrimino.js";

const GRID = document.getElementById("grid");

// gridBlocks will hold the state of the grid
let gridBlocks = initialiseGrid(GRID_ROWS, GRID_COLS, GRID);
// Returns an array holding the shape and colour of a random tetrimino
let tetrimino = generateRandomTetrimino(); // [0] is the shape, [1] is the colour

drawTetrimino(tetrimino[0], tetrimino[1], 0, 4, gridBlocks);