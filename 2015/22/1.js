const fs = require('fs');

const EXAMPLE_FILE_NAME = 'exampleData';
const MY_DATA_FILE_NAME = 'myData';

const FILE_NAME = MY_DATA_FILE_NAME;

const data = fs.readFileSync(`./22/${FILE_NAME}.txt`, 'utf8').trim();

let DEBUG_ITERATIONS = 0;

const ME = {
    hp: 50,
    mana: 500,
    armor: 0,
    spentMana: 0,
}

const BOSS = {
    hp: 55,
    damage: 8,
}

const SPELLS = {
    MAGIC_MISSILE: {
        cost: 53,
        damage: 4,
        heal: 0,
        armor: 0,
        mana: 0,
        duration: 0,
    },
    DRAIN: {
        cost: 73,
        damage: 2,
        heal: 2,
        armor: 0,
        mana: 0,
        duration: 0,
    },
    SHIELD: {
        cost: 113,
        damage: 0,
        heal: 0,
        armor: 7,
        mana: 0,
        duration: 6,
    },
    POISON: {
        cost: 173,
        damage: 3,
        heal: 0,
        armor: 0,
        mana: 0,
        duration: 6,
    },
    RECHARGE: {
        cost: 229,
        damage: 0,
        heal: 0,
        armor: 0,
        mana: 101,
        duration: 5,
    },
}

const res = fight();

console.log('MY_REG res: ', res);

// 801, 787, 854 - to low

// res.forEach(r => {
//     console.log('\n');
//     console.log('MY_REG r.manaSpent: ', r.manaSpent);
// })

function fight() {
    let wins = [];
    let castedSpellsSet = new Set();

    function move(me, boss, activeSpells, isMeTurn, castedSpells, moveNumber) {
        me.armor = 0;

        let newActiveSpells = [...activeSpells].filter(({ spell }) => spell.duration > 0);

        newActiveSpells.forEach(({ spell }) => {
            me.armor += spell.armor;
            me.mana += spell.mana;
            boss.hp -= spell.damage;

            spell.duration--;
        });

        newActiveSpells = [...activeSpells].filter(({ spell }) => spell.duration > 0);

        if (boss.hp <= 0) {
            wins.push({ manaSpent: me.spentMana, castedSpells });
            return;
        }

        if (isMeTurn) {
            const keys = Object.keys(SPELLS);

            for (let i = 0; i < keys.length; i++) {
                const spellKey = keys[i];
                const spell = SPELLS[spellKey];

                if (me.mana < spell.cost || newActiveSpells.some(({ key }) => key === spellKey)) {
                    continue;
                }

                const newMe = { ...me };
                const newBoss = { ...boss };

                newMe.mana -= spell.cost;
                newMe.spentMana += spell.cost;

                if (spell.duration > 0) {
                    newActiveSpells.push({ spell: { ...spell }, key: spellKey });
                } else {
                    newBoss.hp -= spell.damage;
                    newMe.hp += spell.heal;
                }

                move(newMe, newBoss, newActiveSpells, false, [...castedSpells, spellKey], moveNumber + 1);
            }
        } else {
            const damage = Math.max(boss.damage - me.armor, 1);
            me.hp -= damage;

            if (me.hp <= 0) {
                return;
            }

            castedSpellsSet.add(castedSpells.join('_'));

            move({ ...me }, { ...boss }, [...newActiveSpells], true, [...castedSpells], moveNumber + 1);
        }
    }

    move({ ...ME }, { ...BOSS }, [], true, [], 1);

    return wins;
}
