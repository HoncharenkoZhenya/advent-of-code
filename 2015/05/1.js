const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./05/${FILE_NAME}.txt`, 'utf8').trim().split('\n');

console.log('MY_REG data: ', data.length);

const goodStrings = data.filter((str) => {
    if (str.includes('ab') || str.includes('cd') || str.includes('pq') || str.includes('xy')) {
        return false;
    }

    let hasTwice = false;

    for (let i = 0; i < str.length - 1; i++) {
        if (str[i] === str[i + 1]) {
            hasTwice = true;
            break;
        }
    }

    if (!hasTwice) {
        return false;
    }

    const a_count = str.split('').filter((char) => char === 'a').length;
    const e_count = str.split('').filter((char) => char === 'e').length;
    const i_count = str.split('').filter((char) => char === 'i').length;
    const o_count = str.split('').filter((char) => char === 'o').length;
    const u_count = str.split('').filter((char) => char === 'u').length;

    if (a_count + e_count + i_count + o_count + u_count < 3) {
        return false;
    }

    return true;
});

console.log('MY_REG goodStrings: ', goodStrings.length);
