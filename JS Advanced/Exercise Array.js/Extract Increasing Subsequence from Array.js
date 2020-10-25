function solve(array){

    // let newArr= [array.shift()];
    // array.forEach(element => {
    //     if(element >= newArr[newArr.length -1]){
    //         newArr.push(element);
    //     }
    // });
    // console.log(newArr.join('\n'));

    // with reduce 
    
    array.reduce((acc, element) => {
        if(element >= acc){
            console.log(element);
            acc = element;
        }
        return acc;
    }, Number.MIN_SAFE_INTEGER);


}

solve([1, 
    3, 
    8, 
    4, 
    10, 
    12, 
    3, 
    2, 
    24]
    );