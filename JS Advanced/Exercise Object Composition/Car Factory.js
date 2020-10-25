function solve(input) {

    let { model, power, color, carriage, wheelsize } = input;
    let powerAvailable = [{ power: 90, volume: 1800 }, { power: 120, volume: 2400 }, { power: 200, volume: 3500 }];
    wheelsize % 2 == 0? wheelsize-- : wheelsize;

    let carAvailable = {
        model,
        engine: powerAvailable.find(x => x.power >= power),
        carriage: {
            color,
            type: carriage,
        },
        wheels: [wheelsize, wheelsize, wheelsize, wheelsize],
    }
   return carAvailable;
}

solve({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}
);