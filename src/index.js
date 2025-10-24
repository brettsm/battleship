import { UserInterface } from './ui/ui.js';

const app = document.getElementById('app');

const ui = new UserInterface(app);

ui.renderStartForm((playerName) => {
    console.log(playerName);
});

