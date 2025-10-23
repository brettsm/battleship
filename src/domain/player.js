import { Gameboard } from "./gameboard";
export class Player {
    #name;
    #board;

    constructor(board, name = 'Computer') {
        if (typeof(name) !== 'string')
            throw new TypeError('Player.name expects a string');

        if (!board || typeof board.receiveAttack !== 'function') {
            throw new TypeError('Player requires a Gameboard instance');
        }
        this.#name = name;
        this.#board = board;
    }

    isComputer() {
        return this.#name === 'Computer';
    }

    receiveAttack({ x, y }) {
        this.#board.receiveAttack({ x: x, y: y });
    }
}