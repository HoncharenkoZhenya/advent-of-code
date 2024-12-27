const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const EXAMPLE_FILE_NAME2 = 'exampleData2';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./9/${FILE_NAME}.txt`, 'utf8').split('\n')[0];

const numbers = data.split('').map(Number);

const checksum = numbers.reduce((acc, number, index) => {
    const isEmpty = index % 2 !== 0;
    const fillData = isEmpty ? '.' : (index) / 2;
    const data = new Array(number).fill(fillData);

    acc = acc.concat(data)

    return acc;
}, []);

const checksumLength = checksum.length;

const checksumSorted = [];

let lastIterationIndex = checksumLength;

for (let i = 0; i < lastIterationIndex; i++) {
    const item = checksum[i];
    if (checksum[i] !== '.') {
        checksumSorted.push(item);
        continue;
    }

    const lastItemIndex = checksum.findLastIndex((item) => item !== '.');

    if (lastItemIndex <= i) {
        continue;
    }

    const lastItem = checksum[lastItemIndex];

    checksumSorted.push(lastItem);
    lastIterationIndex = lastItemIndex;
    checksum[lastItemIndex] = '.';
}

const res = checksumSorted.reduce((acc, item, index) => {
    if (item === '.') {
        return acc;
    }

    acc += Number(item) * index;

    return acc;
}, 0);

console.log('result: ', res);
