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

const sortedColumns = columns.map(column => column.sort((a, b) => a - b));

const diffsBetweenColumns = sortedColumns[0].map((column, index) => {
    return Math.abs(sortedColumns[1][index] - column);
});

const result = diffsBetweenColumns.reduce((acc, diff) => acc + diff, 0);

console.log('result: ', result);
