const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = EXAMPLE_FILE_NAME;

const data = fs.readFileSync(`./25/${FILE_NAME}.txt`, 'utf8').trim();
