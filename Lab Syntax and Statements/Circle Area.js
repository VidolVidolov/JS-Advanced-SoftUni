function solve(arg) {

    let check = typeof (arg);

    if (check == 'number') {
        let area = arg * arg * Math.PI;
        console.log(area.toFixed(2));
    } else {
        console.log(`We can not calculate the circle area, because we receive a ${typeof (arg)}.`);
    }
}

solve(5);