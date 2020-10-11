function solve(){

    let argCounter = {};
    [...arguments].forEach(arg => {

        let typeOfArg = typeof arg;

        if(!argCounter[typeOfArg]){
            argCounter[typeOfArg] = 0;
        }
        console.log(`${typeOfArg}: ${arg}`);
        argCounter[typeOfArg]++;
    });

    let sort = Object.keys(argCounter).sort((a,b) => argCounter[b] - argCounter[a]);
    sort.forEach(x => {
        console.log(`${x} = ${argCounter[x]}`);
    })
}

solve(42, 'cat', 15, 'kitten', 'tomcat');
