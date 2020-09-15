function solve(num, num2, operator) {

    let result = 0;

    if (operator == '+') {
        result = num + num2;
    } else if (operator == '-') {
        result = num - num2;
    } else if (operator == '*') {
        result = num * num2;
    } else if (operator == '/') {
        result = num / num2;
    } else if (operator == '%') {
        result = num % num2;
    } else if (operator == '**') {
        result = num ** num2;
    }

    console.log(result);
}

solve(3, 5.5, '**');