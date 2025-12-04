const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./04/${FILE_NAME}.txt`, 'utf8');

const grid = data
    .split('\n')
    .filter(Boolean)
    .map(r => r.split(''));

let result = 0;

const getFullAdjacentPositions = (x, y) => {
    const positions = [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1]
    ];

    return positions.filter(([nX, nY]) => {
        if (grid[nX] && grid[nX][nY]) {
            return grid[nX][nY] === '@';
        }
    }).length;
}

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === '.') {
            continue;
        }

        const fullAdjacentPositions = getFullAdjacentPositions(i, j);

        if (fullAdjacentPositions < 4) {
            result++;
        }
    }
}

console.log('MY_REG result: ', result);
