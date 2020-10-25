function lowestPricesInCities(input) {

    let towns = {};

    input.forEach(element => {
        let [town, product, price] = element.split(' | ');
        price = Number(price);
        if (!towns[product]) {
            towns[product] = {};
            towns[product][town] = price
        } else {
            if (towns[product].town) {
                towns[product].town = price;
            } else {
                towns[product][town] = price;
            }
        }
    });

    let products = Object.keys(towns);

    for (let product of products) {
        let prices = Object.values(towns[product]);
        let lowestPrice = Math.min(...prices);
        let lowestTown = Object.keys(towns[product]).filter(x => towns[product][x] == lowestPrice);
        console.log(`${product} -> ${lowestPrice} (${lowestTown[0]})`);
    }
}

lowestPricesInCities(['Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10']
);