export class Ship {
    constructor(length) {
        if (typeof(length) !== 'number')
            throw new TypeError('Ship.length expects a number');
        if (!length || length <= 0) {
            throw new Error('ship must have positive length');
        }
        this.length = length;
    }
}