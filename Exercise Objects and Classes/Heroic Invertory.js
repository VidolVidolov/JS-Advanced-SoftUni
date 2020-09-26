function solve(input){

    let register = [];

    input.forEach(element => {
        let [name, level, item] = element.split(' / ');
        level = Number(level);
        let eqp = !item? [] : item.split(', ')
        let heroInfo = {
            name : name,
            level: level,
            items: eqp,
        }
        register.push(heroInfo);
    });

    console.log(JSON.stringify(register));
}

solve(['Isacc / 25',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara']
);