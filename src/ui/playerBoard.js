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
    

    return{ missBoard, placementBoard };

}