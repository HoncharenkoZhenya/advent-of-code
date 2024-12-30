const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./10/${FILE_NAME}.txt`, 'utf8').trim();

let ITERATIONS = 50;

let value = data;

while (ITERATIONS--) {
    value = getValue(value);
}

console.log('MY_REG FINAL value: ', value.length);

function getValue(value) {
    const chars = value.split('');

    if (chars.length === 1) {
        return '1' + chars[0];
    }

    let finalValue = '';
    let prevChar = chars[0];
    let currentChar = '';
    let currentCharLength = 1;

    for (let i = 1; i < chars.length; i++) {
        currentChar = chars[i];

        if (currentChar === prevChar) {
            currentCharLength++;
            continue;
        }

        finalValue = finalValue + `${currentCharLength}${prevChar}`;

        prevChar = currentChar;
        currentCharLength = 1;
    }

    return finalValue + `${currentCharLength}${currentChar}`;
}
