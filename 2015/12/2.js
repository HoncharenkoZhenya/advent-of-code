const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./12/${FILE_NAME}.txt`, 'utf8').trim();

const parsedData = JSON.parse(data);

const parsedDataFlat = parsedData.map((item) => {
    return getFilteredData(item)
});

const str = JSON.stringify(parsedDataFlat);

const nums = [...str.matchAll(/-?\d+/g)]
    .map((match) => parseInt(match[0]));

const sum = nums.reduce((acc, num) => acc + num, 0);

console.log('MY_REG sum: ', sum);

function getFilteredData(data) {
    const isArray = Array.isArray(data);

    if (isArray) {
        return data.map(getFilteredData)
    }

    if (typeof data === 'object') {
        const hasRed = Object.values(data).includes('red');

        if (hasRed) {
            return null;
        }

        return Object.entries(data).reduce((acc, [key, value]) => {
            acc[key] = getFilteredData(value);
            return acc;
        }, {});
    }

    return data;
}
