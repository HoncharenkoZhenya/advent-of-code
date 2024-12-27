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

const validDesigns = designs.filter(checkIsValid);

function checkIsValid(design) {
    let prevValidPatterns = [1];

    for (let i = 0; i < design.length; i++) {
        for (let j = i + 1; j <= design.length; j++) {
            if (i === 0) {
                prevValidPatterns[j] = 0;
            }

            if (patterns[design.substring(i, j)]) {
                if (j === design.length) {

                }
                prevValidPatterns[j] += prevValidPatterns[i];
            }
        }
    }

    return prevValidPatterns[design.length];
}

console.log('result: ', validDesigns.length);
