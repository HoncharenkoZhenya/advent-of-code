const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./06/${FILE_NAME}.txt`, 'utf8').trim();

const messages = data.split('\n').map(r => r.split(''));

const rotateMessages = messages[0].map((_, i) => messages.map(row => row[i]));

const mostCommonLetters = rotateMessages.map(group => {
    const letters = {};

    group.forEach(letter => {
        if (!letters[letter]) {
            letters[letter] = 0;
        }

        letters[letter]++;
    });

    return Object.keys(letters).sort((a, b) => letters[b] - letters[a])[0];
});

console.log('MY_REG mostCommonLetters: ', mostCommonLetters.join(''));
