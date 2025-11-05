import { createGrid } from './grid/grid.js';

export function createPlayerBoard({
    ids = {
        missBoard: 'miss-board',
        placementBoard: 'placement-board'
    }
} = {}) {
    
    const missBoard = document.createElement('div');
    missBoard.id = ids.missBoard;

    
    const missGridObj = createGrid({name: 'miss'});
    missBoard.appendChild(missGridObj.gridContainer);

    const placementBoard = document.createElement('div');
    placementBoard.id = ids.placementBoard;

    const placementGridObj = createGrid({name: 'placement'});
    placementBoard.appendChild(placementGridObj.gridContainer);
    
    // TODO: add row and column markers (A-J, 1-9)

    // {x, y} represents start coordinates
    const displayShip = (ship, { col, row }, dir) => {
        let coli = col, rowi = row;

        if (dir.toUpperCase() === 'H') {
            for (let i = 0; i < ship.length; i++) {
                placementGridObj.paintCellGrey({ row: row, col: coli++ });
            }
        }

        if (dir.toUpperCase() === 'V') {
            for (let i = 0; i < ship.length; i++) {
                placementGridObj.paintCellGrey({ row: rowi++, col: col });
            }
        }
    }

    const displayIncomingHit = ({ col, row }) => {
        placementGridObj.paintCellRed({ row: row, col:col });
    }

    return{ missBoard, placementBoard, displayShip, displayIncomingHit };

}