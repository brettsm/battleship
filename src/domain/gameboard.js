import { key, cellsFor, anyOutOfBounds } from "./helpers/gameboardHelpers.js";

// 10x10 board
export class Gameboard {
    #placed = new Map();
    #hits = new Set();
    #misses = new Set();
    #ships = new Set();

    constructor (size = 10) {
        this.size = size;
    }

    // h for horizontal v for vertical
    place(ship, { x, y }, dir = 'h') {
        let cells = cellsFor(ship.length, {x: x, y: y }, dir);

        if (anyOutOfBounds(cells, this.size))
            throw new Error('Out of bounds');

        if (this.anyOverlapping(cells))
            throw new Error('Overlapping');

        if (this.#ships.has(ship)) throw new Error('Ship already placed!');

        for (const { x, y } of cells) {
            const k = key({ x, y });
            this.#placed.set(k, ship);
            this.#ships.add(ship);
        }
    }

    receiveAttack({ x, y }) {
        if (this.isOccupied({ x: x, y: y })) {
            this.#placed.get(key({ x: x, y: y })).hit();
            this.#hits.add(key({ x: x, y: y }));
        } else {
            this.#misses.add(key({ x: x, y: y}));
        }
    }

    isMissed({ x, y }) {
        return this.#misses.has(key({ x: x, y: y }));
    }

    isHit({ x, y }) {
        return this.#hits.has(key({ x: x, y: y }));
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

    allSunk() {
        for (const ship of this.#ships) {
            if(!ship.isSunk()) return false;
        }

        return true;
    }

    get placed() {
        return this.#placed;
    }

    
}