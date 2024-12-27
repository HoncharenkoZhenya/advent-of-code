const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./7/${FILE_NAME}.txt`, 'utf8');

const OPERATORS = {
    PLUS: '+',
    MUL: '*',
}

const lines = data
    .split('\n')
    .filter(Boolean)
    .filter(isValid)
    .map((row) => Number(row.split(': ')[0]))
    .reduce((sum, r) => sum + r);

console.log('result: ', lines);

function isValid(row) {
    const [answerStr, numbersStr] = row.split(': ');
    const answer = Number(answerStr);
    const numbers = numbersStr.split(' ').map(Number);

    const operators = generateOperators(numbers.length - 1);
    for (let i = 0; i < operators.length; i++) {
        const result = calculate(numbers, operators[i]);
        if (result === answer) {
            return true;
        }
    }
}

function calculate(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === OPERATORS.PLUS) {
            result += numbers[i + 1];
        } else {
            result *= numbers[i + 1];
        }
    }
    return result;
}

function generateOperators(l = 1) {
    if (l === 1) {
        return [[OPERATORS.PLUS], [OPERATORS.MUL]];
    }

    const operators = generateOperators(l - 1);
    const result = [];
    operators.forEach(operator => {
        result.push(operator.concat(OPERATORS.PLUS));
        result.push(operator.concat(OPERATORS.MUL));
    });
    return result;
}
