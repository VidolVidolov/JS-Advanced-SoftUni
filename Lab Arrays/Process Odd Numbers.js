function solve(input){

    let newArray = [];
    for (let i = 0; i < input.length; i++) {
        let element = input[i];
        if(i % 2 !== 0){
            newArray.unshift(element*2);
        }
    }
    console.log(newArray.join(' '));
}

solve([10, 15, 20, 25]);