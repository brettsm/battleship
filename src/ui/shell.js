export function createShell({
    statusText = 'Welcome',
    ids = {
        statusBar: 'status-bar',
        playerBoard: 'player-board',
        playerPanel: 'player-panel'
    },
    classes = {
        shellItem: ['in-shadowed'],
    },
} = {}) {
    const statusBar = document.createElement('div');
    statusBar.id = ids.statusBar;
    statusBar.textContent = statusText;
    statusBar.setAttribute('role', 'status');
    statusBar.setAttribute('aria-live', 'polite');
    classes.shellItem.forEach(c => statusBar.classList.add(c));

    const playerBoard = document.createElement('div');
    playerBoard.id = ids.playerBoard;
    playerBoard.setAttribute('aria-label', 'Player Board');
    classes.shellItem.forEach(c => playerBoard.classList.add(c));

    const playerPanel = document.createElement('div');
    playerPanel.id = ids.playerPanel;
    playerPanel.setAttribute('aria-label', 'Player Panel');
    classes.shellItem.forEach(c => playerPanel.classList.add(c));


    const setStatus = (msg) => {
        statusBar.textContent = msg;
    }

    const replacePanel = (...nodes) => {
        playerPanel.replaceChildren(...nodes);
    };

    return {
        statusBar,
        playerBoard,
        playerPanel,
        setStatus,
        replacePanel,
    };
}