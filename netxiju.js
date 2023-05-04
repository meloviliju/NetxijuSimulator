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

const isIoMok = (person) => {
    return person.hasGoaled
        && person.thrownBackNum === 0
        && person.hasVisited.every((visited, index) => (visited || alcoholTable[index] === 0));
};

const idealPerson = {
    alcohol: 22,
    position: 31,
    hasGoaled: true,
    hasVisited: Array.from({ length: 32 }, () => true),
    thrownBackNum: 0,
};

const simulate = (person_num) => {
    const persons = Array.from({ length: person_num }, () => ({
        alcohol: 0,
        position: 0,
        hasGoaled: false,
        thrownBackNum: 0,
        hasVisited: Array.from({ length: alcoholTable.length }, () => false),
    }));
    while (true) {
        for (let i = 0; i < persons.length; i++) {
            const person = persons[i];
            if (person.hasGoaled) {
                continue;
            }
            let xiju = getXiju();
            if (person.position + xiju >= alcoholTable.length) {
                continue;
            }
            person.position += xiju;
            person.hasVisited[person.position] = true;
            person.alcohol += alcoholTable[person.position];
            if (person.position === alcoholTable.length - 1) {
                person.hasGoaled = true;
            } else {
                // かぶった人を振り出しへ
                for (let j = 0; j < persons.length; j++) {
                    if (i === j) {
                        continue;
                    } else if (persons[i].position === persons[j].position) {
                        persons[j].position = 0;
                        persons[j].thrownBackNum++;
                    }
                }
            }
            if (persons.every(p => p.hasGoaled)) {
                return persons;
            }
        }
    }
}

const runSimulation = (person_num = 1, iteration_num = 100000) => {
    let iomok_count = 0;
    for (let i = 0; i < iteration_num; i++) {
        const persons = simulate(person_num);
        if (persons.some(isIoMok)) {
            iomok_count++;
        }
    }
    return { person_num, iomok_count, iteration_num };
};