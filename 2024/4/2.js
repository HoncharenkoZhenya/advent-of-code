const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData2';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./4/${FILE_NAME}.txt`, 'utf8');

const lines = data.split('\n').filter(Boolean);

const xSize = lines[0].length;
const ySize = lines.length;

const toR = [];
const toL = [];

for (let y = 0; y < xSize; y++) {
    for (let x = 0; x < ySize; x++) {
        if (lines[y][x] !== 'M') {
            continue;
        }

        const rb = findRB(x, y);
        if (rb) {
            toR.push(`${y+1}_${x+1}`);
        }

        const lb = findLB(x, y);
        if (lb) {
            toL.push(`${y+1}_${x-1}`);
        }

        const rt = findRT(x, y);
        if (rt) {
            toL.push(`${y-1}_${x+1}`);
        }

        const lt = findLT(x, y);
        if (lt) {
            toR.push(`${y-1}_${x-1}`);
        }
    }
}

const res = toR.filter(r => toL.includes(r)).length;

console.log('res: ', res);

function findRB(x, y) {
    if (x + 2 >= xSize || y + 2 >= ySize) {
        return false;
    }

    return !(lines[y + 1][x + 1] !== 'A' || lines[y + 2][x + 2] !== 'S');
}

function findLB(x, y) {
    if (x - 2 < 0 || y + 2 >= ySize) {
        return false;
    }

    return !(lines[y + 1][x - 1] !== 'A' || lines[y + 2][x - 2] !== 'S');
}

function findRT(x, y) {
    if (x + 2 >= xSize || y - 2 < 0) {
        return false;
    }

    return !(lines[y - 1][x + 1] !== 'A' || lines[y - 2][x + 2] !== 'S');
}

function findLT(x, y) {
    if (x - 2 < 0 || y - 2 < 0) {
        return false;
    }

    return !(lines[y - 1][x - 1] !== 'A' || lines[y - 2][x - 2] !== 'S');
}
