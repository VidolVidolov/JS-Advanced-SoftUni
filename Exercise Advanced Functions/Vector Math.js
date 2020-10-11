(function solve() {

    return vectorMathObj = {
        add: ([xa, ya], [xb, yb]) => [xa + xb, ya + yb],
        multiply: (arr, multi) => arr = arr.map(x => x * multi),
        length: (vec1) => Math.sqrt((vec1[0] * vec1[0]) + (vec1[1] * vec1[1])),
        dot: ([xa, ya], [xb, yb]) => (xa * xb) + (yb * ya),
        cross: ([xa, xb], [ya, yb]) => (xa * yb) - (xb * ya),
    }
})();

let solution = solve();
// console.log(solution.add([5.43, -1], [1, 31]));
// console.log(solution.multiply([3.5, -2], 2))
// console.log(solution.length([3, -4]))
console.log(solution.dot([2, 3], [2, -1]))
// console.log(solution.cross([3, 7], [1, 0]))
