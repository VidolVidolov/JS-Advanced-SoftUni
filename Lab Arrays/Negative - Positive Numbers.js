function solve(input){

    let newArr = [];

    for (let i = 0; i < input.length; i++) {
        let element = input[i];
        if(element < 0){
            newArr.unshift(element);
        }else {
            newArr.push(element);
        }
    }
    console.log(newArr.join('\n'));
}
solve([3, -2, 0, -1]);