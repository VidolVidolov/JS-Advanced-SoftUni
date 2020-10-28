function solve(array, startIndex, endIndex) {

    let sum = 0;
    let check = Array.isArray(array);
    if (!check) {
        return NaN;
    }
    let check1 = array.filter(x => {
        let c = typeof x;
        if (c !== 'number') {
            return x;
        }

    });

    if (check1.length > 0) {
        return NaN;
    }

    array.map(Number);
    startIndex < 0 ? startIndex = 0 : startIndex;
    endIndex > array.length - 1 ? endIndex = array.length - 1 : endIndex;
    sum = array.slice(startIndex, endIndex + 1).reduce((acc, x) => acc += x, 0);
    return sum;
}

console.log(solve([10, 20, 30, 40, 50, 60], 3, 300));
console.log(solve([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1));
console.log(solve([10, 'twenty', 30, 40], 0, 2));
console.log(solve([], 1, 2));
console.log(solve('text', 0, 2));