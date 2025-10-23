import { Player } from '../src/domain/player.js';
import { Gameboard } from '../src/domain/gameboard.js';
describe('player module', () => {
    test('can create new player', () => {
        let human = new Player();
        expect(human).toBeDefined();
    });

    test('can create human and npc players', () => {
        let human = new Player(new Gameboard(), 'Human');
        let NPC = new Player(new Gameboard(), 'Computer');
        expect(human.isComputer()).toBe(false);
        expect(NPC.isComputer()).toBe(true);
    });

    // TODO: test: throws when invalid type

    test('players have gameboards', () => {
        const board = { receiveAttack: jest.fn() };
        const human = new Player(board, 'Human');

        human.receiveAttack({ x: 3, y: 5 });

        expect(board.receiveAttack).toHaveBeenCalledWith({ x: 3, y: 5 });
    })
});