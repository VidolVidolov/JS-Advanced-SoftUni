function solve(array){

    let counter = 1;
    let result= [];
    array.forEach(element => {
        if(element === 'add'){
            result.push(counter);
        }else{
            result.pop();
        }
        counter++;
    });

    if(result.length == 0){
        console.log('Empty');
    }else {
        console.log(result.join('\n'));
    }

}

solve(['add', 
'add', 
'remove', 
'add', 
'add']

);