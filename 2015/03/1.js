const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./03/${FILE_NAME}.txt`, 'utf8').trim();

let currentPosition = [0, 0];
const visitedPositions = new Set(['0_0']);

const directions = {
    '^': [0, 1],
    'v': [0, -1],
    '>': [1, 0],
    '<': [-1, 0],
}

for (let direction of data.split('')) {
    const newPosition = [currentPosition[0] + directions[direction][0], currentPosition[1] + directions[direction][1]];
    visitedPositions.add(`${newPosition[0]}_${newPosition[1]}`);
    currentPosition = newPosition;
}

console.log('MY_REG visitedPositions.size: ', visitedPositions.size);
