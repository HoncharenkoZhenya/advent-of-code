const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./22/${FILE_NAME}.txt`, 'utf8');

const numbers = data
    .split('\n')
    .filter(Boolean)
    .map(BigInt)
    .map(predictSecrets);

const result = numbers.reduce((sum, num) => sum + Number(num), 0);

console.log('result: ', result);

function predictSecrets(number) {
    let iterations = 2000;

    while (iterations--) {
        number = getNextSecret(number);
    }

    return number;
}

function getNextSecret(number) {
    number = firstStep(number);
    number = secondStep(number);
    return thirdStep(number);
}

function firstStep(number) {
    const newNumber = number * BigInt(64);
    const mixedNumber = mix(newNumber, number);
    return prune(mixedNumber);
}

function secondStep(number) {
    const newNumber = BigInt(Math.round(Number(number / BigInt(32))));
    const mixedNumber = mix(newNumber, number);
    return prune(mixedNumber);
}

function thirdStep(number) {
    const newNumber = number * BigInt(2048);
    const mixedNumber = mix(newNumber, number);
    return prune(mixedNumber);
}

function mix(newNumber, secretNumber) {
    return newNumber ^ secretNumber;
}

function prune(secretNumber) {
    return secretNumber % BigInt(16777216);
}
