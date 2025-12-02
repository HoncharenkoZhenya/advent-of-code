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
    const l = id.length;

    for (let i = 0; i < l - 1; i++) {
        let pattern = id.slice(0, i + 1);
        if (l % pattern.length !== 0) {
            continue;
        }

        const repeatsCount = l / pattern.length;
        let finalInvalidId = '';
        for (let r = 0; r < repeatsCount; r++) {
            finalInvalidId += pattern;
        }
        if (finalInvalidId === id) {
            return false;
        }
    }

    return true
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


