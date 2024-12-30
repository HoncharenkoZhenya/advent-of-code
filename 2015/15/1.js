const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./15/${FILE_NAME}.txt`, 'utf8').trim().split('\n');

const initialData = data.map((line) => {
    const arr = line.split(' ');

    return {
        capacity: parseInt(arr[2]),
        durability: parseInt(arr[4]),
        flavor: parseInt(arr[6]),
        texture: parseInt(arr[8]),
        calories: parseInt(arr[10])
    }
});

const combinations = generateCombinations(100);

const combinationCounts = combinations.map((combination) => {
    const total = combination.map((count, index) => {
        return {
            capacity: initialData[index].capacity * count,
            durability: initialData[index].durability * count,
            flavor: initialData[index].flavor * count,
            texture: initialData[index].texture * count,
            calories: initialData[index].calories * count
        }
    }).reduce((acc, curr) => {
        acc.capacity = acc.capacity + curr.capacity;
        acc.durability = acc.durability + curr.durability;
        acc.flavor = acc.flavor + curr.flavor;
        acc.texture = acc.texture + curr.texture;
        acc.calories = acc.calories + curr.calories;

        return acc;
    }, {capacity: 0, durability: 0, flavor: 0, texture: 0, calories: 0});

    const result = Math.max(0, total.capacity) * Math.max(0, total.durability) * Math.max(0, total.flavor) * Math.max(0, total.texture);

    return result;
});

const result = combinationCounts.reduce((acc, curr) => {
    return Math.max(acc, curr);
}, 0);

console.log('MY_REG result: ', result);


function generateCombinations(total) {
    const results = [];

    for (let a = 0; a <= total; a++) {
        for (let b = 0; b <= total - a; b++) {
            for (let c = 0; c <= total - a - b; c++) {
                let d = total - a - b - c;
                results.push([a, b, c, d]);
            }
        }
    }

    return results;
}
