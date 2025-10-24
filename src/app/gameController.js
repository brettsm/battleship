import { Player } from "../domain/player.js";
import { UserInterface } from "../ui/ui.js";
import { Gameboard } from "../domain/gameboard.js";

export class GameController {
    #userPlayer
    #computerPlayer
    #current
    #other
    #state
    constructor({ appRoot, rng = Math.random }) {
        this.ui = new UserInterface(appRoot);
        this.rng = rng;
    }

    init() {
        this.ui.renderStartForm((playerName) => {
            this.#userPlayer = new Player(new Gameboard(), playerName);
            this.#computerPlayer = new Player(new Gameboard(), 'Computer');

            const humanStarts = this._flipCoin();
            this.#current = humanStarts ? this.#userPlayer : this.#computerPlayer;
            this.#other = humanStarts ? this.#computerPlayer : this.#userPlayer;

            const message = this.current === this.#userPlayer ? 'You start' : 'Computer starts';

            this.ui.renderCoinFlipResult({ message: message, onDone: () => this._startGame() });
        });
    }

    _flipCoin() {
        return this.rng() < 0.5;
    }

    _startGame() {
        
    }
}