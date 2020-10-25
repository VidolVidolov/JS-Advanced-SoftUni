function solve(input) {

    let juices = {};
    let bottles = {};
    input.forEach(element => {
        let [fruit, quantity] = element.split(' => ');
        quantity = Number(quantity);
        if (!juices[fruit]) {
            juices[fruit] = quantity;
        }else{
            juices[fruit] +=quantity;
        }
        if (juices[fruit] >= 1000) {
            bottles[fruit] = 0;
        }
    });
    Object.keys(juices).forEach(el => {
        if(bottles[el] !== undefined){
            bottles[el] += juices[el];
        }
    })
    Object.keys(bottles).forEach(x => console.log(`${x} => ${Math.floor(bottles[x] / 1000)}`));
}

solve(['Kiwi => 234',
'Pear => 2345',
'Watermelon => 3456',
'Kiwi => 4567',
'Pear => 5678',
'Watermelon => 6789']


);