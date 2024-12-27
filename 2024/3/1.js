const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./3/${FILE_NAME}.txt`, 'utf8');

const string = data.split('\n').filter(Boolean).reduce((acc, line) => acc + line, '');

const MUL_REG_EXP = /mul\((\d{1,3}),(\d{1,3})\)/g;

const allMuls = string
    .match(MUL_REG_EXP)
    .map(mul => mul.replace('mul(', '').replace(')', '').split(',').map(Number))

const result = allMuls.reduce((acc, [a, b]) => acc + a * b, 0);

console.log('result: ', result);
