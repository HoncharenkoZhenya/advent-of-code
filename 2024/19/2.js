const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./19/${FILE_NAME}.txt`, 'utf8');

let [patterns, designs] = data.split('\n\n');

designs = designs.split('\n').filter(Boolean);
patterns = patterns.split(', ').filter(Boolean).reduce((acc, p) => {
    acc[p] = true;
    return acc;
}, {});

let result = 0;

for (let line of designs) {
    let validDesigns = [1];

    for (let i = 0; i < line.length; i++) {
        if (!validDesigns[i]) {
            continue;
        }

        for (let j = i + 1; j <= line.length; j++) {
            if (i === 0) {
                validDesigns[j] = 0;
            }

            if (patterns[line.substring(i, j)]) {
                validDesigns[j] += validDesigns[i];
            }
        }
    }

    result += validDesigns[line.length];
}

console.log('result: ', result);
