export function createStartForm({
    buttonText = 'Start',
    buttonType = 'submit',
    labelText = 'Name:',
    ids = {
        startForm: 'start-form',
        input: 'player1',
    }
} = {}, cb) {
    const startForm = document.createElement('form');
    startForm.id = ids.startForm;

    const label = document.createElement('label');
    label.textContent = labelText;

    const input = document.createElement('input');
    input.type = 'text';
    input.id = ids.input;

    const submitButton = document.createElement('button');
    submitButton.type = buttonType;
    submitButton.textContent = buttonText;

    startForm.append(label, input, submitButton);

    startForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const playerName = input.value.trim();
        if (playerName && typeof(cb) === 'function') cb(playerName);
    });

    return { startForm };
}
