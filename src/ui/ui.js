export class UserInterface {
    constructor(appRoot) {
        this.appRoot = appRoot;
    }


    
    renderStartForm(cb) {
        const form = this._buildStartForm();
        this._attachStartFormEvents(form, cb);
        this.appRoot.replaceChildren(form);
    }

    renderPlaceForm(ship, cb) {
        const form = this._buildPlaceForm(ship);
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
        submitButton.textContent = 'Submit';

        label.appendChild(input);
        
        form.append(label, submitButton);

        return form;
    }


}