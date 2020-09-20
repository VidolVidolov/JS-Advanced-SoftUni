function solve(input) {

    let result = input.slice();
    let oneArr = [];

    for (let i = 0; i < result.length; i++) {
        oneArr = oneArr.concat(result[i]);
    }
    if (oneArr.length !== 0) {
        console.log(oneArr
            .map(Number)
            .reduce((acc, element) => {
                if (acc <= element) {
                    acc = element;
                }
                return acc;
            }, Number.MIN_SAFE_INTEGER))
    }
}
solve([])