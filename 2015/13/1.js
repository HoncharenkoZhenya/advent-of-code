const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./13/${FILE_NAME}.txt`, 'utf8').trim().split('\n');

const initialData = data.reduce((acc, line) => {
    const currentDataChange = line.includes('would gain') ? 1 : -1;

    const arr = line.split(' ');

    const person = arr[0];
    const points = parseInt(arr[3]) * currentDataChange;
    const neighbor = arr[10].replace('.', '');

    acc.peoples.add(person);

    if (!acc.neighbors[person]) {
        acc.neighbors[person] = {};
    }

    acc.neighbors[person][neighbor] = points;

    return acc;
}, {
    neighbors: {},
    peoples: new Set(),
});

const combinations = getCombinations([...initialData.peoples]);

const counts = combinations.map((combination) => {
    let count = 0;

    for (let i = 0; i < combination.length; i++) {
        const leftNeighbor = i === 0 ? combination[combination.length - 1] : combination[i - 1];
        const rightNeighbor = i === combination.length - 1 ? combination[0] : combination[i + 1];

        const leftNeighborPoints = initialData.neighbors[combination[i]][leftNeighbor];
        const rightNeighborPoints = initialData.neighbors[combination[i]][rightNeighbor];

        count += leftNeighborPoints + rightNeighborPoints;
    }

    return count;
});

const result = Math.max(...counts);

console.log('MY_REG result: ', result);

function getCombinations (options) {
    const results = [];
    const l = options.length;

    const helper = (slate, level, end, memo) => {
        for (let i = 0; i <= end; i++) {
            if (memo[i] !== 1) {
                memo[i] = 1;
                slate.push(options[i]);
                if (slate.length === l) {
                    results.push([...slate]);
                }
                if (level !== end) {
                    helper(slate, level + 1, end, memo);
                }
                slate.pop();
                memo[i] = 0;
            }
        }
    }

    helper([], 0, options.length - 1, []);
    return results;
}
