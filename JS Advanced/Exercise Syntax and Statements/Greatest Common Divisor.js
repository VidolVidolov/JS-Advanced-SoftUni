function solve(number, number2){

    let bigger = Math.max(number, number2);
    let lower = Math.min(number, number2);
    let divisor = 0;
    for (let i = bigger; i >= 0; i--) {
        
        if(bigger % i == 0 && lower % i == 0){
            divisor = i;
            break;
        }
        
    }
    console.log(divisor);
}

solve(15,5);