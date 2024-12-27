const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const EXAMPLE_FILE_NAME2 = 'exampleData2';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./8/${FILE_NAME}.txt`, 'utf8');

const dataArr = data
    .split('\n')
    .filter(Boolean);

const maxX = dataArr[0].length;
const maxY = dataArr.length;

const antennasPlaces = {};

for (let i = 0; i < dataArr.length; i++) {
    for (let j = 0; j < dataArr.length; j++) {
        const item = dataArr[i][j];
        if (item !== '.') {
            if (antennasPlaces[item]) {
                antennasPlaces[item].push({ x: j, y: i });
            } else {
                antennasPlaces[item] = [{ x: j, y: i }];
            }
        }
    }
}

let result = [];

Object.keys(antennasPlaces).forEach((keys) => {
    const places = antennasPlaces[keys];
    if (places.length === 1) {
        return;
    }

    places.forEach((place) => {
        result.push(`${place.x}_${place.y}`);
    });

    for (let i = 0; i < places.length; i++) {
        const currentPlace = places[i];
        const otherPlaces = places.filter((place, index) => index !== i);

        const allAntinodePlaces = getAllAntinodePlaces(currentPlace, otherPlaces)
        result = result.concat(allAntinodePlaces);
    }
});

const res = [...new Set(result)].length;

console.log('result: ', res);

function getAllAntinodePlaces(currentPlace, otherPlaces) {
    let result = [];

    for (let i = 0; i < otherPlaces.length; i++) {
        const place = otherPlaces[i];

        let currentPlaceX = currentPlace.x;
        let currentPlaceY = currentPlace.y;

        let newPlaceX = place.x;
        let newPlaceY = place.y;

        while (true) {
            const deltaX = currentPlaceX - newPlaceX;
            const deltaY = currentPlaceY - newPlaceY;

            const newX = newPlaceX - deltaX;
            const newY = newPlaceY - deltaY;

            if (newX >= 0 && newX < maxX && newY >= 0 && newY < maxY) {
                result.push(`${newX}_${newY}`);

                currentPlaceX = newPlaceX;
                currentPlaceY = newPlaceY;

                newPlaceX = newX;
                newPlaceY = newY;
            } else {
                break;
            }
        }
    }

    return result;
}
