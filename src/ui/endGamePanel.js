export function createEndGamePanel(humanWon, onTryAgain) {
    let text;
    if (humanWon) {
        text = 'You won!';
    } else {
        text = 'You lost :(';
    }

    const panelContainer = document.createElement('div');
    panelContainer.id = 'panel-container';

    const outComeText = document.createElement('h1');
    outComeText.textContent = text;
    outComeText.classList.add('panel-heading');

    const tryAgainButton = document.createElement('button');
    tryAgainButton.textContent = 'Try Again?';
    tryAgainButton.addEventListener('click', () => {
        console.log('clicked');
        onTryAgain();
    });

    panelContainer.appendChild(outComeText);
    panelContainer.appendChild(tryAgainButton);

    return { panelContainer };
}