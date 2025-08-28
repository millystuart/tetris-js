import {initialiseGrid} from "./grid.js";
import {TETRIMINOS} from "./tetrimino.js";

const GRID = document.getElementById("grid");
const GRID_ROWS = 20;
const GRID_COLS = 10;

initialiseGrid(GRID_ROWS, GRID_COLS, GRID);