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
    let gb = new Gameboard();
    let s = new Ship(2);
    gb.place(s, { x: 0, y: 0 }, 'h');

    test.each([
        [0, 0, true],
        [1, 2, false],
        [1, 0, true],
        [2, 0, false]
    ])('can place a ship across a horizontal length', (x, y, bool) => {
        expect(gb.isOccupied({x: x, y: y})).toBe(bool);
    });
});