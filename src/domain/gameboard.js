import { key, cellsFor, anyOutOfBounds } from "./helpers/gameboardHelpers.js";

// 10x10 board
export class Gameboard {
    #placed = new Map();
    constructor (size = 10) {
        this.size = size;
    }

    // h for horizontal v for vertical
    place(ship, { x, y }, dir = 'h') {
        let cells = cellsFor(ship.length, {x: x, y: y }, dir);

        if (anyOutOfBounds(cells, this.size))
            throw new Error('Out of bounds');

        for (const { x, y } of cells) {
            const k = key({ x, y });
            this.#placed.set(k, ship);
        }
    }

    isOccupied({ x, y }) {
        return this.#placed.has(key({ x: x, y: y }));
    }

    get placed() {
        return this.#placed;
    }

    
}