import { SHIP_TYPES, SHIP_BY_ID } from "./config/ships.js";

export class Ship {
    #hits = 0;
    // TODO: implement ship types for battleship (aircraft carrier: length 5, cruiser: length 3, etc.)

    constructor(type) {
        console.log(SHIP_BY_ID);
        console.log(SHIP_BY_ID[type]);
        if (!Object.hasOwn(SHIP_BY_ID, type))
            throw new TypeError('Ship expects id of SHIP_TYPE');

        this.type = SHIP_BY_ID[type];
        this.length = this.type.length;
        this.name = this.type.name;
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