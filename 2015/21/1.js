const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./21/${FILE_NAME}.txt`, 'utf8').trim().split('\n');

const [hp, d, a] = data.map(line => +line.split(': ')[1]);

const shopStr = `Weapons:    Cost  Damage  Armor
Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0

Armor:      Cost  Damage  Armor
Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5

Rings:      Cost  Damage  Armor
Damage_1    25     1       0
Damage_2    50     2       0
Damage_3   100     3       0
Defense_1   20     0       1
Defense_2   40     0       2
Defense_3   80     0       3`;

const [weaponsStr, armorStr, ringsStr] = shopStr.split('\n\n');

const weapons = parseShopItems(weaponsStr);
const armor = parseShopItems(armorStr);
const rings = parseShopItems(ringsStr);

const ME = {
    hp: 100,
    damage: 0,
    armor: 0,
}

const BOSS = {
    hp,
    damage: d,
    armor: a,
}

const allVariations = allItemsVariations();

for (const variation of allVariations) {
    ME.damage = variation.reduce((acc, item) => acc + item.damage, 0);
    ME.armor = variation.reduce((acc, item) => acc + item.armor, 0);

    if (fight(ME, BOSS)) {
        console.log('MY_REG variation: ', variation.reduce((acc, item) => acc + item.cost, 0));
        break;
    }
}

function fight(me, boss) {
    let myHp = me.hp;
    let bossHp = boss.hp;

    while (myHp > 0 && bossHp > 0) {
        bossHp -= Math.max(1, me.damage - boss.armor);

        if (bossHp <= 0) {
            return true;
        }

        myHp -= Math.max(1, boss.damage - me.armor);

        if (myHp <= 0) {
            return false;
        }
    }
}

function parseShopItems(str) {
    return str.split('\n').slice(1).map(line => {
        const [name, cost, damage, armor] = line.split(/\s+/);
        return { name, cost: +cost, damage: +damage, armor: +armor };
    });
}

function allItemsVariations() {
    let variations = [];

    const weaponsVariations = [...weapons];

    const armorVariations = [...armor, null];

    const ringsVariations = [
        null,
        ...rings,
        ...getTwoRingsVariations(),
    ];

    for (const weapon of weaponsVariations) {
        for (const armor of armorVariations) {
            for (const ring of ringsVariations) {
                let rings;

                if (Array.isArray(ring)) {
                    rings = ring;
                } else {
                    rings = [ring];
                }

                variations.push([weapon, armor, ...rings].filter(Boolean));
            }
        }
    }

    return variations.sort((a, b) => {
        return a.reduce((acc, item) => acc + item.cost, 0) - b.reduce((acc, item) => acc + item.cost, 0);
    });
}

function getTwoRingsVariations() {
    const result = [];

    for (let i = 0; i < rings.length; i++) {
        for (let j = i + 1; j < rings.length; j++) {
            result.push([rings[i], rings[j]]);
        }
    }

    return result;
}
