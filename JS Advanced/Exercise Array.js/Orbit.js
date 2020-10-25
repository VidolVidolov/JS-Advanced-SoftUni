function solve(input) {

    let orbit = input.slice(0, 2);
    let star = input.slice(2);

    let matrix = [];
    for (let i = 0; i < orbit[1]; i++) {
        let row = [];
        row.length = orbit[0];
        row.fill(0);
        matrix.push(row);
    }

    let x = star[0];
    let y = star[1];
    for (let i = 0; i < orbit[0]; i++) {
        for (let j = 0; j < orbit[1]; j++) {
            matrix[i][j] = Math.max(Math.abs(i - x), Math.abs(j - y)) + 1;
        }
    }

    matrix.forEach(x => console.log(x.join(' ')));
}

// solve([4, 4, 0, 0]);
solve([5, 5, 2, 2]);