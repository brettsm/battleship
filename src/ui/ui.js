export class UserInterface {
    constructor(appRoot) {
        this.appRoot = appRoot;
    }


    
    renderStartForm(cb) {
        const form = this._buildStartForm();
        this._attachStartFormEvents(form, cb);
        this.appRoot.replaceChildren(form);
    }

    renderGameView(humanStarts) {
        const view = _buildGameView(humanStarts);
        this.appRoot.replaceChildren(view);
    }

    renderCoinFlipResult({ message, onDone }) {
        this.appRoot.textContent = message;
        setTimeout(onDone, 1000);
    }

    _buildGameView(humanStarts) {

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