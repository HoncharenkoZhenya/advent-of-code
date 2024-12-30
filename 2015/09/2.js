const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./09/${FILE_NAME}.txt`, 'utf8').trim().split('\n');

let parsedData = data.reduce((acc, line) => {
    const [city1, , city2, , distance] = line.split(' ');

    acc.cities.add(city1);
    acc.cities.add(city2);

    acc.roads.set(`${city1}-${city2}`, Number(distance));
    acc.roads.set(`${city2}-${city1}`, Number(distance));

    return acc;
}, {
    cities: new Set(),
    roads: new Map(),
});


const combinations = getCombinations([...parsedData.cities]);

const roadLength = combinations.map((combination) => {
    let length = 0;
    for (let i = 0; i < combination.length - 1; i++) {
        const road = parsedData.roads.get(`${combination[i]}-${combination[i + 1]}`);
        length += road;
    }

    return length;
});

const result = Math.max(...roadLength);

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
