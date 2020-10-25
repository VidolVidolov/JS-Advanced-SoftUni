function solve(input) {

    // let equals = 0;

    // for (let i = 0; i < input.length - 1; i++) {
    //     for (let z = 0; z < input[i].length; z++) {
    //         let one = input[i][z];
    //         let two = input[i + 1][z]
    //         if (one === two) {
    //             equals++;
    //         }
    //         if (input[i][z] === input[i][z + 1]) {
    //             equals++;
    //         }
    //     }

    // }
    // for (let i = 0; i < input[input.length - 1].length; i++) {
    //     if (input[input.length - 1][i] === input[input.length - 1][i + 1]) {
    //         equals++;
    //     }

    // }
    // console.log(equals);

    //better solution

    let pairs = 0;

    input.forEach((row, index) => {
        row.forEach((element, j) => {
            if (element === row[j + 1]) {
                pairs++;
            }
            if (input[index + 1] && element === input[index + 1][j]) {
                pairs++;
            }
        })
    });

    console.log(pairs);
}
solve([ ['2', '3', '4', '7', '0'],
        ['4', '0', '5', '3', '4'],
        ['2', '3', '5', '4', '2'],
        ['9', '8', '7', '5', '4']]

);