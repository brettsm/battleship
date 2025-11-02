export function createPlacementForm({
    labelText = 'Enter coords here: ',
    inputType = 'text',
    submitButtonText = 'Submit',
    submitButtonType = 'submit',
    readyButtonText = 'Ready',
    readyButtonType = 'button',
    ids = {
        input: 'placement-input',
        message: 'placement-message',
        form: 'placement-form',
        readyButton: 'ready-button'
    }
} = {}, ship, onSubmit, onReady ) {
    const placementForm = document.createElement('form');
    placementForm.id = ids.form;

    const placementMessage = document.createElement('p');
    placementMessage.id = ids.message;
    placementMessage.textContent = `Where would you like to place ${ship.name} , length: ${ship.length}`;
    placementMessage.id = 'placement-message'

    const label = document.createElement('label');
    label.textContent = labelText;
    
    const input = document.createElement('input');
    input.type = inputType;
    input.id = ids.input;

    const submitButton = document.createElement('button');
    submitButton.type = submitButtonType;
    submitButton.textContent = submitButtonText;

    const readyButton = document.createElement('button');
    readyButton.type = readyButtonType;
    readyButton.textContent = readyButtonText;
    readyButton.id = ids.readyButton;
    readyButton.disabled = true;

    label.appendChild(input);
    placementForm.append(placementMessage, label, submitButton, readyButton);

    placementForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const coords = input.value.trim();
        if(coords && typeof(onSubmit) === 'function') onSubmit(coords);
    });

    readyButton.addEventListener('click', onReady);

    const updatePlacementMessage = (msg) => {
        if (msg)
            placementMessage.textContent = msg;
    }

    const enableReadyButton = () => {
        readyButton.disabled = false;
    }

    return { placementForm, updatePlacementMessage, enableReadyButton };

    

}