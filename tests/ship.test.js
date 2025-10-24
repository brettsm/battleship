import { Ship } from '../src/domain/ship.js';
import { SHIP_TYPES } from '../src/domain/config/ships.js';

describe('ship class properties', () => {
    test('creates a certain type of ship', () => {
        let ac = new Ship('aircraft-carrier');
        expect(ac.type).toBe(SHIP_TYPES[0]);
    });
    test.each(
        [null, -1, 'h', Number.NaN, undefined]
    )('new Ship(%p) throws', (val) => {
        expect(() => new Ship(val)).toThrow();
    });
});

describe('Ship.hit() and sink()', () => {
    test('hit and sink work as expected', () => {
        const s = new Ship('destroyer');
        expect(s.hits).toEqual(0);
        s.hit();
        expect(s.hits).toEqual(1);

        expect(s.isSunk()).toBe(false);

        s.hit();
        expect(s.hits).toEqual(2);

        expect(s.isSunk()).toBe(true);

    });

    test('extra hits after sinking don\'t increase hits', () => {
        const s = new Ship('destroyer');
        s.hit();
        s.hit();
        s.hit();
        expect(s.hits).toEqual(2);
    });
});