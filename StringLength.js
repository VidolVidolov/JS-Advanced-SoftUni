function solve(arg1, arg2, arg3){

    let sum = 0;
    let avarage = 0;

    sum = arg1.length + arg2.length + arg3.length;
    avarage = sum / 3;
    console.log(sum);
    console.log(Math.floor(avarage));
}

solve('chocolate', 'ice cream', 'cake');