function subtract() {
    let number1 = document.getElementById('firstNumber').value;
    let number2 = document.getElementById('secondNumber').value;
    let result = Number(number1) - Number(number2);
    let resultDiv = document.querySelector('#result');
    resultDiv.innerHTML = result;
}