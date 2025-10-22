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

        // TODO: throw on overlapping
        if (this.anyOverlapping(cells))
            throw new Error('Overlapping');
        
        for (const { x, y } of cells) {
            const k = key({ x, y });
            this.#placed.set(k, ship);
        }
    }

    isOccupied({ x, y }) {
        return this.#placed.has(key({ x: x, y: y }));
    }

    anyOverlapping(cells) {
        if (this.#placed.size === 0) return false;

        for ( const { x, y } of cells ) {
            if (this.isOccupied({ x: x, y: y })) return true;
        }

        return false;
    }

    get placed() {
        return this.#placed;
    }

    
}