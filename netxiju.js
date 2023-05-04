const getXiju = () => {
    let res = 0;
    for (let i = 0; i < 6; i++) {
        res += (Math.random() < 0.5) ? 0 : 1;
    }
    return res;
};

const oneperson = () => {
    const two = [0, 0, 2];
    const three = [0, 0, 0, 3];
    const alcoholTable = [
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
    const person = {
        alcohol: 0,
        position: 0
    };
    while (true) {
        let xiju = getXiju();
        if (person.position + xiju >= alcoholTable.length) {
            continue;
        }
        person.position += xiju;
        person.alcohol += alcoholTable[person.position];
        if (person.position === alcoholTable.length - 1) {
            break;
        }
    }
    return person.alcohol;
}