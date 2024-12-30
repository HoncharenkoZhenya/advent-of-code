const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./01/${FILE_NAME}.txt`, 'utf8').trim();

const result = data.split('').reduce((acc, curr) => {
    if (curr === '(') {
        return acc + 1;
    }

    return acc - 1;
}, 0);

console.log('MY_REG result: ', result);
