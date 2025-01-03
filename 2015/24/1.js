const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./24/${FILE_NAME}.txt`, 'utf8').trim().split('\n').map(Number);

const groupWeight = data.reduce((acc, curr) => acc + curr, 0) / 3;

console.log('MY_REG groupWeight: ', groupWeight);

const res = getAllPossibleCombinations(data).sort((a, b) => a.length - b.length);

console.log('MY_REG res: ', res);

const minLength = res[0].length;

console.log('MY_REG minLength: ', minLength);

const minRes = res.filter((group) => group.length === minLength);

console.log('MY_REG minRes: ', minRes);

const finalRes = minRes.map(r => r.reduce((acc, curr) => acc * curr, 1));

console.log('MY_REG finalRes: ', Math.min(...finalRes));

function getAllPossibleCombinations(arr) {
    const result = [];

    getCombinations([], arr, result);

    console.log('MY_REG result: ', result);

    return result.filter((group) => {
        return group.reduce((acc, curr) => acc + curr, 0) === groupWeight;
    });
}

function getCombinations(prefix, arr, result) {
    for (let i = 0; i < arr.length; i++) {
        if (prefix.reduce((acc, curr) => acc + curr, 0) + arr[i] > groupWeight) {
            continue;
        }

        if (prefix.concat(arr[i]).reduce((acc, curr) => acc + curr, 0) === groupWeight) {
            result.push(prefix.concat(arr[i]));
        }


        getCombinations(prefix.concat(arr[i]), arr.slice(i + 1), result);
    }
}
