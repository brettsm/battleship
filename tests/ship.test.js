import { Ship } from '../src/domain/ship.js';

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
});

describe('Ship.hit() and sink()', () => {
    test('hit and sink work as expected', () => {
        const s = new Ship(2);
        expect(s.hits).toEqual(0);
        s.hit();
        expect(s.hits).toEqual(1);

        expect(s.isSunk()).toBe(false);

        s.hit();
        expect(s.hits).toEqual(2);

        expect(s.isSunk()).toBe(true);

    });

    test('extra hits after sinking don\'t increase hits', () => {
        const s = new Ship(1);
        s.hit();
        s.hit();
        expect(s.hits).toEqual(1);
    })
});