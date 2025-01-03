const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./16/${FILE_NAME}.txt`, 'utf8').trim().split('\n');

const sues = data.map((line) => {
    const [,number, ...rest] = line.split(' ');
    const res = {};
    for (let i = 0; i < rest.length; i += 2) {
        res[rest[i].replace(':', '')] = parseInt(rest[i + 1].replace(',', ''));
    }

    return { ...res, number: number.replace(':', '') };
});

const current = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
}

// children: 3, goldfish: 5, vizslas: 0

console.log('MY_REG sues: ', sues);

const result = sues.filter((sue, index) => {
    const { number, ...rest } = sue;

    const keys = Object.keys(rest);

    if (number === '213') {
        debugger;
    }

    for (let key of keys) {
        let isValid = true;

        if (key === 'cats' || key === 'trees') {
            if (current[key] > rest[key]) {
                isValid = false;
            }
        } else if (key === 'pomeranians' || key === 'goldfish') {
            if (current[key] < rest[key]) {
                isValid = false;
            }
        } else if (current[key] !== rest[key]) {
            isValid = false;
        }

        if (!isValid) {
            return false;
        }
    }

    return true;
});

console.log('MY_REG result: ', result);
