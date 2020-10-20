function solve() {
    let addButton = document.querySelector('#container button');
    let [nameInput, ageInput, kindInput, currOwnerInput] = Array.from(document.querySelectorAll('#container input'));
    let adoptionSection = document.querySelector('#adoption ul');
    let adoptedSection = document.querySelector('#adopted ul');
    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (nameInput.value.length == 0 || ageInput.value.length == 0 || kindInput.value.length == 0 || currOwnerInput.value.length == 0) {
            return;
        }

        if (!Number(ageInput.value)) {
            return;
        }

        let listElement = document.createElement('li'); // list for the whole info about pet
        let paragraphElement = document.createElement('p');
        paragraphElement.innerHTML = `<strong>${nameInput.value}</strong> is a <strong>${ageInput.value}</strong> year old <strong>${kindInput.value}</strong>`;

        let spanEl = document.createElement('span');
        spanEl.textContent = `Owner: ${currOwnerInput.value}`;

        let buttonElement = document.createElement('button'); // button for contact owner
        buttonElement.textContent = 'Contact with owner';

        listElement.appendChild(paragraphElement);
        listElement.appendChild(spanEl);
        listElement.appendChild(buttonElement);
        adoptionSection.appendChild(listElement);

        buttonElement.addEventListener('click', (e) => {
            let divForContact = document.createElement('div'); // div for changing the contact owner button
            let inputElement = document.createElement('input');
            inputElement.setAttribute('placeholder', 'Enter your names');
            let takeItButton = document.createElement('button'); // button for take it
            takeItButton.textContent = 'Yes! I take it!';
            divForContact.appendChild(inputElement);
            divForContact.appendChild(takeItButton);

            buttonElement.remove();
            listElement.appendChild(divForContact);

            takeItButton.addEventListener('click', (e) => {
                if (inputElement.value == '') {
                    return;
                }
                let spanElement = document.createElement('span');
                spanElement.textContent = `New Owner: ${inputElement.value}`;
                paragraphElement.nextElementSibling.remove();
                
                let buttonForChecked = document.createElement('button');
                buttonForChecked.textContent = `Checked`;

                divForContact.remove();
                listElement.appendChild(spanElement);
                listElement.appendChild(buttonForChecked);
                adoptedSection.appendChild(listElement);


                buttonForChecked.addEventListener('click', (e) => {
                    listElement.remove();
                })
            })

        })


        nameInput.value = '';
        ageInput.value = '';
        kindInput.value = '';
        currOwnerInput.value = '';
    })
}

