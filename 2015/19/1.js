const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./19/${FILE_NAME}.txt`, 'utf8').trim();

let [rules, messages] = data.split('\n\n');

rules = rules.split('\n').reduce((acc, rule) => {
    const [key, value] = rule.split(' => ');
    acc.push([key, value]);
    return acc;
}, []);

const variations = new Set();

for (let i = 0; i < rules.length; i++) {
    const [key, value] = rules[i];

    let countOfVariations = (messages.match(new RegExp(key, "g")) || []).length;

    let lastIndexOf = -1;
    while (countOfVariations--) {
        const currentIndex = messages.indexOf(key, lastIndexOf + 1);
        lastIndexOf = currentIndex;

        const newStr = messages.slice(0, currentIndex) + value + messages.slice(currentIndex + key.length);

        variations.add(newStr);
    }
}

console.log('MY_REG variations: ', variations.size);

// 509 - to hight
