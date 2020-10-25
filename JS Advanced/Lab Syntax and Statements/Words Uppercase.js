function solve(input){

    let pattern = /[A-Za-z0-9]+/g;
    let result = pattern.exec(input);
    let collection = [];
    while(result){
        collection.push(result[0]);

        result = pattern.exec(input);
    }

    let upper = collection.map(x => x.toUpperCase());
    console.log(upper.join(', '));
}
solve('Hi, how are you?hefohsiohsiohisoisvniosnviosnvshgiosnis5asafasf');