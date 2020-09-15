function solve(number, number2, number3){

    // let result = Math.max(number, number2, number3);
    // console.log(`The largest number is ${result}.`);

    if(number > number2 && number > number3){
        console.log(`The largest number is ${number}.`);
    }else if(number2 > number && number2 > number3){
        console.log(`The largest number is ${number2}.`);
    }else if(number3 > number && number3 > number2){
        console.log(`The largest number is ${number3}.`);
    }

}

solve(5, -3, 16);