const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./02/${FILE_NAME}.txt`, 'utf8').trim();

const commands = data.split('\n');

const maxWidth = 2;
const maxHeight = 2;

let currentPosition = [0, 2];

const MOVES = {
    U: [0, -1],
    D: [0, 1],
    L: [-1, 0],
    R: [1, 0]
}

const KEYBOARD = {
    '0_2': 1,
    '1_1': 2,
    '1_2': 3,
    '1_3': 4,
    '2_0': 5,
    '2_1': 6,
    '2_2': 7,
    '2_3': 8,
    '2_4': 9,
    '3_1': 'A',
    '3_2': 'B',
    '3_3': 'C',
    '4_2': 'D',
}

const AVAILABLE_POSITIONS = [
    '0_2',
    '1_1',
    '1_2',
    '1_3',
    '2_0',
    '2_1',
    '2_2',
    '2_3',
    '2_4',
    '3_1',
    '3_2',
    '3_3',
    '4_2',
]

let code = '';

for (let command of commands) {
    let moves = command.split('');

    for (let move of moves) {
        const [x, y] = currentPosition;
        const [dx, dy] = MOVES[move];
        let newX = x + dx;
        let newY = y + dy;

        if (AVAILABLE_POSITIONS.includes(`${newY}_${newX}`)) {
            currentPosition = [newX, newY];
        }

    }

    code += KEYBOARD[`${currentPosition[1]}_${currentPosition[0]}`];
}

console.log('MY_REG code: ', code);
