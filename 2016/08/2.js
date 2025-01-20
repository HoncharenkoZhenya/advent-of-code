const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./08/${FILE_NAME}.txt`, 'utf8').trim();

const commands = data.split('\n');

const field = Array.from({ length: 6 }, () => Array.from({ length: 50 }, () => false));

for (let command of commands) {
    if (command.includes('rect')) {
        const [width, height] = command.match(/\d+/g).map(Number);
        rect(width, height);
    }

    if (command.includes('rotate column')) {
        const [x, shift] = command.match(/\d+/g).map(Number);
        rotateColumn(x, shift);
    }

    if (command.includes('rotate row')) {
        const [y, shift] = command.match(/\d+/g).map(Number);
        rotateRow(y, shift);
    }
}

debugPrintField();

const result = field.flat().filter(cell => cell).length;

console.log('MY_REG result: ', result);

function rect(width, height) {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            field[y][x] = true;
        }
    }
}

function rotateColumn(x, shift) {
    const column = field.map(row => row[x]);
    const rotatedColumn = column.map((cell, i) => column[(i - shift + column.length) % column.length]);

    rotatedColumn.forEach((cell, i) => {
        field[i][x] = cell;
    });
}

function rotateRow(y, shift) {
    const row = field[y];
    const rotatedRow = row.map((cell, i) => row[(i - shift + row.length) % row.length]);

    field[y] = rotatedRow;
}

function debugPrintField() {
    field.forEach(row => {
        console.log(row.map(cell => cell ? '#' : '.').join(''));
    });
    console.log();
}
