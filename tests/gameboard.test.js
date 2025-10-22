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

// TODO: test to make sure you can't add the same piece twice maybe?


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

    const game = new Gameboard();
    game.place(new Ship(2), { x: 0, y: 0 });
    test('placed horizontal if not specified', () => {
        expect(gb.isOccupied({ x: 1, y: 0 })).toBe(true);
        expect(gb.isOccupied({ x: 0, y: 0 })).toBe(true);
        expect(gb.isOccupied({ x: 0, y: 1 })).toBe(false);
    });

    let vgb = new Gameboard();
    let vs = new Ship(2);
    vgb.place(vs, { x: 0, y: 0 }, 'v');
    test.each([
        [0, 0, true],
        [0, 1, true],
        [1, 0, false],
        [0, 2, false]
    ])('can place a ship vertically', (x, y, bool) => {
        expect(vgb.isOccupied({x: x, y: y})).toBe(bool);
    });

    let gb2 = new Gameboard();
    let long = new Ship(4);
    let long2 = new Ship(4);
    test('throws out of bounds', () => {
        expect(() => gb2.place(long, { x: 8, y: 0 }, 'h')).toThrow();
        expect(() => gb2.place(long2, { x: 0, y: 8 }, 'v')).toThrow();
        expect(() => gb2.place(new Ship(2), { x: -1, y: 0}, 'v')).toThrow();
        expect(() => gb2.place(new Ship(2), { x: 0, y: -1}, 'v')).toThrow();
    });

    const overlapGb = new Gameboard();
    const ship1 = new Ship(2);
    const ship2 = new Ship(2);
    overlapGb.place(ship1, { x: 0, y: 0 }, 'h');
    test('throws on overlap', () => {
        expect(() => overlapGb.place(ship2, { x: 1, y: 0 }, 'v')).toThrow();
        expect(() => overlapGb.place(new Ship(2), { x: 5, y: 5 }, 'v')).not.toThrow();
    });

    test('throws when adding same ship twice', () => {
        const sameShip = new Ship(1);
        const gameb = new Gameboard();

        gameb.place(sameShip, { x: 0, y: 0 });
        expect(() => gameb.place(sameShip, { x: 5, y: 5 })).toThrow();
    })

    describe('attack module', () => {
        test('receiveAttack increases ship\'s hits count', () => {
            const gb = new Gameboard();
            const hitShip = new Ship(2);
            gb.place(hitShip, { x: 0, y: 0 }, 'h');
            gb.receiveAttack({ x: 0, y: 0 });
            expect(hitShip.hits).toEqual(1);
            expect(gb.isHit({ x: 0, y: 0 })).toBe(true);
        });

        test('records misses', () => {
            const gb = new Gameboard();
            gb.receiveAttack({ x: 1, y: 1 });
            expect(gb.isMissed({ x: 1, y: 1 })).toBe(true);
        });

        test('tells when all are sunk', () => {
            const gb = new Gameboard();
            gb.place(new Ship(1), { x: 0, y: 0 });
            gb.receiveAttack({ x: 0, y: 0 });
            expect(gb.allSunk()).toBe(true);
            gb.place(new Ship(1), { x: 1, y: 1 });
            expect(gb.allSunk()).toBe(false);
        });

        test('throws when coords oob' , () => {
            const gb = new Gameboard();
            expect(() => gb.receiveAttack({ x: -1, y: -1 })).toThrow();
        })
    });


});