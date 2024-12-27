const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./18/${FILE_NAME}.txt`, 'utf8');

const bytes = data.split('\n').filter(Boolean).map((line) => {
    return line.split(',').map(Number);
});

const directions = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1]
]

const size = 70 + 1;
const readBytes = 1024;

bytes.length = readBytes;

const field = generateField(size);

bytes.forEach(([x, y ]) => {
    field[y][x] = '#';
});

const result = getExitPath(field);

console.log('result: ', result);

function getExitPath(grid, startPosition = [0, 0], finishPosition = [size - 1, size - 1]) {
    const rows = grid.length;
    const cols = grid[0].length;

    const visited = new Set();
    const queue = [
        [startPosition[0], startPosition[1], 0]
    ];

    while (queue.length > 0) {
        const [x, y, steps] = queue.shift();

        // Base condition for finish
        if (x === finishPosition[0] && y === finishPosition[1]) {
            return steps;
        }

        // Check directions
        for (const [dx, dy] of directions) {
            const nx = dx + x;
            const ny = dy + y;

            const visitedKey = `${nx},${ny}`;

            if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && grid[nx][ny] === '.' && !visited.has(visitedKey)) {
                visited.add(visitedKey);
                queue.push([nx, ny, steps + 1]);
            }
        }
    }

    return -1;
}

function generateField(size) {
    return Array.from({ length: size }, () => Array.from({ length: size }, () => '.'));
}
