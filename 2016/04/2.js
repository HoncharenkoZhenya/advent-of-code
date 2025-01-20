const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./04/${FILE_NAME}.txt`, 'utf8').trim();

const rooms = data.split('\n').map(room => {
    const [name, sector, checksum] = room.match(/(.+)-(\d+)\[(.+)\]/).slice(1);

    const originalName = name.split('').map(char => {
        if (char === '-') {
            return ' ';
        }

        const charCode = char.charCodeAt(0) - 97;
        const newCharCode = (charCode + parseInt(sector, 10)) % 26;

        return String.fromCharCode(newCharCode + 97);
    }).join('');

    return {
        name,
        sector: parseInt(sector, 10),
        checksum,
        originalName
    };
});

console.log('MY_REG rooms: ', rooms.filter(r => r.originalName.includes('north')));
