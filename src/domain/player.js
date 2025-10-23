import { Gameboard } from './gameboard.js';

export class Player {
    #name;
    #board;
    constructor(board, name = 'Computer') {
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