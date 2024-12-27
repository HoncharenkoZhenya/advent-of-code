const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./24/${FILE_NAME}.txt`, 'utf8');

let [_, outputs] = data.trim().split('\n\n').map(r => r.split('\n'));

const instructions = outputs.map(line => {
    const tokens = line.split(' ');
    return {
        leftValue: tokens[0],
        operation: tokens[1],
        rightValue: tokens[2],
        resultValue: tokens[4],
    };
});

const BIT_LENGTH = 45;

const incorrect = [];

for (let i = 0; i < BIT_LENGTH; i++) {
    const id = i.toString().padStart(2, '0');
    const xorCorrect = instructions.find(instruction => ((instruction.leftValue === `x${id}` && instruction.rightValue === `y${id}`) || (instruction.leftValue === `y${id}` && instruction.rightValue === `x${id}`)) && instruction.operation === 'XOR');
    const andCorrect = instructions.find(instruction => ((instruction.leftValue === `x${id}` && instruction.rightValue === `y${id}`) || (instruction.leftValue === `y${id}` && instruction.rightValue === `x${id}`)) && instruction.operation === 'AND');

    const shouldBeOr = instructions.find(instruction => instruction.leftValue === andCorrect.resultValue || instruction.rightValue === andCorrect.resultValue);

    if (shouldBeOr && shouldBeOr.operation !== 'OR' && i > 0) {
        console.log('MY_REG xorCorrect: ', xorCorrect);
        console.log('MY_REG andCorrect: ', andCorrect);
        console.log('MY_REG shouldBeOr: ', shouldBeOr);
        incorrect.push(andCorrect.resultValue);
    }

    const shouldNotBeOr = instructions.find(instruction => instruction.leftValue === xorCorrect.resultValue || instruction.rightValue === xorCorrect.resultValue);

    if (shouldNotBeOr && shouldNotBeOr.operation === 'OR') {
        console.log('MY_REG xorCorrect: ', xorCorrect);
        console.log('MY_REG andCorrect: ', andCorrect);
        console.log('MY_REG shouldNotBeOr: ', shouldNotBeOr);
        incorrect.push(xorCorrect.resultValue);
    }
}

incorrect.push(...instructions.filter(instruction => {
    return !instruction.leftValue[0].match(/[xy]/g)
        && !instruction.rightValue[0].match(/[xy]/g)
        && !instruction.resultValue[0].match(/[z]/g)
        && instruction.operation === 'XOR'
}).map(instruction => instruction.resultValue));


incorrect.push(...instructions.filter(instruction => {
    return instruction.resultValue[0].match(/[z]/g) && instruction.resultValue !== 'z45' && instruction.operation !== 'XOR'
}).map(instruction => instruction.resultValue));

const result = incorrect.sort().join(',');

console.log('MY_REG result: ', result);

// cvh,dbb,hbk,kvn,tfn,z14,z18,z23
// dbb,hbk,kvn,z14,z18,z23

// tfn, cvh
