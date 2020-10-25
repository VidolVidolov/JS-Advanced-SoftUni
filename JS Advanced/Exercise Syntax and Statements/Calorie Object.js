function solve(input){

    let object = {};

    while(input.length > 0) {
        let product = input.shift();
        let calories = input.shift();
        
        object[product] = Number(calories);
        
    }

    console.log(object);

}

solve(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']);