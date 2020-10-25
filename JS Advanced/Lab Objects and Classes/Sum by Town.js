function solve(input) {

    let obj = {};

    input.forEach((element, index) => {
        if (index % 2 == 0) {
            if (!obj[element]) {
                obj[element] = 0;
            }
        } else {
            obj[input[index - 1]] += Number(element);
        }
    });

    console.log(JSON.stringify(obj));
}

solve(['Sofia', '20', 'Varna', '3', 'Sofia', '5', 'Varna', '4']);