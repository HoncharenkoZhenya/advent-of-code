const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./24/${FILE_NAME}.txt`, 'utf8');

let [inputs, outputs] = data.trim().split('\n\n').map(r => r.split('\n'));

inputs = inputs.reduce((acc, line) => {
    let [key, number] = line.split(': ');
    acc.set(key, Number(number));

    return acc;
}, new Map());

outputs = outputs.reduce((acc, line) => {
    const [input, res] = line.split(' -> ');
    const [l, a, r] = input.split(' ');
    acc.push({ l, a, r, res });
    return acc;
}, []);

while (outputs.length) {
    const { l, a, r, res } = outputs.shift();

    if (!inputs.has(l) || !inputs.has(r)) {
        outputs.push({ l, a, r, res });
        continue;
    }

    const newInput = getRes(l, a, r);
    inputs.set(res, newInput);
}

const result = [...inputs.entries()]
    .filter(([key]) => key[0] === 'z')
    .sort((a, b) => {
        const ar = Number(a[0].replace('z', ''));
        const br = Number(b[0].replace('z', ''));

        return br - ar;
    })
    .reduce((acc, [_, value]) => {
        acc += value;
        return acc;
    }, '');

console.log('MY_REG result: ', Number.parseInt(result, 2));

function getRes(l, a, r) {
    switch (a) {
        case 'AND':
            return inputs.get(l) & inputs.get(r);
        case 'OR':
            return inputs.get(l) | inputs.get(r);
        case 'XOR':
            return inputs.get(l) ^ inputs.get(r);
    }
}

