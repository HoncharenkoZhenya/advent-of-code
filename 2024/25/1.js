const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./25/${FILE_NAME}.txt`, 'utf8').trim();

const datasets = data.split('\n\n');

const locksDataset = datasets.filter(r => r[0] === '#').map(r => r.split('\n'));
const keysDataset = datasets.filter(r => r[0] === '.').map(r => r.split('\n'));

const locks = locksDataset.map(r => {
    const data = r.reduce((acc, row, i) => {
        if (i === 0 || i === r.length - 1) {
            return acc;
        }

        const rowData = row.split('').map(r => r === '#' ? 1 : 0);
        acc = acc.map((r, i) => r + rowData[i]);

        return acc;
    }, [0, 0, 0, 0, 0]);

    return data;
});

const keys = keysDataset.map(r => {
    const data = r.reduce((acc, row, i) => {
        if (i === 0 || i === r.length - 1) {
            return acc;
        }

        const rowData = row.split('').map(r => r === '#' ? 1 : 0);
        acc = acc.map((r, i) => r + rowData[i]);

        return acc;
    }, [0, 0, 0, 0, 0]);

    return data;
});

let result = 0;

for (let lock of locks) {
    for (let key of keys) {
        result += checkLockKey(lock, key);
    }
}

function checkLockKey(lock, key) {
    const hasWrong = lock.some((r, i) => r + key[i] > 5);

    return hasWrong ? 0 : 1;
}

console.log('MY_REG result: ', result);
