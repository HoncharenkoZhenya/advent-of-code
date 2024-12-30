const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./02/${FILE_NAME}.txt`, 'utf8').trim().split('\n');

const lines = data.map(line => {
    const d = line.split('x').map(Number);

    const sorted = d.sort((a, b) => a - b);

    return (d[0] + d[0]) + (d[1] + d[1]) + (d[0] * d[1] * d[2]);
});

console.log('MY_REG lines: ', lines);

const sum = lines.reduce((acc, r) => acc + r);

console.log('MY_REG sum: ', sum);
