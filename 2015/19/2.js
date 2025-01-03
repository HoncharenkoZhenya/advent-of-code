const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./19/${FILE_NAME}.txt`, 'utf8').trim();

let [rules, message] = data.split('\n\n');

rules = rules.split('\n').reduce((acc, rule) => {
    const [key, value] = rule.split(' => ');
    acc.push([value, key]);
    return acc;
}, []).sort((a, b) => {
    return b[0].length - a[0].length;
})

let count = 0;

while (message !== 'e') {
    for (let i = 0; i < rules.length; i++) {
        const [key, value] = rules[i];
        if (message.includes(key)) {
            message = message.replace(key, value);
            console.log('MY_REG message: ', message);
            count++;
        }
    }
}
console.log('MY_REG count: ', count);
