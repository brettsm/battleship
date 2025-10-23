
export class Player {
    #name;
    #board;

    constructor(board, name = 'Computer') {
        if (typeof(name) !== 'string')
            throw new TypeError('Player.name expects a string');

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