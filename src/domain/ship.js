export class Ship {
    #hits = 0;

    // TODO: implement ship types for battleship (aircraft carrier: length 5, cruiser: length 3, etc.)

    constructor(length) {
        if (typeof(length) !== 'number')
            throw new TypeError('Ship.length expects a number');
        if (!length || length <= 0) {
            throw new Error('ship must have positive length');
        }

        this.length = length;
    }

    isSunk() {
        return this.#hits >= this.length;
    }

    hit() {
        this.#hits = Math.min(this.#hits + 1, this.length);
    }

    get hits() {
        return this.#hits;
    }
}