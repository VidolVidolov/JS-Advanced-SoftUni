function solve(type, weight, price){

    let kilograms = weight / 1000;
    let money  = kilograms * price;
    console.log(`I need $${money.toFixed(2)} to buy ${kilograms.toFixed(2)} kilograms ${type}.`);

}
solve('orange', 2500, 1.80);