function solve() {
    let first, second, result;

    return {
        init: (selector1, selector2, resultSelector) => {
            first = document.querySelector(selector1);
            second = document.querySelector(selector2);
            result = document.querySelector(resultSelector);
        },
        add: () => result.value = Number(second.value) + Number(first.value),
        subtract: () => result.value = Number(first.value) - Number(second.value),
    }
}

let obj = solve();
obj.init("#num1", "#num2", '#result');
let num1 = ('#num1');
let num2 = ('#num2');
let res = ('#result');
num1.value = 5;
num2.value = 3;
obj.add();