const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./4/${FILE_NAME}.txt`, 'utf8');

const lines = data.split('\n').filter(Boolean);

const xSize = lines[0].length;
const ySize = lines.length;

let result = 0;

for (let y = 0; y < xSize; y++) {
    for (let x = 0; x < ySize; x++) {
        if (lines[y][x] !== 'X') {
            continue;
        }

        const hasLtrWord = checkLtr(x, y);
        const hasRtlWord = checkRtl(x, y);
        const hasTtbWord = checkTtb(x, y);
        const hasBttWord = checkBtt(x, y);
        const hasDtlWord = checkDtl(x, y);
        const hasDtrWord = checkDtr(x, y);
        const hasDblWord = checkDbl(x, y);
        const hasDbrWord = checkDbr(x, y);

        const res = [
            hasLtrWord,
            hasRtlWord,
            hasTtbWord,
            hasBttWord,
            hasDtlWord,
            hasDtrWord,
            hasDblWord,
            hasDbrWord,
        ].filter(Boolean).length;

        result += res;
    }
}

console.log('result: ', result);

function checkLtr(x, y) {
    if (x + 3 >= xSize) {
        return false;
    }

    return !(lines[y][x + 1] !== 'M' || lines[y][x + 2] !== 'A' || lines[y][x + 3] !== 'S');


}

function checkRtl(x, y) {
    if (x - 3 < 0) {
        return false;
    }

    return !(lines[y][x - 1] !== 'M' || lines[y][x - 2] !== 'A' || lines[y][x - 3] !== 'S');
}

function checkTtb(x, y) {
    if (y + 3 >= ySize) {
        return false;
    }

    return !(lines[y + 1][x] !== 'M' || lines[y + 2][x] !== 'A' || lines[y + 3][x] !== 'S');
}

function checkBtt(x, y) {
    if (y - 3 < 0) {
        return false;
    }

    return !(lines[y - 1][x] !== 'M' || lines[y - 2][x] !== 'A' || lines[y - 3][x] !== 'S');
}

function checkDtl(x, y) {
    if (x + 3 >= xSize || y + 3 >= ySize) {
        return false;
    }

    return !(lines[y + 1][x + 1] !== 'M' || lines[y + 2][x + 2] !== 'A' || lines[y + 3][x + 3] !== 'S');
}

function checkDtr(x, y) {
    if (x - 3 < 0 || y + 3 >= ySize) {
        return false;
    }

    return !(lines[y + 1][x - 1] !== 'M' || lines[y + 2][x - 2] !== 'A' || lines[y + 3][x - 3] !== 'S');
}

function checkDbl(x, y) {
    if (x + 3 >= xSize || y - 3 < 0) {
        return false;
    }

    return !(lines[y - 1][x + 1] !== 'M' || lines[y - 2][x + 2] !== 'A' || lines[y - 3][x + 3] !== 'S');
}

function checkDbr(x, y) {
    if (x - 3 < 0 || y - 3 < 0) {
        return false;
    }

    return !(lines[y - 1][x - 1] !== 'M' || lines[y - 2][x - 2] !== 'A' || lines[y - 3][x - 3] !== 'S');
}
