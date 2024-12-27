const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./13/${FILE_NAME}.txt`, 'utf8');

const games = data
    .split('\n\n')
    .map(r => {
        [btnA, btnB, prize] = r.split('\n');

        const [ax, ay] = btnA.replace('Button A: X+', '').split(', Y+').map(Number);
        const [bx, by] = btnB.replace('Button B: X+', '').split(', Y+').map(Number);
        const [px, py] = prize.replace('Prize: X=', '').split(', Y=').map(Number);

        return {
            ax, ay, bx, by, px: px, py: py
        }
    })
    .map(({ ax, ay, bx, by, px, py }) => {
        const det = ax * by - ay * bx;
        const det1 = px * by - py * bx;
        const det2 = ax * py - ay * px;

        const A = det1 / det;
        const B = det2 / det;

        return {
            A, B
        }
    })
    .filter(({ A, B }) => A === parseInt(A) && B === parseInt(B))
    .map(({ A, B }) => A*3 + B)
    .reduce((acc, s) => {
        return acc + s;
    }, 0)

console.log('result: ', games);
