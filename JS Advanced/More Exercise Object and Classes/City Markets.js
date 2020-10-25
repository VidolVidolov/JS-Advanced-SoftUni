function solve(input) {

    let market = {};
    input.forEach(line => {
        let [town, product, info] = line.split(' -> ');
        let [numberOfProducts, pricePerOne] = info.split(' : ');
        let income = Number(numberOfProducts) * Number(pricePerOne);
        if(!market[town]){
            market[town] = {};
        }
        market[town][product] = income;
    });
    Object.keys(market).forEach(town => {
        console.log(`Town - ${town}`);
        Object.keys(market[town]).forEach(product => console.log(`$$$${product} : ${market[town][product]}`));
    })
}
solve(['Sofia -> Laptops HP -> 200 : 2000',
    'Sofia -> Raspberry -> 200000 : 1500',
    'Sofia -> Audi Q7 -> 200 : 100000',
    'Montana -> Portokals -> 200000 : 1',
    'Montana -> Qgodas -> 20000 : 0.2',
    'Montana -> Chereshas -> 1000 : 0.3']
);