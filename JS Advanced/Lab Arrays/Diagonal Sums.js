function solve(input) {

    // let firstDiagonal = input[0][0];
    // let secondDiagonal = input[0][input.length - 1];

    // for (let i = 0; i < input.length - 1; i++) {
    //     firstDiagonal += input[i + 1][i + 1]
    // }
    // let counter = input.length - 2;
    // for (let i = 1; i < input.length; i++) {
    //     let element = input[i][counter];
    //     secondDiagonal += element;
    //     counter--;

    // }
    // let result = `${firstDiagonal.toString()} ${secondDiagonal.toString()}`;
    // console.log(result);

    //better solution

    let mainDiagonalSum = 0;
    let secondaryDiagonalSum = 0;
    let counter = 0;

    input.forEach(row => {
        mainDiagonalSum += row[counter];
        secondaryDiagonalSum += row[input.length - 1 - counter];

        counter++;
    });

    console.log(`${mainDiagonalSum} ${secondaryDiagonalSum}`);

}
solve([[20, 40],
[10, 60]]
);
solve([[3, 5, 17],
[-1, 7, 14],
[1, -8, 89]]
);