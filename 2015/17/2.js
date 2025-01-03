const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./17/${FILE_NAME}.txt`, 'utf8').trim();

// const FINAL_DATA = 25;
const FINAL_DATA = 150;

const containers = data.split('\n').map(Number);

const res = getCombinations(containers, FINAL_DATA);

const minLen = Math.min(...res.map(r => r.length));

const minRes = res.filter(r => r.length === minLen);

console.log('MY_REG minRes: ', minRes.length);

function getCombinations (containers, target) {
    const res = [];

    for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        const rest = containers.slice(i + 1);

        if (container === target) {
            res.push([container]);
        } else if (container < target) {
            const subCombinations = getCombinations(rest, target - container);
            subCombinations.forEach(subCombination => {
                res.push([container, ...subCombination]);
            });
        }
    }

    return res;
}
