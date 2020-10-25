function solve(input) {

    let commands = input.shift();
    let arena = {};
    while (commands !== 'Ave Cesar') {
        if (commands.includes('->')) {
            let [name, technique, points] = commands.split(' -> ');
            if (!arena[name]) {
                arena[name] = {};
                arena[name][technique] = Number(points);
            } else {
                if (arena[name][technique]) {
                    arena[name][technique] < Number(points) ? arena[name][technique] = Number(points) : arena[name][technique];
                } else {
                    arena[name][technique] = Number(points);
                }
            }
        } else if (commands.includes('vs')) {
            let [gladiatorOne, gladiatorTwo] = commands.split(' vs ');
            let haveInCommon = false;
            if (arena[gladiatorOne] && arena[gladiatorTwo]) {
                Object.keys(arena[gladiatorOne]).forEach(x => {
                    Object.keys(arena[gladiatorTwo]).forEach(y => {
                        if (x === y) {
                            haveInCommon = true;
                        }
                    })
                })
                if (haveInCommon) {
                    let firstPoints = Object.values(arena[gladiatorOne]).reduce((acc, x) => acc + x, 0);
                    let secondPoints = Object.values(arena[gladiatorTwo]).reduce((acc, x) => acc + x, 0);
                    firstPoints > secondPoints ? delete arena[gladiatorTwo] : delete arena[gladiatorOne];
                }
            }
        }

        commands = input.shift();
    }
    let sort = Object.keys(arena).sort((a, b) => {
        let A = Object.values(arena[a]).reduce((acc, x) => acc + x, 0);
        let B = Object.values(arena[b]).reduce((acc, x) => acc + x, 0);
        return B - A || a.localeCompare(b);})
        .forEach(x => {
        let points = Object.values(arena[x]).reduce((acc, p) => acc + p, 0)
        console.log(`${x}: ${points} skill`);
        Object.keys(arena[x]).sort((a,b) => arena[x][b] - arena[x][a] || a.localeCompare(b)).forEach(skill => console.log(`- ${skill} <!> ${arena[x][skill]}`));
    })
}

solve(
    ['Pesho -> Duck -> 400',
        'Julius -> Shield -> 150',
        'Gladius -> Heal -> 200',
        'Gladius -> Support -> 250',
        'Gladius -> Shield -> 250',
        'Pesho vs Gladius',
        'Gladius vs Julius',
        'Gladius vs Gosho',
        'Ave Cesar']
);