const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./23/${FILE_NAME}.txt`, 'utf8').trim().split('\n');

const instructions = data.map((line) => {
    const [instruction, ...args] = line.replace(',', '').split(' ');
    return { instruction, args };
});

console.log('MY_REG instructions: ', instructions);

const l = instructions.length;

const operators = {
    a: 1,
    b: 0,
}

let i = 0;

while (true) {
    if (i >= l || i < 0) {
        break;
    }

    const { instruction, args } = instructions[i];

    switch (instruction) {
        case 'hlf':
            operators[args[0]] /= 2;
            break;
        case 'tpl':
            operators[args[0]] *= 3;
            break;
        case 'inc':
            operators[args[0]]++;
            break;
        case 'jmp':
            i += parseInt(args[0]) - 1;
            break;
        case 'jie':
            if (operators[args[0]] % 2 === 0) {
                i += parseInt(args[1]) - 1;
            }
            break;
        case 'jio':
            if (operators[args[0]] === 1) {
                i += parseInt(args[1]) - 1;
            }
            break;
    }

    i++;
}

console.log('MY_REG operators: ', operators);
