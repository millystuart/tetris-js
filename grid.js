// For number of rows and columns specified, appends that many blocks to the grid element
export function generateGrid(rows, cols, grid) {
    for (let i = 0; i < rows * cols; i++) {
        let block = document.createElement("div");
        block.classList.add("block");
        grid.appendChild(block);
    }
}