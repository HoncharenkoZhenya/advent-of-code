const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const EXAMPLE_FILE_NAME2 = 'exampleData2';
const EXAMPLE_FILE_NAME3 = 'exampleData3';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const getResult = (FILE_NAME) => {
    const data = fs
        .readFileSync(`./12/${FILE_NAME}.txt`, 'utf8')
        .split('\n')
        .filter(Boolean)
        .map(r => r.split(''));

    const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ]

    const usedFields = new Set();
    const regions = [];

    const getUniqFieldsFromRegion = (region) => {
        const regionKeys = region.map(([i, j]) => `${i}-${j}`);
        const uniqFields = new Set(regionKeys);
        const uniqRegion = [...uniqFields].map((key) => key.split('-').map(Number));

        return uniqRegion;
    }

    const findRegions = (currentItem, i, j, region = []) => {
        region.push([i, j]);

        for (const [directionRow, directionCol] of directions) {
            const nextI = i + directionRow;
            const nextJ = j + directionCol;

            if (nextI < 0 || nextI >= data.length || nextJ < 0 || nextJ >= data[nextI].length) {
                continue;
            }

            if (data[nextI][nextJ] === currentItem) {
                if (!region.some(([i, j]) => i === nextI && nextJ === j)) {
                    findRegions(currentItem, nextI, nextJ, region)
                }
            }
        }

        return region;
    };

    const findUniqRegion = (currentItem, i, j) => {
        const region = findRegions(currentItem, i, j);
        return getUniqFieldsFromRegion(region);
    }

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (usedFields.has(`${i}-${j}`)) {
                continue;
            }
            const currentItem = data[i][j];
            const currentRegion = findUniqRegion(currentItem, i, j);
            regions.push(currentRegion);
            currentRegion.forEach(([i, j]) => usedFields.add(`${i}-${j}`));
        }
    }

    const regionsPrice = regions.map(region => {
        const regionSquare = region.length;
        const regionPerimeter = region.reduce((acc, [i, j]) => {
            let perimeter = 4;
            for (const [directionRow, directionCol] of directions) {
                const nextI = i + directionRow;
                const nextJ = j + directionCol;

                if (region.some(([i, j]) => i === nextI && j === nextJ)) {
                    perimeter -= 1;
                }
            }

            return acc + perimeter;
        }, 0);

        return regionSquare * regionPerimeter;
    });

    return regionsPrice.reduce((acc, price) => acc + price, 0);
}

const MY_DATA = getResult(FILE_NAME);
console.log('result: ', MY_DATA);




