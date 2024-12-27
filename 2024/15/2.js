const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const EXAMPLE_FILE_NAME2 = 'exampleData2';
const EXAMPLE_FILE_NAME3 = 'exampleData3';
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

const fieldOld = fieldStr.split('\n').map(row => row.split(''));

const field = fieldOld.reduce((acc, row, i) => {
    const newRow = row.reduce((acc, cell) => {
        let newItems = []
        if (cell === '#') {
            newItems = ['#', '#'];
        } else if (cell === '.') {
            newItems = ['.', '.'];
        } else if (cell === 'O') {
            newItems = ['[', ']'];
        } else {
            newItems = ['@', '.'];
        }

        acc.push(...newItems);

        return acc;
    }, []);

    acc.push(newRow);

    return acc;
}, []);

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

moves.forEach((move, idx) => {
    makeMove(move, robotPosition);
});

const boxPositions = field.reduce((acc, row, i) => {
    row.forEach((cell, j) => {
        if (cell === '[') {
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

    const isCanMove = canPush(currentPosition, move);

    if (!isCanMove) {
        return;
    }

    if (move === '^' || move === 'v') {
        pushVertical(currentPosition, direction);
        field[currentPosition[0]][currentPosition[1]] = '.';
        field[nextItemPosition[0]][nextItemPosition[1]] = '@';
    } else {
        pushHorisontical(currentPosition, direction);
    }
    robotPosition = nextItemPosition;
    field[currentPosition[0]][currentPosition[1]] = '.';
    field[nextItemPosition[0]][nextItemPosition[1]] = '@';
}

function pushVertical(position, direction) {
    const pushItems = getPushVerticalItems(position, direction);
    const itemsToPush = pushItems
        .filter(([r, c]) => field[r][c] !== '@');

    const itemsToPushCollection = itemsToPush.map((position) => {
        return {
            position, item: field[position[0]][position[1]]
        }
    });

    itemsToPush.forEach((position) => {
        field[position[0]][position[1]] = '.';
    });

    itemsToPushCollection.forEach(({ position, item }) => {
        const nextPosition = [position[0] + direction[0], position[1] + direction[1]];
        field[nextPosition[0]][nextPosition[1]] = item;
    });
}

function getPushVerticalItems(position, direction, itemsToPush = []) {
    itemsToPush.push(position);

    let nextPosition = [position[0] + direction[0], position[1] + direction[1]];
    let nextItem = field[nextPosition[0]][nextPosition[1]];
    if (nextItem === '.') {
        return itemsToPush;
    }
    let changeCol = nextItem === ']' ? -1 : 1;
    let nextHalfBoxPosition = [nextPosition[0], nextPosition[1] + changeCol];
    let nextHalfBoxItem = field[nextHalfBoxPosition[0]][nextHalfBoxPosition[1]];
    if (nextHalfBoxItem === '.') {
        return itemsToPush;
    }

    itemsToPush = itemsToPush.concat(getPushVerticalItems(nextPosition, direction, itemsToPush), getPushVerticalItems(nextHalfBoxPosition, direction, itemsToPush));

    return [...new Set(itemsToPush.map(r => r.join('_')))].map(r => r.split('_').map(Number));
}

function pushHorisontical(positionOriginal, direction) {
    const findFunction = direction[1] === -1 ? 'lastIndexOf' : 'indexOf';
    let getNearestEmpty = field[positionOriginal[0]][findFunction]('.', positionOriginal[1]);
    let replacedItems;
    if (direction[1] === -1) {
        replacedItems = field[positionOriginal[0]].slice(getNearestEmpty + 1, positionOriginal[1] + 1);
        field[positionOriginal[0]].splice(getNearestEmpty, replacedItems.length, ...replacedItems)
    } else {
        replacedItems = field[positionOriginal[0]].slice(positionOriginal[1], getNearestEmpty);
        field[positionOriginal[0]].splice(positionOriginal[1] + 1, replacedItems.length, ...replacedItems)
    }
}

function canPush(position, move) {
    const direction = directions[move];

    const nextItemPosition = [position[0] + direction[0], position[1] + direction[1]];

    if (nextItemPosition[0] < 0 || nextItemPosition[0] >= maxRow || nextItemPosition[1] < 0 || nextItemPosition[1] >= mayCol) {
        return false;
    }

    const nextItem = field[nextItemPosition[0]][nextItemPosition[1]];

    if (nextItem === '#') {
        return false;
    }

    if (move === '^' || move === 'v') {
        return canPushVertical(nextItemPosition, move);
    } else {
        return canPushHorisontical(nextItemPosition, move);
    }
}

function canPushVertical(position, move) {
    const direction = directions[move];

    const currentItem = field[position[0]][position[1]];

    if (currentItem === '.') {
        return true;
    }

    let changeCol = currentItem === ']' ? -1 : 1;

    const currentHalfBoxPosition = [position[0], position[1] + changeCol];

    const nextItemPosition = [position[0] + direction[0], position[1] + direction[1]];
    const nextItem = field[nextItemPosition[0]][nextItemPosition[1]];


    const nextHalfBoxPosition = [position[0] + direction[0], position[1] + direction[1] + changeCol];
    const nextHalfBoxItem = field[nextHalfBoxPosition[0]][nextHalfBoxPosition[1]];

    if (nextItem === '.' && nextHalfBoxItem === '.') {
        return true;
    }

    const canPushLeft = canPush(position, move);
    const canPushRight = canPush(currentHalfBoxPosition, move);

    return canPushLeft && canPushRight;
}

function canPushHorisontical(position, move) {
    const direction = directions[move];
    const nextItemPosition = [position[0] + direction[0], position[1] + direction[1]];

    const nextItem = field[nextItemPosition[0]][nextItemPosition[1]];

    if (nextItem === '.') {
        return true;
    }

    return canPush(position, move);
}
