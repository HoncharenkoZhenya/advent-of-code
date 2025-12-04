const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./04/${FILE_NAME}.txt`, 'utf8');

const grid = data
    .split('\n')
    .filter(Boolean)
    .map(r => r.split(''));

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


let finalResult = 0;

while (true) {
    let result = 0;
    let positions = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '.') {
                continue;
            }

            const fullAdjacentPositions = getFullAdjacentPositions(i, j);

            if (fullAdjacentPositions < 4) {
                positions.push([i, j]);
                result++;
            }
        }
    }

    if (result === 0) {
        break;
    }

    for (let pos of positions) {
        const [x, y] = pos;
        grid[x][y] = '.';
    }

    finalResult += result;
}

console.log('MY_REG finalResult: ', finalResult);
