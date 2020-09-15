function solve(number, number2){

    let num = Number(number);
    let num2 = Number(number2);
    let result = 0;
    for (let i = num; i <= num2; i++) {
        result += i;
    }
    console.log(result);

}
solve('-8', '20');