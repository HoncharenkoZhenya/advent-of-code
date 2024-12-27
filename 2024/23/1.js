const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./23/${FILE_NAME}.txt`, 'utf8').split('\n').filter(Boolean);

const graph = new Map();

data.forEach((connection) => {
    const [a, b] = connection.split('-');
    if (!graph.has(a)) {
        graph.set(a, new Set());
    }

    if (!graph.has(b)) {
        graph.set(b, new Set());
    }

    graph.get(a).add(b);
    graph.get(b).add(a);
});

console.log('MY_REG graph: ', graph);

const createLanComputers = (graph) => {
    const trios = [];

    for (const [node, neighbors] of graph) {
        const neighborArray = Array.from(neighbors);

        for (let i = 0; i < neighborArray.length; i++) {
            for (let j = i + 1; j < neighborArray.length; j++) {
                const [n1, n2] = [neighborArray[i], neighborArray[j]];
                if (graph.get(n1)?.has(n2)) {
                    const trio = [node, n1, n2].sort();
                    trios.push(trio);
                }
            }
        }
    }

    return Array.from(new Set(trios.map((trio) => trio.join(',')))).map((trio) =>
        trio.split(','),
    );
};


const result = createLanComputers(graph)
    .filter((r) => r.some((node) => node.startsWith('t'))).length;

console.log('MY_REG result: ', result);
