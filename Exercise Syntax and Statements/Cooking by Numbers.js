function solve(input){

    let number = Number(input.shift());

    for (let iterator of input) {
        if(iterator === 'chop'){
            number /= 2;
        }else if(iterator === 'dice'){
            number = Math.sqrt(number);
        }else if(iterator === 'spice'){
            number++;
        }else if(iterator === 'bake'){
            number *= 3;
        }else if(iterator === 'fillet'){
            number *= 0.80;
        }
        console.log(number);
    }
}
solve(['9', 'dice', 'spice', 'chop', 'bake', 'fillet']);