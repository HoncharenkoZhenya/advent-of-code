const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./5/${FILE_NAME}.txt`, 'utf8');

const [rulesStr, updatesStr] = data.split('\n\n');

const rules = rulesStr.split('\n').filter(Boolean);
const updates = updatesStr.split('\n').filter(Boolean).map(r => r.split(','));

const rulesMap = rules.reduce((acc, rule) => {
    const [left, right] = rule.split('|');
    if (acc.shouldBeRight[left]) {
        acc.shouldBeRight[left].push(right);
    } else {
        acc.shouldBeRight[left] = [right];
    }

    if (acc.shouldBeLeft[right]) {
        acc.shouldBeLeft[right].push(left);
    } else {
        acc.shouldBeLeft[right] = [left];
    }

    return acc;
}, {
    shouldBeRight: {},
    shouldBeLeft: {},
});

const result = updates
    .filter((r) => !isValidRow(r))
    .map(makeCorrectOrder)
    .map(r => Number(r[(r.length - 1) / 2]))
    .reduce((acc, item) => acc + item, 0);

console.log('result: ', result);

function makeCorrectOrder(row) {
    const res = [];
    let newRow = [...row];
    while (res.length !== row.length) {
        for (let i = 0; i < newRow.length; i++) {
            const item = newRow[i];
            const rowWithoutItem = newRow.filter((r, index) => index !== i);
            const hasLefter = Boolean(rulesMap.shouldBeLeft[item]) && rulesMap.shouldBeLeft[item].some(l => rowWithoutItem.includes(l));
            if (!hasLefter) {
                res.push(item);
                newRow = rowWithoutItem;
                break;
            }
        }
    }

    return res;
}

function isValidRow(row) {
    for (let i = 0; i < row.length; i++) {
        const item = row[i];
        const leftItems = row.slice(0, i);
        const rightItems = row.slice(i + 1);

        if (!isValidItem(item, leftItems, rightItems)) {
            return false;
        }
    }

    return true;
}

function isValidItem(item, leftItems, rightItems) {
    const hasShouldBeLeftRules = Boolean(rulesMap.shouldBeLeft[item]);
    const hasShouldBeRightRules = Boolean(rulesMap.shouldBeRight[item]);

    if (!hasShouldBeLeftRules && leftItems.length > 0) {
        return false;
    }
    if (!hasShouldBeRightRules && rightItems.length > 0) {
        return false;
    }

    const isValidLeftItems = leftItems.every(l => rulesMap.shouldBeLeft[item].includes(l));
    const isValidRightItems = rightItems.every(r => rulesMap.shouldBeRight[item].includes(r));

    console.clear();

    return isValidLeftItems && isValidRightItems;
}
