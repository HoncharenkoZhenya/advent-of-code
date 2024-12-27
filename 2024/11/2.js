const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs
    .readFileSync(`./11/${FILE_NAME}.txt`, 'utf8')
    .split('\n')
    .filter(Boolean) [0];

let numbers = data.split(' ').map(Number);

const memoize = (fn) => {
    let cache = {};
    return (...args) => {
        let cacheKey = `${args[0]}_${args[1]}`;
        if (cacheKey in cache) {
            return cache[cacheKey];
        }
        else {
            let result = fn(...args);
            cache[cacheKey] = result;
            return result;
        }
    }
}

const memoizedCheckNumberMutateAfterIterations = memoize(checkNumberMutateAfterIterations);

let res = 0;

for (let i = 0; i < numbers.length; i++) {
    res += memoizedCheckNumberMutateAfterIterations(numbers[i], 75, 1);
}

console.log('result: ', res);

function checkNumberMutateAfterIterations(number, iterations, numbersCount) {
    let newNumber = number;
    while (iterations--) {
        newNumber = changeNumber(newNumber);

        if (Array.isArray(newNumber)) {
            const re1 = memoizedCheckNumberMutateAfterIterations(newNumber[0], iterations, numbersCount);
            const re2 = memoizedCheckNumberMutateAfterIterations(newNumber[1], iterations, numbersCount);

            numbersCount = re1 + re2;
            break;
        }
    }

    return numbersCount;
}

function changeNumber(number) {
    if (number === 0) {
        return 1;
    }

    if (`${number}`.length % 2 === 0) {
        const digits = `${number}`.split('').map(Number);
        const left = Number(digits.splice(0, digits.length / 2).join(''));
        const right = Number(digits.join(''));

        return [left, right]
    }

    return number * 2024;
}
