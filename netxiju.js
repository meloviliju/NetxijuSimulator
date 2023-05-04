"use strict";
const getXiju = () => {
    let res = 0;
    for (let i = 0; i < 6; i++) {
        res += (Math.random() < 0.5) ? 0 : 1;
    }
    return res;
};

const two = [0, 0, 2];
const three = [0, 0, 0, 3];
const alcoholTable = [
    0,
    ...two,
    ...two,
    ...two,
    ...two,
    ...two,
    ...three,
    ...three,
    ...three,
    ...three,
];

const simulate = (person_num) => {
    const persons = Array.from({ length: person_num }, () => ({
        alcohol: 0,
        position: 0,
        hasGoaled: false,
    }));
    while (true) {
        for (let i = 0; i < person_num; i++) {
            const person = persons[i];
            if (person.hasGoaled) {
                continue;
            }
            let xiju = getXiju();
            if (person.position + xiju >= alcoholTable.length) {
                continue;
            }
            person.position += xiju;
            person.alcohol += alcoholTable[person.position];
            if (person.position === alcoholTable.length - 1) {
                person.hasGoaled = true;
            }
            if (persons.every(p => p.hasGoaled)) {
                return persons;
            }
        }
    }
}