function solve() {
    let [checkSudomu, clearSudomu] = document.getElementsByTagName('button');
    let pseudoMatrix = [[], [], []];
    let table = document.querySelector('#exercise > table');
    let msg = document.querySelector('#check > p');

    checkSudomu.addEventListener('click', () => {
        let rows = document.querySelectorAll('tbody > tr');
        [...rows].forEach((row, index) => {
            let collection = row.children
            Array.from(collection).forEach((element, i) => {
                pseudoMatrix[index][i] = element.lastElementChild.value;
            });
        });

        let isCorrect = true;
        let currElRow = [];
        let currElCol = [];
        let outerCount = 0;

        pseudoMatrix.forEach(row => {
            row.forEach((elem, i) => {
                if (currElRow.includes(elem)) {
                    isCorrect = false;
                }
                currElRow.push(elem);
                if (currElCol.includes(pseudoMatrix[i][outerCount])) {
                    isCorrect = false;
                }
                currElCol.push(pseudoMatrix[i][outerCount]);
                
            });
            outerCount++;
            currElRow = [];
            currElCol = [];
        });

        if (isCorrect) {
            table.style.border = '2px solid green';
            msg.textContent = 'You solve it! Congratulations!';
            msg.style.color = 'green';
        } else {
            table.style.border = '2px solid red';
            msg.textContent = 'NOP! You are not done yet...';
            msg.style.color = 'red';

        }
    });

    clearSudomu.addEventListener('click', () => {
        let rows = document.querySelectorAll('input');
        [...rows].map(x => x.value = '');
        msg.textContent = '';
        msg.style.color = 'none';
        table.style.border = 'none';
    });
}