export function createStatsPanel({
    titleText = 'Player Stats',
    ids = {
        statsPanel: 'stats-panel'
    }
} = {}) {
    const title = document.createElement('h1');
    title.textContent = 'Player Stats:';

    const subText = document.createElement('p');
    subText.textContent = 'player stats will go here';

    const statsPanel = document.createElement('div');
    statsPanel.id = ids.statsPanel;
    statsPanel.appendChild(title);
    statsPanel.appendChild(subText);

    return { statsPanel };
}