const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./03/${FILE_NAME}.txt`, 'utf8');

const banks = data
    .split('\n')
    .filter(Boolean)
    .map(r => r.split('').map(Number));

const getLargestJoltage = (bank) => {
    let firstLargest = 0;
    let firstLargestIndex = 0;
    let secondLargest = 0;

    for (let i = 0; i < bank.length - 1; i++) {
        if (bank[i] > firstLargest) {
            firstLargest = bank[i];
            firstLargestIndex = i;
        }
    }

    for (let i = firstLargestIndex + 1; i < bank.length; i++) {
        if (bank[i] > secondLargest) {
            secondLargest = bank[i];
        }
    }

    return Number(`${firstLargest}${secondLargest}`);
}

const largestJoltage = banks.map(getLargestJoltage);

const sum = largestJoltage.reduce((acc, curr) => acc + curr, 0);

console.log('MY_REG sum: ', sum);
