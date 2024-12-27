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

const createMaxPath = (
    group,
    keys,
    usedKeys,
    maxGroup,
) => {
    if (keys.size === 0 && usedKeys.size === 0) {
        if (group.size > maxGroup.size) {
            maxGroup.clear();
            group.forEach((node) => maxGroup.add(node));
        }
        return;
    }

    for (const key of keys) {
        group.add(key);

        const linked = graph.get(key) || new Set();

        createMaxPath(
            group,
            new Set([...keys].filter((v) => linked.has(v))),
            new Set([...usedKeys].filter((v) => linked.has(v))),
            maxGroup,
        );

        group.delete(key);
        keys.delete(key);
        usedKeys.add(key);
    }
};

const getMaxPath = (graph) => {
    const maxPath = new Set();

    createMaxPath(new Set(), new Set(graph.keys()), new Set(), maxPath);

    return [...maxPath]
};

const result = getMaxPath(graph)
    .sort()
    .join(',');

console.log('MY_REG result: ', result);
