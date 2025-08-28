import {generateGrid} from "./grid.js";

const GRID = document.getElementById("grid");
const ROWS = 20;
const COLS = 10;

generateGrid(ROWS, COLS, GRID);