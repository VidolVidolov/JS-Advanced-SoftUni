function solve(input) {

    input = input;
    let step = Number(input.pop());
    let container = [];
    input.forEach((element,i) => {
        if(i % step === 0){
            container.push(element);
        }
    });
    console.log(container.join('\n'));
}
solve(['dsa',
'asd', 
'test', 
'tset', 
'2']

);