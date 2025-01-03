const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./18/${FILE_NAME}.txt`, 'utf8').trim();

// let STEPS = 5;
let STEPS = 100;

let field = data.split('\n').map(row => row.split(''));

field[0][0] = '#';
field[0][field[0].length - 1] = '#';
field[field.length - 1][0] = '#';
field[field.length - 1][field[0].length - 1] = '#';

const neighbors = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
]

while (STEPS--) {
    const copyField = field.map(row => [...row]);

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (i === 0 && j === 0) {
                continue;
            }

            if (i === 0 && j === field[i].length - 1) {
                continue;
            }

            if (i === field.length - 1 && j === 0) {
                continue;
            }

            if (i === field.length - 1 && j === field[i].length - 1) {
                continue;
            }

            const currentData = field[i][j];
            const neighborData = neighbors.map(([x, y]) => field[i + x]?.[j + y]).filter(Boolean);

            const onNeighbors = neighborData.filter(r => r === '#').length;

            if (currentData === '.') {
                if (onNeighbors === 3) {
                    copyField[i][j] = '#';
                }
            } else {
                if (!(onNeighbors === 2 || onNeighbors === 3)) {
                    copyField[i][j] = '.';
                }
            }
        }
    }

    field = copyField;
}

const res = field.flat().filter(r => r === '#').length;

console.log('MY_REG res: ', res);
