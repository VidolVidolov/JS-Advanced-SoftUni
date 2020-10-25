function solve() {
    let [nameInput, hallInput, priceinput] = Array.from(document.querySelectorAll('#container input'));
    let addButton = document.querySelector('#container button');
    let sectionMoviesUl = document.querySelector('#movies > ul');
    let sectionArchive = document.querySelector('#archive > ul');
    let clearButton = document.querySelector('#archive > button');

    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (nameInput.value == '' || hallInput.value == '' || priceinput.value == '') {
            return;
        }

        if (!Number(priceinput.value)) {
            return;
        }

        let listItem = document.createElement('li'); // list item to manipulate and move around
        let spanElement = document.createElement('span');
        spanElement.textContent = nameInput.value;
        let strongElement = document.createElement('strong');
        strongElement.textContent = `Hall: ${hallInput.value}`;



        let divElement = document.createElement('div'); // div which have price, inputField and button
        let strongInDiv = document.createElement('strong');
        strongInDiv.textContent = `${Number(priceinput.value).toFixed(2)}`;
        let inputFieldInDiv = document.createElement('input');
        inputFieldInDiv.setAttribute('placeholder', 'Tickes sold');
        let buttonInDiv = document.createElement('button');
        buttonInDiv.textContent = 'Archive';

        divElement.appendChild(strongInDiv);
        divElement.appendChild(inputFieldInDiv);
        divElement.appendChild(buttonInDiv);

        listItem.appendChild(spanElement);
        listItem.appendChild(strongElement);
        listItem.appendChild(divElement);
        sectionMoviesUl.appendChild(listItem);

        buttonInDiv.addEventListener('click', (e) => {

            if (!Number(inputFieldInDiv.value) || inputFieldInDiv.value == '') {
                return;
            }

            let numberOfClients = Number(inputFieldInDiv.value);
            let profit = numberOfClients * Number(strongInDiv.textContent);
            let strong = document.createElement('strong');
            strong.textContent = `Total amount: ${profit.toFixed(2)}`;
            let deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';

            strongElement.remove();
            divElement.remove();

            listItem.appendChild(strong);
            listItem.appendChild(deleteButton);

            sectionArchive.appendChild(listItem);

            deleteButton.addEventListener('click', (e) => {
                listItem.remove();
            });

        })
        clearButton.addEventListener('click' , (e) => {
            let all = document.querySelector('#archive > ul').children;
            Array.from(all).forEach(x => x.remove());
        });
        nameInput.value = '';
        hallInput.value = '';
        priceinput.value = '';
    })






    // const form = document.getElementById('container');
    // let [name, hall, price, addBtn] = Array.from(form.children);

    // name.value = 'Avengers: Endgame';
    // hall.value = 'Main';
    // price.value = '12.00';

    // addBtn.click();

    // let newLiItem = Array.from(document.querySelector("#movies > ul").children)[0];
    // let insideLiElements = Array.from(newLiItem.children); // [span, strong, div]
    // let [liName, liHall, liDiv] = insideLiElements;
    // let [liPrice, liCount, btnArh] = Array.from(liDiv.children); // [strong, input, btn]
    // liCount.value = 2;

    // btnArh.click();

    // let newArchiveLi = Array.from((document.querySelector("#archive > ul > li").children)); // [span, strong, button]
    // let [archSpan, archStrong, archBtn] = newArchiveLi;

    // console.log(sectionMoviesUl.children.length == 0);
    // console.log(archSpan.tagName == "SPAN");
    // console.log(archStrong.tagName == "STRONG");
    // console.log(archBtn.tagName == "BUTTON");

    // console.log(archSpan.textContent == "Avengers: Endgame");
    // console.log(archStrong.textContent == "Total amount: 24.00");
    // console.log(archBtn.textContent == "Delete");
}

// Archive movie;

