import {generateGrid} from "./grid.js";

const GRID = document.getElementById("grid");
const GRID_ROWS = 20;
const GRID_COLS = 10;

generateGrid(GRID_ROWS, GRID_COLS, GRID);