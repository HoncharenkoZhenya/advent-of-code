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
        points: 0,
        distance: 0,
    }
});

for (let i = 0; i < ITERATIONS; i++) {
    initialData.forEach((data) => {
        const cycleTime = data.flyTime + data.restTime;
        const cycles = Math.floor(i / cycleTime);
        const remainingTime = i % cycleTime;

        const isFly = remainingTime < data.flyTime;

        if (isFly) {
            data.distance += data.speed;
        }
    });

    const maxDistance = Math.max(...initialData.map(({ distance }) => distance));

    initialData.forEach((data) => {
        if (data.distance === maxDistance) {
            data.points++;
        }
    });
}

const result = Math.max(...initialData.map(({ points }) => points));

console.log('MY_REG result: ', result);

// 689
