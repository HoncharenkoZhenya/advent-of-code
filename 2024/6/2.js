const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./6/${FILE_NAME}.txt`, 'utf8');

const field = data
    .split('\n')
    .filter(Boolean)
    .map(r => r.split(''));

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

function getCopyOfField() {
    return field.map((row) => {
        return row.map((cell) => {
            return cell;
        });
    });
}

const STARTED_DIRECTION = 'u';
const STARTED_Y_POSITION = field.findIndex((row) => {
    return row.includes('^');
});
const STARTED_X_POSITION = field[STARTED_Y_POSITION].indexOf('^');

function finishMoves(localField) {
    let currentDirection = STARTED_DIRECTION;
    let currentYPosition = STARTED_Y_POSITION
    let currentXPosition = STARTED_X_POSITION
    let isLooped = false;

    const visitedPlacesWithDirection = [];

    while (true) {
        if (visitedPlacesWithDirection.includes(`${currentXPosition}_${currentYPosition}_${currentDirection}`)) {
            isLooped = true;
            break;
        }
        visitedPlacesWithDirection.push(`${currentXPosition}_${currentYPosition}_${currentDirection}`);

        const [moveX, moveY] = directionMoves[currentDirection];
        const nextXPosition = currentXPosition + moveX;
        const nextYPosition = currentYPosition + moveY;

        if (nextXPosition < 0 || nextXPosition >= maxX || nextYPosition < 0 || nextYPosition >= maxY) {
            break;
        }

        const nextSymbol = localField[nextYPosition][nextXPosition];

        if (nextSymbol === '#') {
            currentDirection = changeDirection(currentDirection);
            continue;
        }

        currentXPosition = nextXPosition;
        currentYPosition = nextYPosition;

    }

    return {
        isLooped,
    }
}

let loopedCount = 0;

for (let x = 0; x <maxX; x++) {
    for (let y = 0; y < maxY; y++) {
        if (field[y][x] === '#' || field[y][x] === '^') {
            continue;
        }

        const newField = getCopyOfField();

        newField[y][x] = '#';

        const result = finishMoves(newField);

        if (result.isLooped) {
            loopedCount++;
        }
    }
}

console.log('result: ', loopedCount);
