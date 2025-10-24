import { Player } from "../domain/player.js";
import { UserInterface } from "../ui/ui.js";
import { Gameboard } from "../domain/gameboard.js";

export class GameController {
    #userPlayer
    #computerPlayer
    constructor({ appRoot, rng = Math.random }) {
        this.ui = new UserInterface(appRoot);
        this.rng = rng;
    }

    init() {
        this.ui.renderStartForm((playerName) => {
            this.#userPlayer = new Player(new Gameboard(), playerName);
            this.#computerPlayer = new Player(new Gameboard(), 'Computer');

            const humanStarts = this._flipCoin();
            
            console.log(humanStarts);
            // TODO: figure out how to render coin flip and flow to start the game etc.
        });
    }

    _flipCoin() {
        return this.rng() < 0.5;
    }
}