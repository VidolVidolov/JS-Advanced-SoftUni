function sum(arr) {
    let sum = 0;
    for (num of arr)
        sum += Number(num);
    return sum;
}
let retult = sum(['dasd', 2, 3]);
console.log(JSON.stringify(retult) == JSON.stringify(NaN));
module.exports = sum;