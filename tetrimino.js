// RGB colour values for each tetrimino
const TURQUOISE = (70,255,255);
const BLUE      = (0,60,255);
const ORANGE    = (255,200,0);
const YELLOW    = (255,250,0);
const GREEN     = (0,250,0);
const PURPLE    = (185,0,255);
const RED       = (255,0,0);

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