function solve(input) {

    let speed = input.shift();
    let area = input.shift();
    let difference = 0;

    switch (area) {
        case "motorway":
            difference = speed - 130;
            break;
        case 'interstate':
            difference = speed - 90;
            break;
        case 'city':
            difference = speed - 50;
            break;
        case 'residential':
            difference = speed - 20;
            break;
    }

    if (difference <= 20 && difference > 0) {
        console.log('speeding');
    } else if (difference <= 40 && difference > 0) {
        console.log('excessive speeding');
    } else if (difference > 40 && difference > 0) {
        console.log(`reckless driving`);
    }

}
solve([90, 'interstate']);