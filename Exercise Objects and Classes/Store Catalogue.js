function solve(input) {

    let cataloge = {};
    let currLetter = '';
    input.forEach(el => {
        let [product, price] = el.split(' : ');

        if(!cataloge[product]){
            cataloge[product] = Number(price);
        }

    });

    let sortedProducts = Object.keys(cataloge).sort((a,b) => a.localeCompare(b));
    sortedProducts.forEach(x => {
        if(currLetter !== x[0]){
            currLetter = x[0];
            console.log(currLetter);
        }
        if(currLetter === x[0]){
            console.log(`  ${x}: ${cataloge[x]}`);
        }
    })
}

solve(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']
);