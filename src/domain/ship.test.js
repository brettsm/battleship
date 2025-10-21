import { Ship } from './ship.js';

describe('ship class properties', () => {
    test('creates a ship with length', () => {
        const s = new Ship(3);
        expect(s.length).toEqual(3);
        const s2 = new Ship(5);
        expect(s2.length).toEqual(5);
    });

    test.each(
        [null, -1, 'h', Number.NaN, undefined]
    )('new Ship(%p) throws', (val) => {
        expect(() => new Ship(val)).toThrow();
    });
})