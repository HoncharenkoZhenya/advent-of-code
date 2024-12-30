const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./08/${FILE_NAME}.txt`, 'utf8').trim().split('\n');

const total = data.reduce((acc, line) => {
    const ll = line.length;

    const lineCode = line
        .substring(1, ll - 1)
        .replaceAll('\\\\', 'X')
        .replaceAll('\\\"', 'X')
        .replaceAll(/\\x[0-9abcdef][0-9abcdef]/g, 'X');

    const lcl = lineCode.length;

    acc += ll - lcl;

    return acc;
}, 0);

console.log('MY_REG total: ', total);
