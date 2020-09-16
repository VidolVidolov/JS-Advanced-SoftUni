function solve(number) {

    let sum = 0;
    let numString = number.toString();
    let flag = true;
    let current = numString[0];
    for (const iterator of numString) {
        if(iterator !== current){
            flag = false;
        }
        current = iterator;
        sum += Number(iterator);
    }
    console.log(flag);
    console.log(sum);

}

solve(1234);