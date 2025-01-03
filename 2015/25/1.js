const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = EXAMPLE_FILE_NAME;

const data = fs.readFileSync(`./25/${FILE_NAME}.txt`, 'utf8').trim();

1-1 - 1
// 2-1 - 2
// 1-2 - 3
// 3-1 - 4
// 2-2 - 5
// 1-3 - 6
// 4-1 - 7
// 3-2 - 8
// 2-3 - 9
// 1-4 - 10
// 5-1 - 11
// 4-2 - 12
// 3-3 - 13
// 2-4 - 14
// 1-5 - 15
// 3010-3019 - 17732116

// Enter the code at row 3010, column 3019.

let initialNumber = 20151125;

let finalPosition = getRow(3010, 3019);
console.log('MY_REG finalPosition: ', finalPosition);

while (--finalPosition) {
    initialNumber = getNext(initialNumber);
}

console.log('MY_REG initialNumber: ', initialNumber);

// 1601130

function getNext(number) {
    return number * 252533 % 33554393;
}


function getRow(row, col) {
    let colStart = getColStart(col);
    let res = colStart;

    let i = 1;
    let next = col;

    while (i < row) {
        res += next;

        next++;
        i++;
    }

    return res;
}

function getColStart(col) {
    let res = col;
    while (col--) {
        res += col;
    }
    return res;
}
