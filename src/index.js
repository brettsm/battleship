import { GameController } from "./app/gameController.js";

const appRoot = document.getElementById('app');

const game = new GameController({ appRoot: appRoot });
game.init();

