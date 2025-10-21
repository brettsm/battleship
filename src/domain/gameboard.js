import { key } from "./helpers/gameboardHelpers.js";

// 10x10 board
const x = 0, y = 1;

export class Gameboard {
    #placed = new Map();
    constructor () {
        
    }


    place(ship, { x, y }, dir = 'h') {
        this.#placed.set(key({ x: x, y: y}), ship);
    }

    isOccupied({ x, y }) {
        return this.#placed.has(key({ x: x, y: y }));
    }

    get placed() {
        return this.#placed;
    }

    
}