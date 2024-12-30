const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./12/${FILE_NAME}.txt`, 'utf8').trim();

const nums = [...data.matchAll(/-?\d+/g)]
    .map((match) => parseInt(match[0]));

const sum = nums.reduce((acc, num) => acc + num, 0);

console.log('MY_REG sum: ', sum);