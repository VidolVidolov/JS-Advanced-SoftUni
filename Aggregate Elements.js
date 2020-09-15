function solve(arr){

    let sum = 0;
    let sum2 = 0;
    let concat = '';

    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        sum += element;
        sum2 += (1 / element);
        concat += element;
    }
    console.log(sum);
    console.log(sum2);
    console.log(concat);
}
solve([1, 2, 3]);