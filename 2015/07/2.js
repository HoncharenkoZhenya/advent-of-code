const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./07/${FILE_NAME}.txt`, 'utf8').trim();

const originalLines = data.split('\n');

const aValue = getAValue(new Map(), [...originalLines]);

const newAValue = getAValue(new Map([['b', aValue]]), [...originalLines].filter(line => {
    const [command, key] = line.split(' -> ');

    if (key === 'b') {
        return false;
    }

    return true
}));

console.log('MY_REG newAValue: ', newAValue);

function getAValue(dataMap = new Map(), lines) {
    while (lines.length) {
        const line = lines.shift();

        const [command, key] = line.split(' -> ');
        const parsedCommand = command.split(' ');

        if (parsedCommand.length === 1) {
            const isNumber = !isNaN(parsedCommand[0]);
            if (isNumber) {
                dataMap.set(key, parseInt(parsedCommand[0]));
            } else {
                const value = dataMap.get(parsedCommand[0]);

                if (value !== undefined) {
                    dataMap.set(key, value);
                } else {
                    lines.push(line);
                }
            }
        } else if (parsedCommand.length === 2) {
            const value = dataMap.get(parsedCommand[1]);

            if (value !== undefined) {
                dataMap.set(key, 65535 - value);
            } else {
                lines.push(line);
            }
        } else {
            const [first, operator, second] = parsedCommand;

            let firstValue;
            const isFirstValueNumber = !isNaN(first);
            if (isFirstValueNumber) {
                firstValue = parseInt(first);
            } else {
                firstValue = dataMap.get(first);
            }

            if (firstValue === undefined) {
                lines.push(line);
                continue;
            }

            let secondValue;
            const isSecondValueNumber = !isNaN(second);
            if (isSecondValueNumber) {
                secondValue = parseInt(second);
            } else {
                secondValue = dataMap.get(second);
            }

            if (secondValue === undefined) {
                lines.push(line);
                continue;
            }

            switch (operator) {
                case 'AND':
                    dataMap.set(key, firstValue & secondValue);
                    break;
                case 'OR':
                    dataMap.set(key, firstValue | secondValue);
                    break;
                case 'LSHIFT':
                    dataMap.set(key, firstValue << secondValue);
                    break;
                case 'RSHIFT':
                    dataMap.set(key, firstValue >> secondValue);
                    break;
            }
        }
    }

    return dataMap.get('a');
}
