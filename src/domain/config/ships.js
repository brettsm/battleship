export const SHIP_TYPES = Object.freeze([
    {   id: 'aircraft-carrier',     name: 'Aircraft Carrier',   length: 5 },
    {   id: 'battleship',           name: 'Battleship',         length: 4 },
    {   id: 'cruiser',              name: 'Cruiser',            length: 3 },
    {   id: 'submarine',            name: 'Submarine',          length: 2 },
    {   id: 'destroyer',            name: 'Destroyer',          length: 2 }
]);

export const SHIP_BY_ID = Object.freeze(
    Object.fromEntries(SHIP_TYPES.map((piece) => [piece.id, piece]))
);
   