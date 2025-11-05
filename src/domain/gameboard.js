import { key, cellsFor, anyOutOfBounds, inBounds, unkey } from "./helpers/gameboardHelpers.js";
import { Ship } from "./ship.js";
import { SHIP_TYPES } from "./config/ships.js";

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
        let cells = cellsFor(ship.length, { x: x, y: y }, dir);

        if (anyOutOfBounds(cells, this.size))
            throw new Error('Out of bounds');

        if (this.anyOverlapping(cells))
            throw new Error('Overlapping');

        if (this.#ships.has(ship)) throw new Error('Ship already placed!');

        for (const { x, y } of cells) {
            const k = key({ x, y });
            this.#placed.set(k, ship); 
        }
        this.#ships.add(ship);
    }

    canPlace(ship, { x, y }, dir = 'h') {
        let cells = cellsFor(ship.length, { x: x, y: y }, dir);

        if (anyOutOfBounds(cells, this.size))
            return false;

        else if (this.anyOverlapping(cells))
            return false;

        else if (this.#ships.has(ship))
            return false;
        else
            return true;
    }

    receiveAttack({ x, y }) {
        if (!inBounds({ x: x, y: y }, this.size)) {
            throw new Error('Attack is out of bounds');
        }

        if (this.isOccupied({ x: x, y: y })) {
            this.#placed.get(key({ x: x, y: y })).hit();
            this.#hits.add(key({ x: x, y: y }));
            return true;
        } else {
            this.#misses.add(key({ x: x, y: y}));
            return false;
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

    getMisses() {
        return [...this.#misses].map(unkey);
    }

    getHits() {
        return [...this.#hits].map(unkey);
    }

    clear() {
        this.#placed.clear();
        this.#hits.clear();
        this.#misses.clear();
        this.#ships.clear();
        return this;
    }

    get placed() {
        return this.#placed;
    }

    randomizeFleet({ catalog = SHIP_TYPES, rng = Math.random } = {}) {
        this.clear();
        for (const { id } of catalog ) {
            let placed = false;
            let attempts = 0;
            while (!placed && attempts++ < 500) {
                const orientation = rng() < 0.5 ? 'h' : 'v';
                const start = {
                    x: Math.floor(rng() * this.size),
                    y: Math.floor(rng() * this.size)
                };
                let ship = new Ship(id);
                if (this.canPlace(ship, start, orientation)) {
                    this.place(ship, start, orientation);
                    placed = true;
                }
            }
            if (!placed) throw new Error(`Failed to place ${id} after ${attempts} tries`);
        }
    }
}