import { Player } from "../domain/player.js";
import { UserInterface } from "../ui/ui.js";
import { Gameboard } from "../domain/gameboard.js";
import { SHIP_TYPES } from "../domain/config/ships.js";

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

            this._startGame();

            //TODO: refactor like this:
            //      1. set user player
            //      2. set computer player
            //      3. this._placeHumanFleet();
        });
    }

    _flipCoin() {
        return this.rng() < 0.5;
    }

    _startGame() {
        this.#state = 'inPlay';
        // TODO: now we need to choose the ships
        this.#computerPlayer.randomizeFleet();
    }

    _gameIsOver() {
        return this.#userPlayer.allSunk() || this.#computerPlayer.allSunk();
    }
}