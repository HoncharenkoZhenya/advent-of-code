const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./21/${FILE_NAME}.txt`, 'utf8');

const BFS_DIRECTIONS = {
    '^': [-1, 0],
    '>': [0, 1],
    'v': [1, 0],
    '<': [0, -1]
};

const KEYPAD = {
    7: [0, 0],
    8: [0, 1],
    9: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    1: [2, 0],
    2: [2, 1],
    3: [2, 2],
    X: [3, 0],
    0: [3, 1],
    A: [3, 2]
};

const DIRECTIONS = {
    X: [0, 0],
    '^': [0, 1],
    A: [0, 2],
    '<': [1, 0],
    'v': [1, 1],
    '>': [1, 2],
};

const getCommand = (input, start, end) => {
    const queue = [{ ...input[start], path: '' }];
    const distances = {};

    if (start === end) {
        return ['A'];
    }

    let allPaths = [];
    while (queue.length) {
        const current = queue.shift();

        if (current[1] === input[end][1] && current[0] === input[end][0]) {
            allPaths.push(current.path + 'A');
            continue;
        }

        if (distances[`${current[1]},${current[0]}`] !== undefined && distances[`${current[1]},${current[0]}`] < current.path.length) {
            continue;
        }

        Object.entries(BFS_DIRECTIONS).forEach(([direction, vector]) => {
            const position = [current[0] + vector[0], current[1] + vector[1]]

            if (input.X[1] === position[1] && input.X[0] === position[0]) {
                return;
            }

            const button = Object.values(input).find(button => button[1] === position[1] && button[0] === position[0]);

            if (button !== undefined) {
                const newPath = current.path + direction;

                if (distances[`${position[1]},${position[0]}`] === undefined || distances[`${position[1]},${position[0]}`] >= newPath.length) {
                    queue.push({ ...position, path: newPath });
                    distances[`${position[1]},${position[0]}`] = newPath.length;
                }
            }
        });
    }

    return allPaths.sort((a, b) => a.length - b.length);
}

const getKeyPresses = (input, code, robot, memo) => {
    const key = `${code},${robot}`;
    if (memo[key] !== undefined) {
        return memo[key];
    }

    let current = 'A';
    let length = 0;
    for (let i = 0; i < code.length; i++) {
        const moves = getCommand(input, current, code[i]);
        if (robot === 0) {
            length += moves[0].length;
        } else {
            length += Math.min(...moves.map(move => getKeyPresses(DIRECTIONS, move, robot - 1, memo)));
        }
        current = code[i];
    }

    memo[key] = length;
    return length;
}

const keycodes = data.trim().split('\n').filter(Boolean);
const memo = {};

const result = keycodes.reduce((sum, code) => {
    const numerical = parseInt((code.split('').filter(character => character.match(/\d/)).join('')));
    return sum + numerical * getKeyPresses(KEYPAD, code, 2, memo);
}, 0);

console.log('result: ', result);
