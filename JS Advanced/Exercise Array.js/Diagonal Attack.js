function solve(input) {

    let matrix = [];
    input.forEach(element => {
        let arr = element.split(' ').map(Number);
        matrix.push(arr);
    });

    let checkDiagonals = checkDiagonalsFunction(matrix);

    if (checkDiagonals === 'Not equal.') {
        matrix.forEach(x => console.log(x.join(' ')));
    } else {
        let counter = 0;
        matrix.forEach((row, index) => {
            row[counter] = row[counter].toString();
            row[row.length - 1 - counter] = row[row.length - 1 - counter].toString();
            counter++;
        });

        let result = [];
        for (let row of matrix) {
            row = row.map(x => {
                let element = typeof (x);
                if (element !== 'string') {
                    x = checkDiagonals;
                }
                return x;
            });
            result.push(row);
        }
        result.forEach(x => console.log(x.join(' ')));
    }

    function checkDiagonalsFunction(matrix) {
        let mainDiagonal = 0;
        let secondaryDiagonal = 0;
        let counter = 0;
        matrix.forEach((row, index) => {
            mainDiagonal += row[counter];
            secondaryDiagonal += row[row.length - 1 - counter];
            counter++;
        });
        if (mainDiagonal == secondaryDiagonal) {
            return mainDiagonal;
        } else {
            return 'Not equal.';
        }
    }
}
solve(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']
);
