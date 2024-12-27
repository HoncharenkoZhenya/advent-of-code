const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData2';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./22/${FILE_NAME}.txt`, 'utf8');

const numbers = data
    .split('\n')
    .filter(Boolean)
    .map(BigInt);

const sequencePriceMap = new Map();

for (let number of numbers) {
    const prices = [getPrice(number)];
    const priceChanges = [];
    const sequencePriceMapForNumber = new Map();

    for (let i = 0; i < 2000; i++) {
        number = getNextSecret(number);
        prices.push(getPrice(number));
        priceChanges.push(prices[prices.length - 1] - prices[prices.length - 2]);
    }

    for (let i = 4; i <= priceChanges.length; i++) {
        const priceSequence = priceChanges.slice(i - 4, i).join(',');
        const finalPrice = prices[i];

        if (!sequencePriceMapForNumber.has(priceSequence)) {
            sequencePriceMapForNumber.set(priceSequence, finalPrice);
        }
    }

    for (const [sequence, price] of sequencePriceMapForNumber.entries()) {
        if (!sequencePriceMap.has(sequence)) {
            sequencePriceMap.set(sequence, price);
        } else {
            sequencePriceMap.set(sequence, price + sequencePriceMap.get(sequence));
        }
    }
}

const result = Math.max(...sequencePriceMap.values());
console.log('result: ', result);

function getNextSecret(number) {
    number = firstStep(number);
    number = secondStep(number);
    return thirdStep(number);
}

function getPrice(number) {
    return Number(`${number}`.substr(-1))
}

function firstStep(number) {
    const newNumber = number * BigInt(64);
    const mixedNumber = mix(newNumber, number);
    return prune(mixedNumber);
}

function secondStep(number) {
    const newNumber = BigInt(Math.round(Number(number / BigInt(32))));
    const mixedNumber = mix(newNumber, number);
    return prune(mixedNumber);
}

function thirdStep(number) {
    const newNumber = number * BigInt(2048);
    const mixedNumber = mix(newNumber, number);
    return prune(mixedNumber);
}

function mix(newNumber, secretNumber) {
    return newNumber ^ secretNumber;
}

function prune(secretNumber) {
    return secretNumber % BigInt(16777216);
}
