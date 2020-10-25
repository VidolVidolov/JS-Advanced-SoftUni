function solve(input) {

    let words = {};
    let array = input.shift().split(/[^A-z]/g).filter(x => x !== '');
    let text = array.slice();
    array.forEach(element => {
        let occurance = 0;
        text.forEach(x => x === element? occurance++: x);
        words[element] = occurance;
    });
    console.log(JSON.stringify(words));
}

solve(['The man was walking the dog down the road when it suddenly started barking against the other dog. Surprised he pulled him away from it.']);