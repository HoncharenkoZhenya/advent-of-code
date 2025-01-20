const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./02/${FILE_NAME}.txt`, 'utf8').trim();

const commands = data.split('\n');

const maxWidth = 2;
const maxHeight = 2;

let currentPosition = [1, 1];

const MOVES = {
    U: [0, -1],
    D: [0, 1],
    L: [-1, 0],
    R: [1, 0]
}

const KEYBOARD = {
    '0_0': 1,
    '0_1': 2,
    '0_2': 3,
    '1_0': 4,
    '1_1': 5,
    '1_2': 6,
    '2_0': 7,
    '2_1': 8,
    '2_2': 9,
}

let code = '';

for (let command of commands) {
    let moves = command.split('');

    for (let move of moves) {
        const [x, y] = currentPosition;
        const [dx, dy] = MOVES[move];
        let newX = x + dx;
        let newY = y + dy;

        if (newX < 0) {
            newX = 0;
        }

        if (newX > maxWidth) {
            newX = maxWidth;
        }

        if (newY < 0) {
            newY = 0;
        }

        if (newY > maxHeight) {
            newY = maxHeight;
        }

        currentPosition = [newX, newY];
    }

    code += KEYBOARD[`${currentPosition[1]}_${currentPosition[0]}`];
}

console.log('MY_REG code: ', code);
