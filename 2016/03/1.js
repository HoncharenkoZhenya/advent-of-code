const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./03/${FILE_NAME}.txt`, 'utf8').trim();

const coordinates = data.split('\n').map(line => line.split('  ').filter(Boolean).map(Number));

const triangles = coordinates.filter(isTriangle);

console.log('MY_REG triangles.length: ', triangles.length);

function isTriangle([a, b, c]) {
    if (a + b <= c) {
        return false;
    }

    if (a + c <= b) {
        return false;
    }

    if (b + c <= a) {
        return false;
    }

    return true;
}
