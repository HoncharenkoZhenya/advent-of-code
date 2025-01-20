const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./01/${FILE_NAME}.txt`, 'utf8').trim();

const commands = data.split(', ');

const directions = ['N', 'E', 'S', 'W'];

const currentPosition = {
    x: 0,
    y: 0,
    direction: 'N'
};

for (let command of commands) {
    const [rotate, steps] = [command[0], parseInt(command.slice(1))];

    const newDirection = getNewDirection(currentPosition.direction, rotate);

    const newPosition = getNewPosition(currentPosition, newDirection, steps);

    currentPosition.direction = newDirection;
    currentPosition.x = newPosition.x;
    currentPosition.y = newPosition.y;
}

const result = Math.abs(currentPosition.x) + Math.abs(currentPosition.y);

console.log('MY_REG result: ', result);

function getNewDirection(currentDirection, rotate) {
    const currentIndex = directions.indexOf(currentDirection);
    const newIndex = (currentIndex + (rotate === 'R' ? 1 : -1) + 4) % 4;
    return directions[newIndex];
}

function getNewPosition(currentPosition, direction, steps) {
    switch (direction) {
        case 'N':
            return {
                x: currentPosition.x,
                y: currentPosition.y + steps
            };
        case 'E':
            return {
                x: currentPosition.x + steps,
                y: currentPosition.y
            };
        case 'S':
            return {
                x: currentPosition.x,
                y: currentPosition.y - steps
            };
        case 'W':
            return {
                x: currentPosition.x - steps,
                y: currentPosition.y
            };
    }

}
