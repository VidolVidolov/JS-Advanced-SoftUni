function solve() {
    let trainingModulesDiv = document.querySelector('.modules');
    let [inputName, inputDate] = document.querySelectorAll('.form-control > input');
    let moduleInput = document.querySelector('.form-control > select');
    let addButton = document.querySelector('.form-control > button');
    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (inputName.value == '' || inputDate.value == '' || moduleInput.value == 'Select module') {
            return;
        }

        let formatDate = inputDate.value;

        while (formatDate.includes('-')) {
            formatDate = formatDate.replace('-', '/');
        }
        while (formatDate.includes('T')) {
            formatDate = formatDate.replace('T', ' - ');
        }

        let check = Array.from(document.querySelectorAll('.module > h3'));
        let wanted = check.find(x => x.textContent == `${moduleInput.value.toUpperCase()}-MODULE`);
        if (check.length > 0 && wanted !== undefined) {
            let listElement = document.createElement('li');
            listElement.setAttribute('class', 'flex');
            let headingFour = document.createElement('h4');
            headingFour.textContent = `${inputName.value} - ${formatDate}`;
            let buttonDel = document.createElement('button');
            buttonDel.setAttribute('class', 'red');
            buttonDel.innerText = 'Del';

            listElement.appendChild(headingFour);
            listElement.appendChild(buttonDel);

            let ulEl = wanted.nextElementSibling;
            ulEl.appendChild(listElement);
            //sort the result!!!!

            let sorting = Array.from(ulEl.children);
            sorting = sorting.sort((a, b) => {
                let A = a.textContent.split('-')[1].trim();
                let B = b.textContent.split('-')[1].trim();
                return A.localeCompare(B);

            });
            
            sorting.forEach(x => ulEl.appendChild(x));

            buttonDel.addEventListener('click', (e) => {
                if (ulEl.children.length - 1 == 0) {
                    ulEl.parentElement.remove();
                } else {
                    listElement.remove();
                }
            });

        } else {
            let divElement = document.createElement('div');
            divElement.setAttribute('class', 'module');
            let heading = document.createElement('h3');
            heading.textContent = `${moduleInput.value.toUpperCase()}-MODULE`; // might need toUpperCase


            let ulElement = document.createElement('ul');
            let listElement = document.createElement('li');
            listElement.setAttribute('class', 'flex');
            let headingFour = document.createElement('h4');
            headingFour.textContent = `${inputName.value} - ${formatDate}`;
            let buttonDel = document.createElement('button');
            buttonDel.setAttribute('class', 'red');
            buttonDel.innerText = 'Del';

            listElement.appendChild(headingFour);
            listElement.appendChild(buttonDel);

            ulElement.appendChild(listElement)

            divElement.appendChild(heading);
            divElement.appendChild(ulElement);

            trainingModulesDiv.appendChild(divElement);

            buttonDel.addEventListener('click', (e) => {
                if (ulElement.children.length - 1 == 0) {
                    ulElement.parentElement.remove();
                } else {
                    listElement.remove();
                }
            });
        }
    })



    // let elements = {
    //     form: document.getElementsByTagName('form')[0],
    //     name: document.querySelector('input[name="lecture-name"]'),
    //     date: document.querySelector('input[name="lecture-date"]'),
    //     module: document.querySelector('select[name="lecture-module"]'),
    //     addBtn: document.querySelector('form button'),
    //     modulesDiv: document.querySelector('.modules'),
    //     moduleList: () => Array.from(document.querySelectorAll('.module')),
    //     listItems: () => Array.from(document.querySelectorAll('.flex')),
    // }

    // elements.name.value = "DOM";
    // elements.date.value = "2020-09-28T18:00";
    // elements.module.value = "Advanced";

    // elements.addBtn.click();

    // console.log(elements.moduleList()[0].children[0].textContent ==  'ADVANCED-MODULE');

    // elements.name.value = "Arrays";
    // elements.date.value = "2020-09-17T18:00";
    // elements.module.value = "Advanced";

    // elements.addBtn.click();
    // console.log(elements.moduleList().length ==  1);
    // console.log(elements.listItems()[0].children[0].textContent == 'Arrays - 2020/09/17 - 18:00');

    // elements.name.value = "Arrays";
    // elements.date.value = "2020-09-30T18:30";
    // elements.module.value = "Fundamentals";

    // elements.addBtn.click();

    // console.log(elements.listItems()[0].children[1].className == 'red');
}



