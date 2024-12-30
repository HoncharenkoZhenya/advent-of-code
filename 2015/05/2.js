const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./05/${FILE_NAME}.txt`, 'utf8').trim().split('\n');

console.log('MY_REG data: ', data.length);

const goodStrings = data.filter((str) => {
    let hasPairs = false;
    for (let i = 0; i < str.length - 3; i++) {
        const f = str.substring(i, i + 2);
        if (str.includes(f, i + 2)) {
            hasPairs = true;
            break;
        }
    }

    if (!hasPairs) {
        return false;
    }


    let hasTwice = false;

    for (let i = 0; i < str.length - 2; i++) {
        if (str[i] === str[i + 2]) {
            hasTwice = true;
            break;
        }
    }

    if (!hasTwice) {
        return false;
    }

    return true;
});

console.log('MY_REG goodStrings: ', goodStrings.length);
