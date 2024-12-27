const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const EXAMPLE_FILE_NAME2 = 'exampleData2';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./15/${FILE_NAME}.txt`, 'utf8');

const directions = {
    '<': [0, -1],
    '^': [-1, 0],
    '>': [0, 1],
    'v': [1, 0],
}

const [fieldStr, movesStr] = data.split(('\n\n'));

const field = fieldStr.split('\n').map(row => row.split(''));

const maxRow = field.length;
const mayCol = field[0].length;

const moves = movesStr.split('\n').map(row => row.split('')).flat();

let robotPosition = field.reduce((acc, row, i) => {
    const j = row.indexOf('@');
    if (j !== -1) {
        acc = [i, j];
    }
    return acc;
}, []);

moves.forEach((move) => {
    makeMove(move, robotPosition);
});

const boxPositions = field.reduce((acc, row, i) => {
    row.forEach((cell, j) => {
        if (cell === 'O') {
            acc.push([i, j]);
        }
    });

    return acc;
}, []);

const res = boxPositions.reduce((acc, boxPosition) => {
    return acc + (100 * boxPosition[0] + boxPosition[1]);
}, 0);

console.log('result: ', res);

function makeMove(move, currentPosition) {
    const direction = directions[move];
    const nextItemPosition = [currentPosition[0] + direction[0], currentPosition[1] + direction[1]];
    const nextItem = field[nextItemPosition[0]][nextItemPosition[1]]
    if (nextItem === '#') {
        return;
    }

    if (nextItem === '.') {
        field[currentPosition[0]][currentPosition[1]] = '.';
        field[nextItemPosition[0]][nextItemPosition[1]] = '@';
        robotPosition = nextItemPosition;
        return;
    }

    if (!canPush(nextItemPosition, direction)) {
        return;
    }


    const itemsNumsToPush = getItemsToPush(direction, nextItemPosition);

    for (let i = 0; i < itemsNumsToPush; i++) {
        const itemToPush = [currentPosition[0] + direction[0] * (itemsNumsToPush - i), currentPosition[1] + direction[1] * (itemsNumsToPush - i)];
        if (i === itemsNumsToPush - 1) {
            field[currentPosition[0]][currentPosition[1]] = '.';
            field[itemToPush[0]][itemToPush[1]] = '@';
            robotPosition = itemToPush;
        } else {
            field[itemToPush[0]][itemToPush[1]] = 'O';
        }
    }
}

function canPush(position, direction) {
    const nextItemPosition = [position[0] + direction[0], position[1] + direction[1]];

    if (nextItemPosition[0] < 0 || nextItemPosition[0] >= maxRow || nextItemPosition[1] < 0 || nextItemPosition[1] >= mayCol) {
        return false;
    }

    const nextItem = field[nextItemPosition[0]][nextItemPosition[1]];

    if (nextItem === '#') {
        return false;
    }

    if (nextItem === '.') {
        return true;
    }

    return canPush(nextItemPosition, direction);
}

function getItemsToPush(direction, currentPosition, itemsNumsToPush = 1) {
    const checkedPosition = [currentPosition[0] + direction[0], currentPosition[1] + direction[1]];

    if (checkedPosition[0] < 0 || checkedPosition[0] >= maxRow || checkedPosition[1] < 0 || checkedPosition[1] >= mayCol) {
        return itemsNumsToPush;
    }

    if (field[checkedPosition[0]][checkedPosition[1]] === '.') {
        return itemsNumsToPush + 1;

    }

    return getItemsToPush(direction, checkedPosition, itemsNumsToPush + 1);
}
