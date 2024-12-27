const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs
    .readFileSync(`./11/${FILE_NAME}.txt`, 'utf8')
    .split('\n')
    .filter(Boolean) [0];

let numbers = data.split(' ').map(Number);

let ITERATIONS = 25;

while (ITERATIONS--) {
    numbers = changeNumbers(numbers);
}

console.log('result: ', numbers.length);

function changeNumbers(numbers) {
    const res = [];

    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];

        res.push(...changeNumber(number))
    }

    return res;
}

function changeNumber(number) {
    if (number === 0) {
        return [1];
    }

    if (`${number}`.length % 2 === 0) {
        const digits = `${number}`.split('').map(Number);
        const left = Number(digits.splice(0, digits.length / 2).join(''));
        const right = Number(digits.join(''));

        return [left, right]
    }

    return [number * 2024]
}
