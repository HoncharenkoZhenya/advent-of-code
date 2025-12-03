const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./03/${FILE_NAME}.txt`, 'utf8');

const banks = data
    .split('\n')
    .filter(Boolean)
    .map(r => r.split('').map(Number));

const getLargestJoltage = (bank, count) => {
    if (count === 0) return undefined;
    let firstLargest = 0;
    let firstLargestIndex = 0;

    for (let i = 0; i < bank.length - count + 1; i++) {
        if (bank[i] > firstLargest) {
            firstLargest = bank[i];
            firstLargestIndex = i;
        }
    }

    return Number(`${firstLargest}${getLargestJoltage(bank.slice(firstLargestIndex + 1), count - 1) ?? ''}`);
}

const largestJoltage = banks.map(r => {
    return getLargestJoltage(r, 12)
});

const sum = largestJoltage.reduce((acc, curr) => acc + curr, 0);

console.log('MY_REG sum: ', sum);
