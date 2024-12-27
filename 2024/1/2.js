const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./1/${FILE_NAME}.txt`, 'utf8');

const columns = data
    .split('\n')
    .filter(Boolean)
    .map(row => row.split('   '))
    .reduce((acc, row) => {
        acc[0].push(Number(row[0]));
        acc[1].push(Number(row[1]));

        return acc;
    }, [[], []]);

const apearsCount = columns[0].reduce((acc, value) => {
    const countInSecondColumn = columns[1].filter(columnValue => columnValue === value).length;

    acc.push([value, countInSecondColumn])

    return acc;
}, []);

const result = apearsCount.reduce((acc, [value, count]) => {
    return acc + value * count;
}, 0);

console.log('result: ', result);
