function attachEvents() {
    let loadButton = document.getElementById('btnLoad'); // GET request
    let createButton = document.getElementById('btnCreate'); // POST request 
    let phonebookUL = document.getElementById('phonebook');

    loadButton.addEventListener('click', loadME);

    createButton.addEventListener('click', createME);


    function loadME() {
        let url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // doing this so when load button is clicked it will refresh all the data in the load section not 
                //appending the same info over and over
                [...phonebookUL.children].forEach(x => x.remove()); 
                let keys = Object.keys(data);
                [...keys].forEach(x => {
                    let liElement = document.createElement('li');
                    liElement.textContent = `${data[x].person}: ${data[x].phone}`;
                    let delButton = document.createElement('button');
                    delButton.innerText = 'Delete';

                    delButton.addEventListener('click', (e) => deleteMe(e, x));
                    liElement.appendChild(delButton);
                    phonebookUL.appendChild(liElement);
                });
            });

    }
    function createME() {
        let url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';
        let inputName = document.getElementById('person');
        let inputPhone = document.getElementById('phone');

        fetch(url, { method: 'POST', body: JSON.stringify({ person: inputName.value, phone: inputPhone.value }) });

        inputName.value = '';
        inputPhone.value = '';
    }

    function deleteMe(e, x) {
        let url = `https://phonebook-nakov.firebaseio.com/phonebook/${x}.json`;
        fetch(url, { method: 'DELETE' })
        e.currentTarget.parentElement.remove();
    };
}

attachEvents();