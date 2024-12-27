const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const mapData = fs
    .readFileSync(`./10/${FILE_NAME}.txt`, 'utf8')
    .split(('\n'));

const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

const rows = mapData.length;
const cols = mapData[0].length;

const res = getRating(mapData);
console.log('result: ', res);

function getRating(mapData) {
    const grid = mapData.map((row) => row.split('').map(Number));

    let totalRating = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === 0) {
                totalRating += getWaysCount(row, col, 0, grid);
            }
        }
    }

    return totalRating;
}

function getWaysCount(row, col, currentPositionValue, grid) {
    if (
        row < 0 || row >= rows || col < 0 || col >= cols ||
        grid[row][col] !== currentPositionValue
    ) {
        return 0;
    }

    if (currentPositionValue === 9) {
        return 1;
    }

    const originalValue = grid[row][col];
    grid[row][col] = -1;

    let waysCount = 0;
    for (const [directionRow, directionCol] of directions) {
        waysCount += getWaysCount(row + directionRow, col + directionCol, currentPositionValue + 1, grid);
    }

    grid[row][col] = originalValue;

    return waysCount;
}
