const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./02/${FILE_NAME}.txt`, 'utf8');

const ranges = data
    .split('\n')
    .filter(Boolean)[0]
    .split(',')
    .map(r => r.split('-').map(Number));

const checkIsIdValid = (id) => {
    if (id.length % 2 !== 0) {
        return true;
    }

    const [firstHalf, secondHalf] = [
        id.slice(0, id.length / 2),
        id.slice(id.length / 2),
    ];

    return firstHalf !== secondHalf
}

let invalidIdsSum = 0;

for (let range of ranges) {
    const [start, end] = range;
    for (let id = start; id <= end; id++) {
        if (!checkIsIdValid(id.toString())) {
            invalidIdsSum += id;
        }
    }
}

console.log('MY_REG invalidIdsSum: ', invalidIdsSum);


