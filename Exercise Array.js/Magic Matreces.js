function solve(array) {

    let sumOfRows = 0;;

    array.forEach((row, index) => {
        let isEqual = true;
        if(array[index + 1]){
            if (row.reduce((acc, el) => acc + el) == array[index + 1].reduce((acc, el) => acc + el)) {
                sumOfRows = row.reduce((acc, el) => acc + el);
            } else {
                isEqual = false;
            }
        }
    });

    let counter = 0;
    let sumOfColumns = 0;
    let currSum = 0;
    let fistCHeck = false;

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            sumOfColumns += array[j][counter];
        }
        if(currSum !== sumOfColumns && !fistCHeck){
            currSum = sumOfColumns;
            fistCHeck = true;
        }else{
            fistCHeck = false;
            break;
        }
        sumOfColumns = 0;
        counter++;
    }

    if(sumOfColumns === sumOfRows){
        console.log(true);
    }else {
        console.log(false);
    }
}

solve([[11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]]
   
);