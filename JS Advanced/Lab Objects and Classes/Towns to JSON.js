function solve(input) {

    let output = [];
    let result = input.map(x => x.split('|').filter(x => x != '').map(x => x.trim()));

    let [town, latitude, longitude] = result.shift();
    
    result.forEach(element => {
        let obj = {};
        obj[town] = element[0];
        obj[latitude] = Number(Number(element[1]).toFixed(2));
        obj[longitude] = Number(Number(element[2]).toFixed(2));
        output.push(obj);
    });

    console.log(JSON.stringify(output));
}
solve(['| Town | Latitude | Longitude |',
    '| Veliko Turnovo | 43.0757 | 25.6172 |',
    '| Monatevideo | 34.50 | 56.11 |']);