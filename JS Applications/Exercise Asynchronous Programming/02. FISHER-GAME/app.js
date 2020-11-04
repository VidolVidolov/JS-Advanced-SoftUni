function attachEvents() {
    let addButton = document.querySelector('.add');
    let loadButton = document.querySelector('.load');
    let divCatches = document.querySelector('#catches');

    let inputAngler = document.querySelector('#addForm > .angler');
    let inputWeight = document.querySelector('#addForm > .weight');
    let inputSpecies = document.querySelector('#addForm > .species');
    let inputLocation = document.querySelector('#addForm > .location');
    let inputBait = document.querySelector('#addForm > .bait');
    let inputCaptureTime = document.querySelector('#addForm > .captureTime');

    let baseURL = 'https://fisher-game.firebaseio.com/catches.json';

    addButton.addEventListener('click', addCatcher);
    loadButton.addEventListener('click', () => {
        fetch(baseURL)
            .then(response => response.json())
            .then(data => {
                let keys = Object.keys(data);
                [...keys].forEach(x => {
                    generateElements(data[x], x);
                });
            });
    })


    function addCatcher() {
        let object = {
            angler: inputAngler.value,
            weight: inputWeight.value,
            species: inputSpecies.value,
            location: inputLocation.value,
            bait: inputBait.value,
            captureTime: inputCaptureTime.value,
        };
        let data = JSON.stringify(object);
        fetch(baseURL, {
            method: 'POST',
            body: data,
        });
        inputAngler.value = '';
        inputWeight.value = '';
        inputSpecies.value = '';
        inputLocation.value = '';
        inputBait.value = '';
        inputCaptureTime.value = '';
    }

    function generateElements(info, id) {
        let divToInsert = document.createElement('div');
        divToInsert.setAttribute('class', 'catch');
        divToInsert.setAttribute('data-id', `${id}`);
        divToInsert.innerHTML = ` <label>Angler</label>
        <input type="text" class="angler" value="${info.angler}">
        <hr>
        <label>Weight</label>      
        <input type="number" class="weight" value="${info.weight}">
        <hr>
        <label>Species</label>
        <input type="text" class="species" value="${info.species}">
        <hr>
        <label>Location</label>
        <input type="text" class="location" value="${info.location}">
        <hr>
        <label>Bait</label>
        <input type="text" class="bait" value="${info.bait}">
        <hr>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${info.captureTime}">
        <hr>`;

        let updateButton = document.createElement('button');
        updateButton.setAttribute('class', 'update');
        updateButton.innerText = 'Update';

        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'delete');
        deleteButton.innerText = 'Delete';

        divToInsert.appendChild(updateButton);
        divToInsert.appendChild(deleteButton);
        divCatches.appendChild(divToInsert);

        deleteButton.addEventListener('click', (e) => deleteInfo(e, id));
        updateButton.addEventListener('click', (e) => updateInfo(e, id));
    }

    function updateInfo(e, id) {
        let object = {
            angler: e.target.parentElement.querySelector('.angler').value,
            weight: e.target.parentElement.querySelector('.weight').value,
            species: e.target.parentElement.querySelector('.species').value,
            location: e.target.parentElement.querySelector('.location').value,
            bait: e.target.parentElement.querySelector('.bait').value,
            captureTime: e.target.parentElement.querySelector('.captureTime').value,
        };
        let data = JSON.stringify(object);
        fetch(`https://fisher-game.firebaseio.com/catches/${id}.json`, {
            method: 'PUT',
            body: data,
        });
    }

    function deleteInfo(e, id) {
        fetch(`https://fisher-game.firebaseio.com/catches/${id}.json`, { method: 'DELETE' });
        e.target.parentElement.remove();
    }
}

attachEvents();

