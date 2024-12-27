const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const EXAMPLE_FILE_NAME2 = 'exampleData2';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./16/${FILE_NAME}.txt`, 'utf8');

const field = data
    .split('\n')
    .filter(Boolean)
    .map(row => row.split(''));

const initialPosition = field.reduce((acc, row, rowIndex) => {
    const startPositionIndex = row.indexOf('S');
    const finishPositionIndex = row.indexOf('E');

    if (startPositionIndex !== -1) {
        acc.startPosition = [rowIndex, startPositionIndex];
    }

    if (finishPositionIndex !== -1) {
        acc.finishPosition = [rowIndex, finishPositionIndex];
    }

    return acc;
}, {
    startPosition: [0, 0],
    finishPosition: [0, 0],
});

const directions = {
    '<': [0, -1],
    '^': [-1, 0],
    '>': [0, 1],
    'v': [1, 0],
};

const player = {
    currentRotate: '>',
    currentPosition: [...initialPosition.startPosition],
    arriveToFinish: false,
    moveCost: 0,
}

const PASSED_POSITIONS = {
    [`${initialPosition.startPosition[0]}_${initialPosition.startPosition[1]}_>`]: 0,
}

let players = [player];

let finishedPlayers = [];

while (true) {
    players = getFinish(players);

    finishedPlayers = finishedPlayers.concat(players.filter(player => player.arriveToFinish));

    const newPlayers = players.filter(player => !player.arriveToFinish);

    if (newPlayers.length === 0) {
        break;
    }

    players = newPlayers;
}

const movesCosts = finishedPlayers.map(player => player.moveCost);

const result = Math.min(...movesCosts);

console.log('result: ', result);

function getFinish(players) {
    const data = players.map((player) => {
        return {
            player,
            moves: getPossibleMoves(player)
        }
    });

    const newPlayers = data.reduce((acc, r) => {
        const currentPlayer = r.player;
        const moves = r.moves;

        const newPlayers = moves.reduce((acc, move) => {
            const newPlayer = structuredClone(currentPlayer);
            let passedPositionKey;
            switch (move.action) {
                case 'move':
                    const [newRow, newCol] = move.toPosition;
                    const newCurrentPosition = [newRow, newCol];

                    newPlayer.currentPosition = newCurrentPosition;
                    newPlayer.moveCost += 1;

                    passedPositionKey = `${newPlayer.currentPosition[0]}_${newPlayer.currentPosition[1]}_${newPlayer.currentRotate}`;
                    if (PASSED_POSITIONS[passedPositionKey] && PASSED_POSITIONS[passedPositionKey] < newPlayer.moveCost) {
                        return acc;
                    }

                    PASSED_POSITIONS[passedPositionKey] = newPlayer.moveCost;

                    acc.push(newPlayer);
                    return acc;
                case 'turnLeft':
                    const newCurrentRotateLeft = turnLeft(newPlayer.currentRotate);

                    newPlayer.currentRotate = newCurrentRotateLeft;
                    const [deltaRow, deltaCol] = directions[newCurrentRotateLeft];
                    newPlayer.currentPosition = [newPlayer.currentPosition[0] + deltaRow, newPlayer.currentPosition[1] + deltaCol];
                    newPlayer.moveCost += 1001;

                    passedPositionKey = `${newPlayer.currentPosition[0]}_${newPlayer.currentPosition[1]}_${newPlayer.currentRotate}`;
                    if (PASSED_POSITIONS[passedPositionKey] && PASSED_POSITIONS[passedPositionKey] < newPlayer.moveCost) {
                        return acc;
                    }

                    PASSED_POSITIONS[passedPositionKey] = newPlayer.moveCost;

                    acc.push(newPlayer);
                    return acc;
                case 'turnRight':
                    const newCurrentRotateRight = turnRight(newPlayer.currentRotate);

                    newPlayer.currentRotate = newCurrentRotateRight;
                    const [deltaRow2, deltaCol2] = directions[newCurrentRotateRight];
                    newPlayer.currentPosition = [newPlayer.currentPosition[0] + deltaRow2, newPlayer.currentPosition[1] + deltaCol2];
                    newPlayer.moveCost += 1001;

                    passedPositionKey = `${newPlayer.currentPosition[0]}_${newPlayer.currentPosition[1]}_${newPlayer.currentRotate}`;
                    if (PASSED_POSITIONS[passedPositionKey] && PASSED_POSITIONS[passedPositionKey] < newPlayer.moveCost) {
                        return acc;
                    }

                    PASSED_POSITIONS[passedPositionKey] = newPlayer.moveCost;

                    acc.push(newPlayer);
                    return acc;
            }
        }, []);

        acc = acc.concat(newPlayers);

        return acc;
    }, []);

    return newPlayers.map(player => {
        const arriveToFinish = player.currentPosition[0] === initialPosition.finishPosition[0] && player.currentPosition[1] === initialPosition.finishPosition[1];

        return {
            ...player,
            arriveToFinish,
        }
    });
}

function getPossibleMoves(player) {
    const { currentPosition, currentRotate } = player;
    const [currentRow, currentCol] = currentPosition;

    const moves = [];

    const canMoveForward = getCanMoveForward(currentPosition, currentRotate);

    if (canMoveForward) {
        moves.push({
            action: 'move',
            toPosition: [currentRow + directions[currentRotate][0], currentCol + directions[currentRotate][1]],
        })
    }

    const catTurnLeft = getCanMoveForward(currentPosition, turnLeft(currentRotate));

    if (catTurnLeft) {
        moves.push({
            action: 'turnLeft',
        })
    }

    const canTurnRight = getCanMoveForward(currentPosition, turnRight(currentRotate));

    if (canTurnRight) {
        moves.push({
            action: 'turnRight',
        })
    }

    return moves;
}

function getCanMoveForward(currentPosition, currentRotate) {
    const [currentRow, currentCol] = currentPosition;

    return field[currentRow + directions[currentRotate][0]] && field[currentRow + directions[currentRotate][0]][currentCol + directions[currentRotate][1]] !== '#';
}

function turnLeft(currentRotate) {
    switch (currentRotate) {
        case '>': return '^';
        case '^': return '<';
        case '<': return 'v';
        case 'v': return '>';
    }
}

function turnRight(currentRotate) {
    switch (currentRotate) {
        case '>': return 'v';
        case 'v': return '<';
        case '<': return '^';
        case '^': return '>';
    }
}
