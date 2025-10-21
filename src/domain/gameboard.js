import { key, cellsFor } from "./helpers/gameboardHelpers.js";

// 10x10 board
const x = 0, y = 1;

export class Gameboard {
    #placed = new Map();
    constructor () {
        
    }

    // h for horizontal v for vertical
    place(ship, { x, y }, dir = 'h') {
        let cells = cellsFor(ship.length, {x: x, y: y }, dir);
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