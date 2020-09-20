function solve(array){

    let sorted = array.sort((a,b) => a.length - b.length || a.localeCompare(b));
    console.log(sorted.join('\n'));

}

solve(['alpha', 
'beta', 
'gamma']
)