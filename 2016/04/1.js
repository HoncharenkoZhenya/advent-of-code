const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./04/${FILE_NAME}.txt`, 'utf8').trim();

const rooms = data.split('\n').map(room => {
    const [name, sector, checksum] = room.match(/(.+)-(\d+)\[(.+)\]/).slice(1);
    return {
        name,
        sector: parseInt(sector, 10),
        checksum
    };
});

const realRooms = rooms.filter(room => {
    const charsCount = room.name.replace(/-/g, '').split('').reduce((acc, char) => {
        acc[char] = acc[char] ? acc[char] + 1 : 1;
        return acc;
    }, {});

    const calculatedChecksum = Object.keys(charsCount).sort((a, b) => {
        if (charsCount[a] === charsCount[b]) {
            return a < b ? -1 : 1;
        }
        return charsCount[b] - charsCount[a];
    }).slice(0, 5).join('');

    return calculatedChecksum === room.checksum;
});

const result = realRooms.reduce((acc, room) => acc + room.sector, 0);

console.log('MY_REG result: ', result);
