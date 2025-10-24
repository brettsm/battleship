import { Player } from "../domain/player.js";
import { UserInterface } from "../ui/ui.js";

export class GameController {
    #userPlayer
    #computerPlayer
    constructor({ appRoot, rng = Math.random }) {
        this.ui = new UserInterface(appRoot);
        this.rng = rng;
    }

    init() {
        this.ui.renderForm((playerName) => {
            this.#userPlayer = new Player(playerName);
            this.#computerPlayer = new Player();

            this._startGame(this.#userPlayer, this.#computerPlayer);
        })
    }

    _startGame(player1, player2) {
        
    }
}