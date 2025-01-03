const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./20/${FILE_NAME}.txt`, 'utf8').trim();

const finalRes = Number(data);

let iterations = 0;

let usedDividers = {};

while (true) {
    iterations++;

    let allDividers = getAllDividers(iterations);

    allDividers.forEach(r => {
        if (usedDividers[r]) {
            usedDividers[r]++;
        } else {
            usedDividers[r] = 1;
        }
    });

    allDividers = allDividers.filter(r => usedDividers[r] <= 50);

    const sum = allDividers.reduce((acc, curr) => {
        return acc + curr * 11;
    }, 0);

    if (sum >= finalRes) {
        break;
    }
}

console.log('MY_REG iterations: ', iterations);

function getAllDividers(number) {
    const dividers = [];
    for (let i = 1; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            dividers.push(i);
            if (number / i !== i) {
                dividers.push(number / i);
            }
        }
    }
    return dividers;
}
