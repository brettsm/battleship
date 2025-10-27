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
        this.ui.renderStartForm(async (playerName) => {
            this.#userPlayer = new Player(new Gameboard(), playerName);
            this.#computerPlayer = new Player(new Gameboard(), 'Computer');

            await this._computerPlacementPhase();
            //this._placeUserShips();

            // TODO: should I have it flip a coin here?

            const humanStarts = this._flipCoin();
            this.#current = humanStarts ? this.#userPlayer : this.#computerPlayer;
            this.#other = humanStarts ? this.#computerPlayer : this.#userPlayer;

            
            
            const message = this.current === this.#userPlayer ? 'You start' : 'Computer starts';

            this.ui.renderCoinFlipResult({ message: message, onDone: () => this._startGame() });

            // TODO: refactor like this:
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
    }

    _gameIsOver() {
        return this.#userPlayer.allSunk() || this.#computerPlayer.allSunk();
    }
    _placeComputerShips() {
        this.#computerPlayer.randomizeFleet();
    }

    async _computerPlacementPhase() {
        this.ui.showBusy('Deploying enemy fleet...');
        await this._sleep(400).then(console.log('slept'));

    }

    async _sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}