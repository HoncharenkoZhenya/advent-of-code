const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const iterations = 100;
const maxX = 101;
const maxY = 103;

const middleX = Math.floor(maxX / 2);
const middleY = Math.floor(maxY / 2);

const data = fs.readFileSync(`./14/${FILE_NAME}.txt`, 'utf8');

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

const robotsAfterIterations = robots.map(robot => {
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
        startX, startY, deltaX, deltaY,
        x,
        y,
    }
});

const robotsInQuadrant = robotsAfterIterations
    .filter(robot => {
        return robot.x !== middleX && robot.y !== middleY;
    })
    .map(({ x, y }) => {
        if (x < middleX && y < middleY) {
            return 1;
        } else if (x > middleX && y < middleY) {
            return 2;
        } else if (x > middleX && y > middleY) {
            return 3;
        } else if (x < middleX && y > middleY) {
            return 4;
        }
    })
    .reduce((acc, quadrant) => {
        acc[quadrant] = (acc[quadrant] || 0) + 1;
        return acc;
    }, {});

const res = Object.values(robotsInQuadrant).reduce((acc, count) => {
    return acc * count;
}, 1);

console.log('result: ', res);
