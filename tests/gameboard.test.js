import { Gameboard } from '../src/domain/gameboard.js';
import { Ship } from '../src/domain/ship.js';

describe('gameboard properties', () => {
    test('gameboard constructor constructs', () => {
        expect(new Gameboard()).toBeDefined();
    });

    test('gameboard properties exist', () => {
        let gb = new Gameboard();
        expect(gb.placed).toBeInstanceOf(Map);
    });

});

describe('gameboard methods', () => {
    test('can place ship without error when valid', () => {
        let gb = new Gameboard();
        let s = new Ship(2);
        gb.place(s, { x: 0, y: 0 }, 'h');
        expect(gb.isOccupied({ x: 0, y: 0 })).toBe(true);
        expect(gb.isOccupied({ x: 1, y: 2 })).toBe(false);
    });
});