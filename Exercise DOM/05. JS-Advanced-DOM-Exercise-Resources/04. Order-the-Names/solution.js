function solve() {

    let buttonElement = document.getElementsByTagName('button')[0];
    let arrayOfLists = document.getElementsByTagName('li');
    let alphabetIndex = generateAlpabet();
    buttonElement.addEventListener('click', () => {
        let currName = document.getElementsByTagName('input')[0];
        let nameOfPerson = currName.value;
        nameOfPerson = nameOfPerson[0].toUpperCase() + nameOfPerson.slice(1).toLowerCase();
        let startingLetter = nameOfPerson[0].toUpperCase();
        if (alphabetIndex[startingLetter] !== undefined) {
            let index = alphabetIndex[startingLetter];
            if (arrayOfLists[index].innerHTML !== '') {
                arrayOfLists[index].innerHTML += `, ${nameOfPerson}`;
            } else {
                arrayOfLists[index].innerHTML = nameOfPerson;
            }
        }
        currName.value = '';
    })
    function generateAlpabet() {
        let obj = {};
        let counter = 0;
        for (let i = 65; i <= 90; i++) {
            let symbol = String.fromCharCode(i);
            obj[symbol] = counter;
            counter++;
        }
        return obj;
    }
}