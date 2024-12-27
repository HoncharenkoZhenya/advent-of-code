const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./2/${FILE_NAME}.txt`, 'utf8');

const rows = data
    .split('\n')
    .filter(Boolean)
    .map(row => row.split(' ').map(Number))

const result = rows
    .map(isValidRow)
    .filter(Boolean)
    .length;

console.log('result: ', result);

function isValidRow(row) {
    const smallestRows = row.map((_, index) => {
        return row.filter((_, i) => i !== index);
    });

    const allRows = [row, ...smallestRows];

    return allRows.some(isValidSmallestRow)
}

function isValidSmallestRow(row) {
    const isIncreasing = row.every((value, index, array) => {
        if (index === 0) {
            return true;
        }

        return value >= array[index - 1];
    });

    const isDecreasing = row.every((value, index, array) => {
        if (index === 0) {
            return true;
        }

        return value <= array[index - 1];
    });

    if (!isIncreasing && !isDecreasing) {
        return false;
    }

    for (let i = 1; i < row.length; i++) {
        const delta = Math.abs(row[i] - row[i - 1]);
        if (delta < 1 || delta > 3) {
            return false;
        }
    }

    return true
}
