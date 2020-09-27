function solve(input) {

    let sequence = new Set();
    let array = [];
    input.forEach(x => array.push(JSON.parse(x)));
    array.forEach(line => {
        line.map(Number)
        let sort = line.sort((a, b) => b - a);
        sequence.add(sort.join(', '));
    });
    let output = [];
    for (const item of sequence) {
        output.push(item.split(', ').map(Number));
    }
    let sort = output.sort((a, b) => a.length - b.length);
    sort.forEach(x => console.log(`[${x.join(', ')}]`));
}
solve(["[-3, -2, -1, 0, 1, 2, 3, 4]",
    "[10, 1, -17, 0, 2, 13]",
    "[4, -3, 3, -2, 2, -1, 1, 0]"]
);