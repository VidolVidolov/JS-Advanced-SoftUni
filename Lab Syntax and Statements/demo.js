function solve(string1, string2, string3){

    let sum = 0;
    let length = string1.length;
    let length2 = string2.length;
    let length3 = string3.length;

    sum = length + length2 + length3;
    let avg = Math.floor(sum / 3);
    console.log(sum);
    console.log(avg);

}
solve('chocolate', 'ice cream', 'cake');