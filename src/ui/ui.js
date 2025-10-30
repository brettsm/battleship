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

    renderStartForm(cb) {
        const form = this._buildStartForm();
        this._attachStartFormEvents(form, cb);
        this.#playerPanel.appendChild(form);
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

    updateStatusBar(message) {
        this.#statusBar.textContent = message;
    }

    renderPlacementForm({ ship, onSubmit, onReady }) {
        this.updateStatusBar('Deploy your fleet...');
        const form = this._buildPlacementForm(ship);
        const readyButton = form.querySelector('#ready-button');
        this._attachPlacementFormEvent(form, onSubmit);
        this._attachReadyListener(readyButton, onReady);
        this.#playerPanel.replaceChildren(form);
    }

    _attachStartFormEvents(form, cb) {
        const input = form.querySelector('#player1');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const playerName = input.value.trim();

            if (playerName) cb(playerName);
        });
    }

    _buildStartForm() {
        const form = document.createElement('form');
        form.id = 'start-form';
        
        const label = document.createElement('label');
        label.textContent = 'Enter your name to get started:';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'player1';

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Start';

        label.appendChild(input);
        
        form.append(label, submitButton);

        return form;
    }

    _buildPlacementForm(ship) {
        const form = document.createElement('form');
        form.id = 'placement-form';

        const placementMessage = document.createElement('p');
        placementMessage.textContent = `Where would you like to place ${ship.name}, length: ${ship.length}`;
        placementMessage.id = 'placement-message';

        const label = document.createElement('label');
        label.textContent = 'Enter coords here: ';

        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'placement-input';

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';


        const readyButton = document.createElement('button');
        readyButton.type = 'button';
        readyButton.textContent = 'Ready';
        readyButton.id = 'ready-button';
        readyButton.disabled = true;

        label.appendChild(input);
        form.append(placementMessage, label, submitButton, readyButton);

        return form;
    }

    enableReadyButton() {
        const readyButton = document.getElementById('ready-button');
        readyButton.disabled = false;
    }

    updatePlacementMessage(msg) {
        const msgElem = this.appRoot.querySelector('#placement-message');
        msgElem.textContent = msg;
    }

    _attachPlacementFormEvent(form, cb) {
        const input = form.querySelector('#placement-input');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const coords = input.value.trim(); 

            if (coords) cb(coords);
        });
    }

    _attachReadyListener(button, onReady) {
        button.addEventListener('click', onReady);
    }
}