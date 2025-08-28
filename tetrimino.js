import {GRID_ROWS, GRID_COLS, gridBlocks} from "./grid.js";

// Hex colour values for each tetrimino
const TURQUOISE = "#40e0d0ff";
const BLUE      = "#0000ff";
const ORANGE    = "#ffa500";
const YELLOW    = "#ffff00";
const GREEN     = "#00ff00";
const PURPLE    = "#800080";
const RED       = "#ff0000";

// Below is an exported object containing each tetrimino's four rotation states and correpsonding colour.
// Each rotation state is represented by a 2D array, where 1 indicates the presence of a block.
export const TETRIMINOS = {
    I: {
        rotations: [[[0, 0, 0, 0],
                     [1, 1, 1, 1],
                     [0, 0, 0, 0],
                     [0, 0, 0, 0]],
                    [[0, 0, 1, 0],
                     [0, 0, 1, 0],
                     [0, 0, 1, 0],
                     [0, 0, 1, 0]],
                    [[0, 0, 0, 0],
                     [0, 0, 0, 0],
                     [1, 1, 1, 1],
                     [0, 0, 0, 0]],
                    [[0, 1, 0, 0],
                     [0, 1, 0, 0],
                     [0, 1, 0, 0],
                     [0, 1, 0, 0]]],
        colour: TURQUOISE
    },

    J: {
        rotations: [[[1, 0, 0],
                     [1, 1, 1],
                     [0, 0, 0]],
                    [[0, 1, 1],
                     [0, 1, 0],
                     [0, 1, 0]],
                    [[0, 0, 0],
                     [1, 1, 1],
                     [0, 0, 1]],
                    [[0, 1, 0],
                     [0, 1, 0],
                     [1, 1, 0]]],
        colour: BLUE
    },

    L: {
        rotations: [[[0, 0, 1],
                     [1, 1, 1],
                     [0, 0, 0]],
                    [[0, 1, 0],
                     [0, 1, 0],
                     [0, 1, 1]],
                    [[0, 0, 0],
                     [1, 1, 1],
                     [1, 0, 0]],
                    [[1, 1, 0],
                     [0, 1, 0],
                     [0, 1, 0]]],
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
                     [1, 1, 0],
                     [0, 0, 0]],
                    [[0, 1, 0],
                     [0, 1, 1],
                     [0, 0, 1]],
                    [[0, 0, 0],
                     [0, 1, 1],
                     [1, 1, 0]],
                    [[1, 0, 0],
                     [1, 1, 0],
                     [0, 1, 0]]],
        colour: GREEN
    },

    T: {
        rotations: [[[0, 1, 0],
                     [1, 1, 1],
                     [0, 0, 0]],
                    [[0, 1, 0],
                     [0, 1, 1],
                     [0, 1, 0]],
                    [[0, 0, 0],
                     [1, 1, 1],
                     [0, 1, 0]],
                    [[0, 1, 0],
                     [1, 1, 0],
                     [0, 1, 0]]],
        colour: PURPLE
    },

    Z: {
        rotations: [[[1, 1, 0],
                     [0, 1, 1],
                     [0, 0, 0]],
                    [[0, 0, 1],
                     [0, 1, 1],
                     [0, 1, 0]],
                    [[0, 0, 0],
                     [1, 1, 0],
                     [0, 1, 1]],
                    [[0, 1, 0],
                     [1, 1, 0],
                     [1, 0, 0]]],
        colour: RED
    },
}