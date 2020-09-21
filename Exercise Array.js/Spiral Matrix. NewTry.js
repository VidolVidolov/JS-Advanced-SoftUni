function solve(rows, columns) {

    let matrix = [];

    for (let i = 0; i < rows; i++) {
        let currRow = [];
        currRow.length = columns;
        currRow.fill(0)
        matrix.push(currRow);
    }

    let rotateUntil = rows * columns;
    let currentRow = 0;
    let currnetColumn = 0;
    let direction = 'right';
    let cout = 0;

    for (let i = 1; i <= rotateUntil; i++) {

        matrix[currentRow][currnetColumn] = i;

        if (direction == 'right') {
            currnetColumn++;
            cout++;
            if (cout == columns) {
                currnetColumn--;
                columns--;
                direction = 'down';
            }
            if (direction == 'down') {
                cout = 0;
            }
        }

        if (direction === 'down') {
            currentRow++;
            if (cout == columns) {
                currentRow--;
                rows--;
                direction = 'left';
            }
            cout++;
            if (direction == 'left') {
                cout = 0;
            }
        }

        if (direction === 'left') {
            currnetColumn--;
            if (cout == columns) {
                currnetColumn++;
                columns--;
                direction = 'up';
            }
            cout++;
            if (direction == 'up') {
                cout = 0;
            }
        }
        if (direction === 'up') {
            currentRow--;
            if (cout == columns) {
                currentRow++;
                rows--;
                currnetColumn++;
                direction = 'right';
            }
            cout++;
            if (direction == 'right') {
                cout = 0;
            }
        }
    }
    matrix.forEach(x => console.log(x.join(' ')));
}

solve(5, 5);
