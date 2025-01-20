const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./07/${FILE_NAME}.txt`, 'utf8').trim();

// 143 - to hight

const lines = data.split('\n').map(line => {
    return line.split('').reduce((acc, char, index, arr) => {
        if (char === '[') {
            acc.push({
                withBrackets: true,
                items: '',
            });

            return acc;
        }

        if (char === ']') {
            acc.push({
                withBrackets: false,
                items: '',
            });

            return acc;
        }

        acc[acc.length - 1].items += char;

        return acc;
    }, [
        {
            withBrackets: false,
            items: '',
        }
    ]);
});

const correctLines = lines.filter((items) => {
    const withBrackets = items.filter(item => item.withBrackets);
    const withoutBrackets = items.filter(item => !item.withBrackets);

    if (withBrackets.some(r => isABBA(r.items))) {
        return false;
    }

    if (withoutBrackets.some(r => isABBA(r.items))) {
        return true;
    }

    return false;

});

console.log('MY_REG correctLines: ', correctLines.length);

// 143 - to hight

function isABBA(str) {
    for (let i = 0; i < str.length - 3; i++) {
        if (str[i] === str[i + 3] && str[i + 1] === str[i + 2] && str[i] !== str[i + 1]) {
            return true;
        }
    }
    return false;
}
