export const key = ({ x, y }) => x*10 + y;

export const cellsFor = (length, { x, y }, dir) => {
    return Array.from({ length }, (_, i) => 
        dir === 'h' ? { x: x + i, y: y } : { x: x, y: y + i }
    );
}