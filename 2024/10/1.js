const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs
    .readFileSync(`./10/${FILE_NAME}.txt`, 'utf8')
    .split(('\n'))
    .map(r => r.split('').map(Number));

const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

const rows = data.length;
const cols = data[0].length;

const res = getAllTrailheads(data);

console.log('result: ', res);

function getAllTrailheads() {
    let totalScore = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (data[row][col] === 0) {
                totalScore += getAllRoads(row, col);
            }
        }
    }

    return totalScore;
}

function getAllRoads(startRow, startCol) {
    const startPosition = [[startRow, startCol]];

    const visitedPositions = new Set();
    visitedPositions.add(`${startRow},${startCol}`);
    const finishedRoads = new Set();

    while (startPosition.length > 0) {
        const [row, col] = startPosition.shift();
        const currentPositionValue = data[row][col];

        for (const [directionRow, directionCol] of directions) {
            const newRow = row + directionRow;
            const newCol = col + directionCol;

            if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                !visitedPositions.has(`${newRow},${newCol}`)
            ) {
                const nextPosition = data[newRow][newCol];
                if (nextPosition === currentPositionValue + 1) {
                    visitedPositions.add(`${newRow},${newCol}`);
                    startPosition.push([newRow, newCol]);
                    if (nextPosition === 9) {
                        finishedRoads.add(`${newRow},${newCol}`);
                    }
                }
            }
        }
    }

    return finishedRoads.size;
}
