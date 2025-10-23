import { Player } from '../src/domain/player.js';
import { Gameboard } from '../src/domain/gameboard.js';
describe('player module', () => {
    test('can create new player', () => {
        let human = new Player(new Gameboard(), 'Human');
        expect(human).toBeDefined();
    });

    test('can create human and npc players', () => {
        let human = new Player(new Gameboard(), 'Human');
        let NPC = new Player(new Gameboard(), 'Computer');
        expect(human.isComputer()).toBe(false);
        expect(NPC.isComputer()).toBe(true);
    });

    test.each([
        7,
        null,
        Number.NaN,
    ])('new Player(new Gameboard(), %p) expected to throw',(name) => {
        expect(() => new Player(new Gameboard(), name)).toThrow();
    });

    test('players have gameboards', () => {
        const board = { receiveAttack: jest.fn() };
        const human = new Player(board, 'Human');

        human.receiveAttack({ x: 3, y: 5 });

        expect(board.receiveAttack).toHaveBeenCalledWith({ x: 3, y: 5 });
    });

    test('require gameboards', () => {
        expect(() => new Player(null, 'Human')).toThrow();
        expect(() => new Player(new Player(), 'Human')).toThrow();
    });
});