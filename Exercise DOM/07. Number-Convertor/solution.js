function solve() {
    let selectMenu = document.getElementById('selectMenuTo');
    let getSelectToBinary = document.querySelector('#selectMenuTo > option');
    getSelectToBinary.value = 'binary';
    getSelectToBinary.innerHTML = 'Binary';

    let getSelectToHex = getSelectToBinary.cloneNode();
    getSelectToHex.value = 'hexadecimal';
    getSelectToHex.innerHTML = 'Hexadecimal';
    selectMenu.appendChild(getSelectToHex);

    let button = document.getElementsByTagName('button')[0];

    button.addEventListener('click', () => {
        let input = document.getElementById('input');
        let inputData = Number(input.value);
        let result = 0;
        let currentWish = selectMenu.value;
        let resultToPrint = document.getElementById('result');
        if (currentWish === 'binary') {
            result = getBinary(inputData);
            resultToPrint.value = result;
        } else {
            result = getHex(inputData);
            resultToPrint.value = result.toUpperCase();
        }
    });

    function getBinary(input) {
        let bin = 0;
        let rem, i = 1;
        while (input != 0) {
            rem = input % 2;
            input = parseInt(input / 2);
            bin = bin + rem * i;
            i = i * 10;
        }
        return bin;
    }

    function getHex(input) {
        let hexStr = input.toString(16);
        return hexStr;
    }
}