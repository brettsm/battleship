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
            await this._userPlacementPhase();

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
        this._placeComputerShips();
        this.ui.hideBusy();
    }

    async _userPlacementPhase() {
        // needs to return a promise so we can use await

        return new Promise((resolve) => {
            this.ui.renderPlacementForm(
                {
                    ship: SHIP_TYPES[0],
                    onSubmit: (coordText) => {
                        const shipTypes = SHIP_TYPES;
                        let shipIndex = 0;

                        const { x, y }= this._parseCoords(coordText);
                        console.log(`x: ${x}, y ${y}`);
                    },
                }
            )
            

        });
    }

    _parseCoords(text) {
        let clean = text.trim().toUpperCase().replaceAll(/\s+/g, '');
        let coords = clean.match(/^([A-J])(\d{1,2})([HV])?$/);

        if (!coords) throw new Error(`Invalid coordinate format, expected like: B7H or B7V or B7, got ${clean}`);

        console.log(coords);

        const y = this._letterToY(coords[1]);
        const x = this._coordToX(coords[2]);

        return { x , y };
    }

    _letterToY(letter) {
        if (typeof(letter) !== 'string' || letter.length !== 1) throw new TypeError(`Expected a single letter A-Z, got ${letter}`);

        const caps = letter.toUpperCase();
        const code = caps.codePointAt(0);
        const index = code - 65;

        if (index < 0 || index > 9) {
            throw new RangeError(`index out of range 0-9: ${index}`);
        }

        return index;
    }

    _yToLetter(y) {
        if (typeof y !== 'number' || y < 0 || y > 9)
            throw new RangeError('yToLetter(y): y is out of range (0 - 9)')
        return String.fromCodePoint(65 + y);
    }

    _coordToX(val) {
        if (typeof(val) !== 'string')
            throw new TypeError(`expected a numeric character 1-10: got ${val} type ${typeof(val)}`);

        const num = Number(val)
        if (!Number.isInteger(num) || num > 10 || num < 1) 
            throw new RangeError(`number is outside of range 1-10: ${num}`);

        return num - 1;
    }

    _xToCoord(x) {
        if (typeof(x) !== 'number' || x < 0 || x > 9) 
            throw new RangeError('xToCoord(x): x is out of range (0-9)');

        return x + 1;
    }

    async _sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}