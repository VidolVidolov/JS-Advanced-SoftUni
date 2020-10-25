function solve(array){

    let rotations = Number(array.pop());
    rotations = rotations % array.length;

    for (let i = 0; i < rotations; i++) {
        let last = array.pop();
        array.unshift(last);
    }
    console.log(array.join(' '));

}

solve(['Banana', 
'Orange', 
'Coconut', 
'Apple', 
'15']
);