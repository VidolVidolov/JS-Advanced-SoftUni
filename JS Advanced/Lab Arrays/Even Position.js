function solve(input){

    let arr = [];
    for (let i = 0; i < input.length; i++) {
        let element = input[i];
        if(i % 2 === 0){
            arr.push(element);
        }
    }
    console.log(arr.join(' '));
}

solve(['20', '30', '40']);