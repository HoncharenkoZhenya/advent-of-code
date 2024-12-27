const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./20/${FILE_NAME}.txt`, 'utf8');

const grid = data.split('\n').filter(Boolean).map((line) => {
    return line.split('');
});

const startPosition = findPosition(grid, 'S');

const finishPosition = findPosition(grid, 'E');

const originalPath = getExitPath(grid, startPosition, finishPosition);

const withSkips = getWithSkips(originalPath, 2);

console.log('result: ', withSkips);

function getWithSkips(path, skipsCount) {
    let skips = 0;

    for (let first = 0; first < path.length - 1; first++) {
        for (let second = first + 1; second < path.length; second++) {
            const saved = second - first;

            const xDiff = Math.abs(path[first][1] - path[second][1]);
            const yDiff = Math.abs(path[first][0] - path[second][0]);

            if (xDiff + yDiff <= skipsCount) {
                const s = saved - (xDiff + yDiff);
                if (s >= 100) {
                    skips++;
                }
            }
        }
    }

    return skips;

}

function getExitPath(grid, startPosition, finishPosition) {
    const directions = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1]
    ];

    const rows = grid.length;
    const cols = grid[0].length;

    const visited = new Set();
    const queue = [
        [startPosition[0], startPosition[1]]
    ];
    const path = [];

    while (queue.length) {
        let [x, y] = queue.shift();
        path.push([x, y]);

        // Base condition for finish
        if (x === finishPosition[0] && y === finishPosition[1]) {
            break;
        }

        visited.add(`${x},${y}`)

        // Check directions
        for (const [dx, dy] of directions) {
            const nx = dx + x;
            const ny = dy + y;

            const visitedKey = `${nx},${ny}`;

            if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && grid[nx][ny] === '.' && !visited.has(visitedKey)) {
                queue.push([nx, ny]);
            }
        }
    }

    return path;
}

function findPosition(grid, target) {
    return grid.reduce((acc, row, rowIndex) => {
        const colIndex = row.indexOf(target);

        if (colIndex !== -1) {
            acc = [rowIndex, colIndex];
        }

        return acc;
    }, [0, 0]);
}

function copyGrid(grid) {
    return grid.map((row) => {
        return [...row];
    });
}
