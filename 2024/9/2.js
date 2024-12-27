const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const EXAMPLE_FILE_NAME2 = 'exampleData2';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./9/${FILE_NAME}.txt`, 'utf8').split('\n')[0];

const numbers = data.split('').map(Number);

const checksum = numbers.reduce((acc, number, index) => {
    const isEmpty = index % 2 !== 0;
    const fillData = isEmpty ? '.' : (index) / 2;
    const data = new Array(number).fill(fillData);

    if (data.length === 0) {
        return acc;
    }

    acc.push({
        isEmpty,
        data,
        dataLength: data.length,
    })

    return acc;
}, []);


while (true) {
    const isMoved = tryMove();
    if (!isMoved) {
        break;
    }
}

const finalData = parseChechsum(checksum);

const res = finalData.reduce((acc, item, index) => {
    if (item === '.') {
        return acc;
    }

    acc += item * index;

    return acc;
}, 0);

console.log('result: ', res);

function tryMove() {
    let isMoved = false;

    for (let i = checksum.length - 1; i >= 0; i--) {
        const item = checksum[i];
        if (item.isEmpty) {
            continue;
        }

        const firstEmptyValueIndex = checksum.findIndex(r => {
            return r.isEmpty && r.dataLength >= item.dataLength;
        });

        if (firstEmptyValueIndex >= i || firstEmptyValueIndex === -1) {
            continue;
        }


        const emptyValue = checksum[firstEmptyValueIndex];

        isMoved = true;



        if (item.dataLength === emptyValue.dataLength) {
            checksum[firstEmptyValueIndex] = item;
            checksum[i] = {
                isEmpty: true,
                data: new Array(item.dataLength).fill('.'),
                dataLength: item.dataLength,
            }
        } else {
            checksum[firstEmptyValueIndex] = {
                isEmpty: true,
                data: new Array(emptyValue.dataLength - item.dataLength).fill('.'),
                dataLength: emptyValue.dataLength - item.dataLength,
            }
            checksum[i] = {
                isEmpty: true,
                data: new Array(item.dataLength).fill('.'),
                dataLength: item.dataLength,
            }
            checksum.splice(firstEmptyValueIndex, 0, item);
        }

        return isMoved;
    }

    return isMoved;
}

function parseChechsum(checksum) {
    let res = [];

    checksum.forEach((item) => {
        res = res.concat(item.data);
    });

    return res;
}
