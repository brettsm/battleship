export class UserInterface {
    #statusBar; #stage; #playerPanel; #playerBoard; #gameArea

    constructor(appRoot) {
        this.appRoot = appRoot;
    }

    mountShell() {
        const statusBar = document.createElement('div');
        statusBar.id = 'status-bar';
        statusBar.textContent = 'Welcome!';
        statusBar.classList.add('shadowed');
        this.#statusBar = statusBar;

        const playerBoard = document.createElement('div');
        playerBoard.id = 'player-board';
        this.#playerBoard = playerBoard;

        const playerPanel = document.createElement('div');
        playerPanel.id = 'player-panel';
        playerPanel.classList.add('shadowed');
        this.#playerPanel = playerPanel;
        


        this.appRoot.append(statusBar, playerBoard, playerPanel);
    }
    
    _resetToShell() {
        this.appRoot.replaceChildren(this.#statusBar, this.#playerBoard, this.#playerPanel);
        // need to update this i believe
    }

    renderStartForm(cb) {
        const form = this._buildStartForm();
        this._attachStartFormEvents(form, cb);
        this.#playerPanel.appendChild(form);
    }

    renderCoinFlipResult({ message, onDone }) {
        this._resetToShell();
        this.updateStatusBar('Starting game...');
        const startMessage = document.createElement('div');
        startMessage.textContent = message;
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
        this._resetToShell();
        this.updateStatusBar('Deploying your fleet...');
        const form = this._buildPlacementForm(ship);
        const readyButton = form.querySelector('#ready-button');
        this._attachPlacementFormEvent(form, onSubmit);
        this._attachReadyListener(readyButton, onReady);
        this.appRoot.appendChild(form);
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