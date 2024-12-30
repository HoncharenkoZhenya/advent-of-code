const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./11/${FILE_NAME}.txt`, 'utf8').trim();

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

let nextPass = data;

while (true) {
    nextPass = getNextPass(nextPass);

    if (isPassValid(nextPass)) {
        break;
    }
}

console.log('MY_REG RESULT nextPass: ', nextPass);

function getNextPass(pass) {
    const reversePass = pass.split('').reverse().join('');
    let newPass = '';
    let shouldIncreaseNext = true;

    for (let i = 0; i < reversePass.length; i++) {
        if (!shouldIncreaseNext) {
            newPass += reversePass[i];
            continue;
        }

        shouldIncreaseNext = false;
        const currentChar = reversePass[i];

        if (currentChar === 'z') {
            newPass += 'a';
            shouldIncreaseNext = true;
            continue;
        }

        const currentCharIndex = alphabet.indexOf(currentChar);
        const nextChar = alphabet[currentCharIndex + 1];
        newPass += nextChar;
    }

    return newPass.split('').reverse().join('');
}

function isPassValid(pass) {
    if (pass.match(/[iol]/)) {
        return false;
    }

    let hasStraight = false;
    for (let i = 0; i < pass.length - 2; i++) {
        const currentChar = pass[i];
        const currentCharIndex = alphabet.indexOf(currentChar);

        const nextChar = pass[i + 1];
        const nextCharIndex = alphabet.indexOf(nextChar);

        if (currentCharIndex + 1 !== nextCharIndex) {
            continue;
        }

        const next2Char = pass[i + 2];
        const next2CharIndex = alphabet.indexOf(next2Char);

        if (nextCharIndex + 1 !== next2CharIndex) {
            continue;
        }

        hasStraight = true;
    }

    if (!hasStraight) {
        return false;
    }

    let pairCount = 0;
    for (let i = 0; i < pass.length - 1; i++) {
        const currentChar = pass[i];
        const nextChar = pass[i + 1];

        if (currentChar === nextChar) {
            pairCount++;
            i++;
        }
    }

    if (pairCount < 2) {
        return false;
    }

    return true;
}
