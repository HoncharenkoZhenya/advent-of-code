const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const EXAMPLE_FILE_NAME2 = 'exampleData2';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./3/${FILE_NAME}.txt`, 'utf8');

const string = data.split('\n').filter(Boolean).reduce((acc, line) => acc + line, '');

const MUL_REG_EXP = /(mul\((\d{1,3}),(\d{1,3})\))|do\(\)|don't\(\)/g;

const allMuls = string
    .match(MUL_REG_EXP)

let shouldAdd = true;

const allPassedMuls = allMuls.reduce((acc, mul) => {
    if (mul === 'do()') {
        shouldAdd = true;
        return acc;
    }

    if (mul === 'don\'t()') {
        shouldAdd = false;
        return acc;
    }

    if (shouldAdd) {
        acc.push(mul);
    }

    return acc;
}, []);

const result = allPassedMuls.map(mul => mul.replace('mul(', '').replace(')', '').split(',').map(Number)).reduce((acc, [a, b]) => acc + a * b, 0);

console.log('result: ', result);
