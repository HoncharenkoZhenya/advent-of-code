const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./03/${FILE_NAME}.txt`, 'utf8').trim().split('');

const newData = [];

for (let i = 0; i < data.length - 1; i += 2) {
    newData.push(data[i] + data[i + 1]);
}

let currentSantaPosition = [0, 0];
let currentRobotPosition = [0, 0];
const visitedPositions = new Set(['0_0']);

const directions = {
    '^': [0, 1],
    'v': [0, -1],
    '>': [1, 0],
    '<': [-1, 0],
}

for (let direction of newData) {
    const [santa, robot] = direction.split('');

    const santaDirection = directions[santa];
    const robotDirection = directions[robot];

    const newSantaPosition = [currentSantaPosition[0] + santaDirection[0], currentSantaPosition[1] + santaDirection[1]];
    const newRobotPosition = [currentRobotPosition[0] + robotDirection[0], currentRobotPosition[1] + robotDirection[1]];

    visitedPositions.add(`${newSantaPosition[0]}_${newSantaPosition[1]}`);
    visitedPositions.add(`${newRobotPosition[0]}_${newRobotPosition[1]}`);

    currentSantaPosition = newSantaPosition;
    currentRobotPosition = newRobotPosition;
}

console.log('MY_REG visitedPositions.size: ', visitedPositions.size);
