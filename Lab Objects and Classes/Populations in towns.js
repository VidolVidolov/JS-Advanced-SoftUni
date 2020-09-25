function solve(input) {

    let formatedInput = input.map(x => x.split(' <-> '));
    let object = {};
    formatedInput.forEach(element => {
        if(!object[element[0]]){
            object[element[0]] = Number(element[1]);
        }else{
            object[element[0]] += Number(element[1]);
        }
    })
    for (const key in object) {
        console.log(`${key} : ${object[key]}`);
    }

}
solve(['Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000']
);