const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const [registersStr, programStr] = fs.readFileSync(`./17/${FILE_NAME}.txt`, 'utf8')
    .split('\n\n');

const program = programStr
    .replace('Program: ', '')
    .replace('\n', '')
    .split(',')
    .map(Number);

let [A, B, C] = registersStr
    .split('\n')
    .map(r => Number(r.split(': ')[1]));

let CURRENT_INDEX = 0;

let res = [];

const runProgram = () => {
    res = [];
    CURRENT_INDEX = 0;
    while (program[CURRENT_INDEX] != null) {
        command(program[CURRENT_INDEX], program[CURRENT_INDEX + 1]);

        CURRENT_INDEX += 2;
    }
};

const getResult = (nextVal = 0, i = program.length - 1) => {
    if (i < 0) return nextVal;

    for (let newA = nextVal * 8; newA < nextVal * 8 + 8; newA++) {
        A = newA;

        runProgram();

        if (res[0] === program[i]) {
            const finalVal = getResult(newA, i - 1);

            if (finalVal) {
                return finalVal;
            }
        }
    }

    return null;
};

const result = getResult();
console.log('result: ', result);

function command(opcode, operand) {
    switch (opcode) {
        case 0:
            A = Number.parseInt(A / 2 ** getOpcodeValue(operand));
            break;
        case 1:
            B = B ^ operand;
            break;
        case 2:
            B = getOpcodeValue(operand) % 8;
            break;
        case 3:
            const shouldJump = A !== 0;
            if (shouldJump) {
                CURRENT_INDEX = operand - 2;
            }
            break;
        case 4:
            B = B ^ C;
            break;
        case 5:
            res.push(getOpcodeValue(operand) & 7);
            break;
        case 6:
            B = Number.parseInt(A / 2 ** getOpcodeValue(operand));
            break;
        case 7:
            C = Number.parseInt(A / 2 ** getOpcodeValue(operand));
            break;
    }
}

function getOpcodeValue(opcode) {
    switch (opcode) {
        case 0:
            return 0;
        case 1:
            return 1;
        case 2:
            return 2;
        case 3:
            return 3;
        case 4:
            return A;
        case 5:
            return B;
        case 6:
            return C;
    }
}
