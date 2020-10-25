function solution() {

    let string = '';

    return {
        append: (str) => string += str,
        print: () => console.log(string),
        removeStart: (x) => string = string.substring(x),
        removeEnd: (x) => string = string.substring(0,(string.length - x)),
    }
}


let secondZeroTest = solution();

secondZeroTest.append('123');
secondZeroTest.append('45');
secondZeroTest.removeStart(2);
secondZeroTest.removeEnd(1);
secondZeroTest.print();


