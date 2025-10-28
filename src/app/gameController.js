import { Player } from "../domain/player.js";
import { UserInterface } from "../ui/ui.js";
import { Gameboard } from "../domain/gameboard.js";
import { SHIP_TYPES } from "../domain/config/ships.js";
import { Ship } from "../domain/ship.js"

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
        this.ui.mountShell();
        this.ui.renderStartForm(async (playerName) => {
            this.#userPlayer = new Player(new Gameboard(), playerName);
            this.#computerPlayer = new Player(new Gameboard(), 'Computer');

            this._performStartupSequence();
        });
    }

    _flipCoin() {
        return this.rng() < 0.5;
    }

    _startGame() {
        this.#state = 'inPlay';
        console.log('game started');
    }

    _gameIsOver() {
        return this.#userPlayer.allSunk() || this.#computerPlayer.allSunk();
    }
    _placeComputerShips() {
        this.#computerPlayer.randomizeFleet();
    }

    async _performStartupSequence() {
            await this._computerPlacementPhase();
            await this._userPlacementPhase();

            const humanStarts = this._flipCoin();
            this.#current = humanStarts ? this.#userPlayer : this.#computerPlayer;
            this.#other = humanStarts ? this.#computerPlayer : this.#userPlayer;

            
            
            const message = this.#current === this.#userPlayer ? 'You start' : 'Computer starts';

            this.ui.renderCoinFlipResult({ message, onDone: () => this._startGame() });
    }

    async _computerPlacementPhase() {
        this.ui.updateStatusBar('Deploying enemy fleet...');
        await this._sleep(400);
        this._placeComputerShips();
    }

    async _userPlacementPhase() {
        // needs to return a promise so we can use await
        let index = 0;

        return new Promise((resolve) => {
            
            this.ui.renderPlacementForm(
                {
                    ship: SHIP_TYPES[index],
                    onSubmit: (coordText) => {

                        const { x, y, dir }= this._parseCoords(coordText);
                        const ship = new Ship(SHIP_TYPES[index].id);

                        this.#userPlayer.placeShip( ship, { x: x, y: y }, dir );

                        if (++index < SHIP_TYPES.length)
                            this.ui.updatePlacementMessage(`Place ${SHIP_TYPES[index].name}, length: ${SHIP_TYPES[index].length}`);
                        else {
                            this.ui.updatePlacementMessage('All ships placed');
                            this.ui.enableReadyButton();
                        }
                    },
                    onReady: () => {
                        resolve();
                    }
                }
            );
            

        });
    }

    _parseCoords(text) {
        let clean = text.trim().toUpperCase().replaceAll(/\s+/g, '');
        let coords = clean.match(/^([A-J])(\d{1,2})([HV])?$/);

        if (!coords) throw new Error(`Invalid coordinate format, expected like: B7H or B7V or B7, got ${clean}`);

        console.log(coords);

        const y = this._letterToY(coords[1]);
        const x = this._coordToX(coords[2]);
        let dir = coords[3];
        if (!coords[3]) dir = 'H';

        return { x , y , dir };
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