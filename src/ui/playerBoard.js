import { createGrid } from './grid/grid.js';

export function createPlayerBoard({
    ids = {
        missBoard: 'miss-board',
        placementBoard: 'placement-board'
    }
} = {}) {
    const missBoard = document.createElement('div');
    missBoard.id = ids.missBoard;

    const placementBoard = document.createElement('div');
    placementBoard.id = ids.placementBoard;

    const missGridObj = createGrid({name: 'miss'});
    missBoard.appendChild(missGridObj.gridContainer);

    const placementGridObj = createGrid({name: 'placement'});
    placementBoard.appendChild(placementGridObj.gridContainer);
    
    // TODO: add row and column markers (A-J, 1-9)

    // {x, y} represents start coordinates
    const displayShip = (ship, { x, y }, dir) => {
        let xi = x, yi = y;

        if (dir.toUpperCase() === 'H') {
            for (let i = 0; i < ship.length; i++) {
                placementGridObj.paintCellGrey(xi++, y);
            }
        }

        if (dir.toUpperCase() === 'V') {
            for (let i = 0; i < ship.length; i++) {
                placementGridObj.paintCellGrey(x, yi++);
            }
        }
    }

    return{ missBoard, placementBoard, displayShip };

}