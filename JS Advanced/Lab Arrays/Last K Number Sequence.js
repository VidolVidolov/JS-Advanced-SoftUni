function solve(number, number2) {

    // let sequence = [1];
    // let lenghtSequence = number;
    // let previousElements = number2;

    // for (let i = 0; i < lenghtSequence - 1; i++) {
    //     let element = sequence[i];
    //     if (sequence.length < 2) {
    //         sequence.push(element);
    //     } else {
    //         let newElement = 0;
    //         if (sequence.length >= previousElements) {
    //             for (let i = 0; i < previousElements; i++) {
    //                 newElement += sequence[sequence.length - 1 - i];
    //             }
    //         } else {
    //             for (let i = 0; i < sequence.length; i++) {
    //                 newElement += sequence[sequence.length - 1 - i];
    //             }
    //         }

    //         sequence.push(newElement);
    //     }

    // }
    // console.log(sequence.join(' '));

    // better solution

    let initialArr = [1];
    let n = number;
    let k = number2;

    for (let i = 1; i < n; i++) {
        let currentKElements = initialArr.slice(-k);
        let sum = currentKElements.reduce((acc, element) => acc + element, 0);
        initialArr.push(sum);
    }
    console.log(initialArr.join(' '));
}
solve(6, 3);