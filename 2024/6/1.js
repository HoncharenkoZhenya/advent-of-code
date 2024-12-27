const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./6/${FILE_NAME}.txt`, 'utf8');

const field = data
    .split('\n')
    .filter(Boolean);

const maxX = field[0].length;
const maxY = field.length;

const directionMoves = {
    'u': [0, -1],
    'd': [0, 1],
    'l': [-1, 0],
    'r': [1, 0],
}

function changeDirection(currentDirection) {
    switch (currentDirection) {
        case 'u':
            return 'r';
        case 'r':
            return 'd';
        case 'd':
            return 'l';
        case 'l':
            return 'u';
    }
}

let currentDirection = 'u';
let currentYPosition = field.findIndex((row) => {
    return row.includes('^');
});
let currentXPosition = field[currentYPosition].indexOf('^');

const visitedPlaces = [`${currentXPosition}_${currentYPosition}`];

while (true) {
    const [moveX, moveY] = directionMoves[currentDirection];
    const nextXPosition = currentXPosition + moveX;
    const nextYPosition = currentYPosition + moveY;

    if (nextXPosition < 0 || nextXPosition >= maxX || nextYPosition < 0 || nextYPosition >= maxY) {
        break;
    }

    const nextSymbol = field[nextYPosition][nextXPosition];

    if (nextSymbol === '#') {
        currentDirection = changeDirection(currentDirection);
        continue;
    }

    currentXPosition = nextXPosition;
    currentYPosition = nextYPosition;

    visitedPlaces.push(`${currentXPosition}_${currentYPosition}`);
}

const result = [...new Set(visitedPlaces)].length

console.log('result: ', result);
