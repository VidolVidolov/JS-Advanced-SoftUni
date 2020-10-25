function solve(input) {

    let first = Number(input[0]);
    let last = Number(input[input.length - 1]);
    let sum = 0;

    if (!last) {
        last = 0;
    }
    sum = first + last;
    console.log(sum);

}

solve(['20', '30', '40']);