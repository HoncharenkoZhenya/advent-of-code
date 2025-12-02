const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./01/${FILE_NAME}.txt`, 'utf8');

const columns = data
    .split('\n')
    .filter(Boolean)
    .map(row => ({
        direction: row[0],
        count: Number(row.slice(1)),
    }))

let currentPosition = 50;

const MAX_POSITION = 99;

const rotate = (position, direction, count) => {
    switch (direction) {
        case 'L':
            return (position - count + MAX_POSITION + 1) % (MAX_POSITION + 1);
        case 'R':
            return (position + count) % (MAX_POSITION + 1);
        default:
            throw new Error(`Unknown direction: ${direction}`);
    }
}

let ZERO_POSITION = 0;

for (const column of columns) {
    currentPosition = rotate(currentPosition, column.direction, column.count);

    if (currentPosition === 0) {
        ZERO_POSITION += 1;
    }
}

console.log('MY_REG ZERO_POSITION: ', ZERO_POSITION);
