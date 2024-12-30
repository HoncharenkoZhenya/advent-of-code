const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./01/${FILE_NAME}.txt`, 'utf8').trim();

let res = 0;
let result = 0;

const l = data.split('').length;

for (let i = 0; i < l; i++ ) {
    const char = data[i];
    if (char === '(') {
        res++;
    } else {
        res--;
    }

    if (res === -1) {
        result = i + 1;
        break;
    }
}

console.log('MY_REG result: ', result);
