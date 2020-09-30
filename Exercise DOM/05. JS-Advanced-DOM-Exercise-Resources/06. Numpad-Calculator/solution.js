function solve() {

    let buttonElements = document.getElementsByTagName('button');
    buttonElements = Array.from(buttonElements);
    buttonElements.forEach(x => {
        x.addEventListener('click', () => {
            let currButton = x.value;
            let expOutputElement = document.getElementById('expressionOutput');
            let result = document.getElementById('resultOutput');

            switch (currButton) {
                case '/':
                case '*':
                case '+':
                case '-':
                    expOutputElement.innerHTML += ` ${currButton} `;
                    break;
                case '=':
                    result.innerHTML = generateCalculation(expOutputElement);
                    break;
                case 'Clear':
                    expOutputElement.innerHTML = '';
                    result.innerHTML = '';
                    break;
                default:
                    expOutputElement.innerHTML += `${currButton}`;
                    break;

            }
        })
    })


    function generateCalculation(string) {
        let [firstNum, operator, secondNum] = string.innerHTML.split(' ');
        let result = 0;
        if(secondNum === ''){
            return result = NaN;
        }
        firstNum = Number(firstNum);
        secondNum = Number(secondNum);
        switch (operator) {
            case '/':
                result = firstNum / secondNum;
                break;
            case '*':
                result = firstNum * secondNum;
                break;
            case '+':
                result = firstNum + secondNum;
                break;
            case '-':
                result = firstNum - secondNum;
                break;
            default:
                result = NaN;
                break;
        }
        return result;
    }
}