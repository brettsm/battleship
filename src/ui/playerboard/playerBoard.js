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

    return{ missBoard, placementBoard };

    const placeShip = (ship, {x, y}, dir) {
        
    }
}