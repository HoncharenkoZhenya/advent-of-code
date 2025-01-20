const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./09/${FILE_NAME}.txt`, 'utf8').trim();

const result = countLength(data);

console.log('MY_REG result.length: ', result);

function countLength(input) {
    let count = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] !== '(' && input[i] !== ')') {
            count++;
            continue;
        }

        if (input[i] === ')') {
            console.log('MY_REG ERROR!!!');
            break;
        }

        if (input[i] === '(') {
            const startCommand = input.indexOf('(', i);
            const endCommand = input.indexOf(')', i);

            const afterCommand = input.substring(endCommand + 1);

            let [length, repeat] = input.substring(startCommand + 1, endCommand).split('x').map(Number);

            const repeated = afterCommand.substring(0, length);

            console.log('MY_REG repeated: ', repeated);

            count += repeat * countLength(repeated);

            i = endCommand + length;
        }
    }

    return count;
}
