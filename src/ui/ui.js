//  TODO: TOP PRIORITY refactor ui.js into classes
//          delete ui.js, import everything into gameController.js

export class UserInterface {
    #statusBar; #stage; #playerPanel; #playerBoard; #missBoard; #placementBoard;

    constructor(appRoot) {
        this.appRoot = appRoot;
    }
    
    _makePlayerBoard() {
        const container = document.createElement('div');
        container.id = 'player-board';

        const missBoard = document.createElement('div');
        missBoard.id = 'miss-board';
        this.#missBoard = missBoard;

        const placementBoard = document.createElement('div');
        placementBoard.id = 'placement-board';
        this.#placementBoard = placementBoard;

        container.appendChild(missBoard);
        container.appendChild(placementBoard);

        return container;

    }

    renderCoinFlipResult({ message, onDone }) {
        this.updateStatusBar('Starting game... ' + message);
        this.appRoot.appendChild(startMessage);
        setTimeout(onDone, 1000);
    }

    renderShips() {
        // display user ships on grid
        return;
    }


}