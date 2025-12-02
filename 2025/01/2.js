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
            let zeroMovesL = Math.abs(Math.floor((position - count) / (MAX_POSITION + 1)));
            if (position === 0 && zeroMovesL > 0) {
                zeroMovesL--;
            }

            return {
                position: (position - count + (MAX_POSITION + 1) * Math.abs(Math.floor((position - count) / (MAX_POSITION + 1)))) % (MAX_POSITION + 1),
                zeroMoves: zeroMovesL,
            }
        case 'R':
            let zeroMovesR = Math.abs(Math.floor((position + count) / (MAX_POSITION + 1)));
            let newPositionR = (position + count) % (MAX_POSITION + 1);
            if (newPositionR === 0 && zeroMovesR > 0) {
                zeroMovesR--;
            }

            return {
                position: newPositionR,
                zeroMoves: zeroMovesR,
            }
        default:
            throw new Error(`Unknown direction: ${direction}`);
    }
}

let ZERO_POSITION = 0;

for (const column of columns) {
    const {position, zeroMoves} = rotate(currentPosition, column.direction, column.count);

    if (position === 0) {
        ZERO_POSITION += 1;
    }

    currentPosition = position;

    ZERO_POSITION += zeroMoves;
}

console.log('MY_REG ZERO_POSITION: ', ZERO_POSITION);
