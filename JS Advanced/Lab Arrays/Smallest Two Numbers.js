function solve(input) {

    // let min = 0;
    // let arr = [];
    // let removeOne = (input) => {
    //     let currMin = input[0];
    //     min = currMin;
    //     for (let i = 0; i < input.length; i++) {
    //         if (currMin > input[i + 1]) {
    //             currMin = input[i + 1];
    //             min = currMin;
    //         }

    //     }
    //     let index = input.indexOf(min);
    //     input.splice(index,1);
    // }
    // removeOne(input);
    // arr.push(min);
    // removeOne(input);
    // arr.push(min);
    // console.log(arr.join(' '));

    let sorted = input.sort((a, b) => a - b);
    console.log(`${sorted[0]} ${sorted[1]}`);
}
solve([30, 15, 50, 5]);