function solution(num){
    let currNumber = num;
    return function(number){
        return currNumber + number;
    };
}

let add7 = solution(7);
console.log(add7(2));
console.log(add7(3));
