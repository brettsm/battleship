const BOARD_HEIGHT = 436;
const BOARD_WIDTH = 436;

export function createGrid({
    name = 'miss',
    classes = {
        gridCell: ['grid-border', 'grid-display'],
        gridContainer: ['grid-container']
    },
} = {}, size = 10) {
    const gridContainer = document.createElement('div');
    for (let c of classes.gridContainer) gridContainer.classList.add(c);
    gridContainer.style.height = `${BOARD_HEIGHT}px`;
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const gridCell = document.createElement('div');
            if (name === 'miss')
                gridCell.id = `m${row}-${col}`;
            else
                gridCell.id = `p${row}-${col}`;
            for (let c of classes.gridCell) gridCell.classList.add(c);
            gridCell.setAttribute('style', `grid-row: ${row + 1} / ${row + 1}`);
            gridCell.setAttribute('style', `grid-column: ${col + 1} / ${col + 1}`)

            gridContainer.appendChild(gridCell);
        }
    }

    const paintCellGrey = (row, col) => {
        const id = `p${col}-${row}`;
        const cell = document.getElementById(id);
        cell.style.backgroundColor = 'grey';
    }

    return { gridContainer, paintCellGrey };
}