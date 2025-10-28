export class UserInterface {
    constructor(appRoot) {
        this.appRoot = appRoot;
    }


    
    renderStartForm(cb) {
        const form = this._buildStartForm();
        this._attachStartFormEvents(form, cb);
        this.appRoot.replaceChildren(form);
    }

    renderCoinFlipResult({ message, onDone }) {
        this.appRoot.textContent = message;
        setTimeout(onDone, 1000);
    }

    renderShips() {
        // display user ships on grid
        return;
    }

    showBusy(message) {
        const busyOverlay = document.createElement('div');
        busyOverlay.textContent = message;
        busyOverlay.classList.add('busy-overlay');
        this.appRoot.appendChild(busyOverlay);
    }

    hideBusy() {
        const overlay = this.appRoot.querySelector('.busy-overlay');
        if (overlay) overlay.remove();
    }

    renderPlacementForm({ ship, onSubmit, onReady }) {
        const form = this._buildPlacementForm(ship);
        const readyButton = form.querySelector('#ready-button');
        this._attachPlacementFormEvent(form, onSubmit);
        this._attachReadyListener(readyButton, onReady);
        this.appRoot.replaceChildren(form);
    }

    _attachStartFormEvents(form, cb) {
        const input = form.querySelector('#player1');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const playerName = input.value.trim();

            if (playerName) cb(playerName);
        });
    }

    // TODO: make _buildPlaceForm(ship)

    _buildStartForm() {
        const form = document.createElement('form');
        form.id = 'start-form';
        
        const label = document.createElement('label');
        label.textContent = 'Enter your Name:';
        
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