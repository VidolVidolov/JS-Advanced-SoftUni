function solve(input) {

    let company = {};

    input.forEach(x => {
        let [brand, model, numCars] = x.split(' | ');
        numCars = Number(numCars);

        if (!company[brand]) {
            company[brand] = {};
            company[brand][model] = numCars;
        } else {
            if (company[brand][model]) {
                company[brand][model] += numCars;
            } else {
                company[brand][model] = numCars;
            }
        }
    });

    Object.keys(company).forEach(brand => {
        console.log(brand);
        Object.keys(company[brand]).forEach(model => {
            console.log(`###${model} -> ${company[brand][model]}`)
        })
    })
}

solve(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']
);