const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData_2';
const EXAMPLE_FILE_NAME2 = 'exampleData2_2';
const EXAMPLE_FILE_NAME3 = 'exampleData3_2';
const EXAMPLE_FILE_NAME4 = 'exampleData2';
const EXAMPLE_FILE_NAME5 = 'exampleData3';
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

    const getRegionBulk = (region) => {
        const regionPerimeter = region.reduce((acc, [i, j]) => {
            let borderSides = ['t', 'r', 'b', 'l'];

            for (const [directionRow, directionCol] of directions) {
                const nextI = i + directionRow;
                const nextJ = j + directionCol;
                let currentSide;
                if (directionRow === 1 && directionCol === 0) {
                    currentSide = 'b';
                } else if (directionRow === -1 && directionCol === 0) {
                    currentSide = 't';
                } else if (directionRow === 0 && directionCol === 1) {
                    currentSide = 'r';
                } else {
                    currentSide = 'l';
                }

                if (region.some(([i, j]) => i === nextI && j === nextJ)) {
                    borderSides = borderSides.filter(side => side !== currentSide);
                }
            }

            borderSides.forEach(side => {
                acc[side].push([i, j]);
            });

            return acc;
        }, {
            t: [],
            r: [],
            b: [],
            l: [],
        });

        const filteredRegionPerimeter = Object.entries(regionPerimeter)
            .reduce((acc, [key, value]) => {
                const sortedValue = value.sort((a, b) => {
                    if (key === 't' || key === 'b') {
                        if (a[0] === b[0]) {
                            return a[1] - b[1];
                        }
                        return a[0] - b[0];
                    }

                    if (a[1] === b[1]) {
                        return a[0] - b[0];
                    }
                    return a[1] - b[1];
                });

                let res = 1;

                for (let i = 0; i < sortedValue.length - 1; i++) {
                    const currentValue = sortedValue[i];
                    const nextValue = sortedValue[i + 1];

                    switch (key) {
                        case 't':
                            if (
                                (currentValue[0] === nextValue[0] && currentValue[1] + 1 !== nextValue[1]) ||
                                (currentValue[0] !== nextValue[0])
                            ) {
                                res++;
                            }
                            break;
                        case 'b':
                            if (
                                (currentValue[0] === nextValue[0] && currentValue[1] + 1 !== nextValue[1]) ||
                                (currentValue[0] !== nextValue[0])
                            ) {
                                res++;
                            }
                            break;
                        case 'r':
                            if (
                                (currentValue[1] === nextValue[1] && currentValue[0] + 1 !== nextValue[0]) ||
                                (currentValue[1] !== nextValue[1])
                            ) {
                                res++;
                            }
                            break;
                        case 'l':
                            if (
                                (currentValue[1] === nextValue[1] && currentValue[0] + 1 !== nextValue[0]) ||
                                (currentValue[1] !== nextValue[1])
                            ) {
                                res++;
                            }
                            break;
                    }
                }

                return acc + res;
            }, 0);

        return filteredRegionPerimeter;
    };

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

        const regionBulk = getRegionBulk(region);

        return regionSquare * regionBulk;
    });

    return regionsPrice.reduce((acc, price) => acc + price, 0);
}

const MY_DATA = getResult(FILE_NAME);

console.log('result: ', MY_DATA);




