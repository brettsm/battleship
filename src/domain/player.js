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
        return this.#board.receiveAttack({ x: x, y: y });
    }

    placeShip(ship, { x, y }, dir = 'h') {
        this.#board.place(ship, { x: x, y: y }, dir);
    }

    allSunk() {
        return this.#board.allSunk();
    }

    randomizeFleet() {
        this.#board.randomizeFleet();
    }

}