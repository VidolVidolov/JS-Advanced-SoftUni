function solve(parameter){

    if(parameter == undefined){
        for (let i = 0; i < 5; i++) {
          console.log(`* * * * * *`);
        }
    }else {
        for (let i = 0; i < parameter; i++) {
            console.log('* '.repeat(parameter));
        }
    }


}

solve();