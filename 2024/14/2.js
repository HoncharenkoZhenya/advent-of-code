const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./14/${FILE_NAME}.txt`, 'utf8');

const maxX = 101;
const maxY = 103;

const robots = data
    .split('\n')
    .filter(Boolean)
    .map(line => {
        const [[startX, startY], [deltaX, deltaY]] = line
            .replace('p=', '')
            .replace('v=', '')
            .split(' ')
            .map(str => str.split(',').map(Number))

        return {
            startX,
            startY,
            deltaX,
            deltaY,
            x: startX,
            y: startY,
        }
    });

let currentRobots = robots;

let iterations = 0;
while (true) {
    const isPassed = checkPositions(currentRobots);
    if (isPassed) {
        break;
    }
    iterations++;
    currentRobots = getRobotsAfterIterations(robots, iterations);
}

console.log('result: ', iterations);

function checkPositions(robots) {
    const set = new Set();
    for (let i = 0; i < robots.length; i++) {
        const { x, y } = robots[i];
        const key = `${x},${y}`;
        if (set.has(key)) {
            return false;
        }
        set.add(key);
    }
    return true;
}

function getRobotsAfterIterations(robots, iterations = 1) {
    return robots.map(robot => {
        const { startX, startY, deltaX, deltaY } = robot;

        let x = (startX + iterations * deltaX) % maxX;
        if (x < 0) {
            x = maxX + x;
        }

        let y = (startY + iterations * deltaY) % maxY;
        if (y < 0) {
            y = maxY + y;
        }

        return {
            startX,
            startY,
            deltaX,
            deltaY,
            x,
            y,
        }
    });
}
