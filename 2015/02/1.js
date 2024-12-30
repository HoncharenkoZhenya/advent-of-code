const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./02/${FILE_NAME}.txt`, 'utf8').trim().split('\n');

const lines = data.map(line => {
    const [l, w, h] = line.split('x');
    const smallest = Math.min(l * w, w * h, h * l);
    return 2 * l * w + 2 * w * h + 2 * h * l + smallest;
});

const sum = lines.reduce((acc, r) => acc + r);

console.log('MY_REG sum: ', sum);
