const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./14/${FILE_NAME}.txt`, 'utf8').trim().split('\n');

const ITERATIONS = 2503;


const initialData = data.map((line) => {
    const arr = line.split(' ');
    const speed = parseInt(arr[3]);
    const flyTime = parseInt(arr[6]);
    const restTime = parseInt(arr[13]);

    return {
        speed,
        flyTime,
        restTime,
    }
});

const totalDistances = initialData.map(({ speed, flyTime, restTime }) => {
    const cycleTime = flyTime + restTime;
    const cycles = Math.floor(ITERATIONS / cycleTime);
    const remainingTime = ITERATIONS % cycleTime;

    return cycles * flyTime * speed + Math.min(remainingTime, flyTime) * speed;
});

const result = Math.max(...totalDistances);

console.log('MY_REG result: ', result);
