const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./06/${FILE_NAME}.txt`, 'utf8').trim().split('\n');

const field = Array.from({ length: 1000 }, () => Array.from({ length: 1000 }, () => 0));

console.log('MY_REG START!!!: ', field.flat().filter(Boolean).length);

for (let command of data) {
    let action;
    if (command.includes('turn on')) {
        action = 'on';
    } else if (command.includes('turn off')) {
        action = 'off';
    } else {
        action = 'toggle';
    }

    const [x1, y1, x2, y2] = command.match(/\d+/g).map(Number);

    for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
            if (action === 'on') {
                field[i][j] = field[i][j] + 1;
            } else if (action === 'off') {
                field[i][j] = Math.max(field[i][j] - 1, 0);
            } else {
                field[i][j] = field[i][j] + 2;
            }
        }
    }
}

const res = field.flat().reduce((acc, el) => acc + el, 0);

console.log('MY_REG res: ', res);
