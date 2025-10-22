export const key = ({ x, y }) => `${x},${y}`;

export const cellsFor = (length, { x, y }, dir) => {
    return Array.from({ length }, (_, i) => 
        dir === 'h' ? { x: x + i, y: y } : { x: x, y: y + i }
    );
}

export const anyOutOfBounds = (cells, size) => 
    cells.some(cell => !inBounds(cell, size));


export const inBounds = ({ x, y }, size) => 
    x >= 0 && y >= 0 && x < size && y < size;
