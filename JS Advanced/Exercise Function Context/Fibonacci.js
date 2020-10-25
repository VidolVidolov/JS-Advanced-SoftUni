function getFibonator() {
    let currentValue = 0;
    let lastValue = 1;
    let sum = 0;
    function gibonacci() {
        sum = currentValue + lastValue;
        currentValue = lastValue;
        lastValue = sum;
        return currentValue;
    }
    return gibonacci;
}



let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13
