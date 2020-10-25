function solve(input, actions) {

    let info = {};
    input.forEach(element => {
        let container = [];
        Object.values(element).forEach(x => {
            container.push(x);
        })
        let [kingdom, general, army] = container;
        army = Number(army);

        if (!info[kingdom]) {
            info[kingdom] = {};
            info[kingdom][general] = [army, 0, 0];
        } else {
            if (info[kingdom][general]) {
                info[kingdom][general][0] += army;
            } else {
                info[kingdom][general] = [army, 0, 0];
            }
        }
    });

    actions.forEach(line => {
        let [attackKindom, attckGeneral, defendKingdom, defendGeneral] = line;

        if (attackKindom !== defendKingdom) {
            let attackArmy = info[attackKindom][attckGeneral][0];
            let defendArmy = info[defendKingdom][defendGeneral][0];
            if (attackArmy > defendArmy) {
                info[attackKindom][attckGeneral][0] = Math.floor(attackArmy * 1.1);
                info[defendKingdom][defendGeneral][0] = Math.floor(defendArmy * 0.9);
                info[attackKindom][attckGeneral][1]++;
                info[defendKingdom][defendGeneral][2]++;
            } else if(attackArmy < defendArmy) {
                info[attackKindom][attckGeneral][0] = Math.floor(attackArmy * 0.9);
                info[defendKingdom][defendGeneral][0] = Math.floor(defendArmy * 1.1);
                info[attackKindom][attckGeneral][2]++;
                info[defendKingdom][defendGeneral][1]++;
            }
        }
    });

    let sorted = Object.keys(info).sort((a, b) => {
        let A = Object.keys(info[a]).reduce((acc, x) => acc + info[a][x][1], 0);
        let B = Object.keys(info[b]).reduce((acc, x) => acc + info[b][x][1], 0);

        let C = Object.keys(info[a]).reduce((acc, x) => acc + info[a][x][2], 0);
        let D = Object.keys(info[b]).reduce((acc, x) => acc + info[b][x][2], 0);
        return B - A || C - D || a.localeCompare(b);
    });
    console.log(`Winner: ${sorted[0]}`);
    let sortedGenerals = Object.keys(info[sorted[0]]).sort((a, b) => {
        let A = Object.values(info[sorted[0]][a])[0];
        let B = Object.values(info[sorted[0]][b])[0];
        return B - A;
    });
    sortedGenerals.forEach(x => {
        console.log(`/\\general: ${x}`);
        console.log(`---army: ${info[sorted[0]][x][0]}`);
        console.log(`---wins: ${info[sorted[0]][x][1]}`);
        console.log(`---losses: ${info[sorted[0]][x][2]}`);
    })
}

solve([{ kingdom: "Stonegate", general: "Ulric", army: 5000 },
{ kingdom: "YorkenShire", general: "Quinn", army: 5000 },
{ kingdom: "Maiden Way", general: "Berinon", army: 1000 }],
    [["YorkenShire", "Quinn", "Stonegate", "Ulric"],
    ["Maiden Way", "Berinon", "YorkenShire", "Quinn"]]

);