const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./09/${FILE_NAME}.txt`, 'utf8').trim();

const result = decompress(data, 0);

console.log('MY_REG result.length: ', result.length);

function decompress(input) {
    if (!input.includes('(')) {
        return input;
    }

    const startCommand = input.indexOf('(');
    const endCommand = input.indexOf(')');

    if (startCommand === -1 || endCommand === -1) {
        return input
    }

    let result = input.substring(0, startCommand);
    const afterCommand = input.substring(endCommand + 1);

    let [length, repeat] = input.substring(startCommand + 1, endCommand).split('x').map(Number);

    const repeated = afterCommand.substring(0, length);

    while (repeat--) {
        result += repeated;
    }

    result += decompress(afterCommand.substring(length));

    return result;
}
