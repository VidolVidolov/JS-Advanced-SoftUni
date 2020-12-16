const router = {
    '/all': document.querySelector('#all-section'),
    '/create': document.querySelector('#create-section'),
    '/profile': document.querySelector('#profile-section'),
    '/details': document.querySelector('#details-section'),
}

let url = 'https://all-books-softuni-252c0.firebaseio.com/furnitures.json';
let furnitureList = document.getElementById('furniture-list');


let domELements = {
    'errorBox': document.getElementById('errorBox'),
    'loadingBox': document.getElementById('loadingBox'),
    'infoBox': document.getElementById('infoBox'),
    'detailsButton': document.querySelector('.btn-info'),
}

document.querySelector('nav').addEventListener('click', onRouteChange)
furnitureList.addEventListener('click', onRouteChange);

let form = document.querySelector('#create-form');
form.addEventListener('submit', submitNewFurnichure);

router["/details"].addEventListener('click', deleteFurniture);

let notificationsAlert = (element) => {
    setInterval(() => {
        element.style.display = 'none';
    }, 500);
    element.style.display = 'block';
}

const routerFunc = (pathname) => {
    let [path, id] = pathname.split('/').filter(x => x);
    path = '/' + path;
    Object.values(router).forEach(element => element.style.display = 'none');

    router[path].style.display = 'block';

    switch (path) {
        case '/all':
            renderHomePage();
            break;
        case '/details':
            renderDetails(id)
            break;
    }
}

function deleteFurniture(e) {
    if(e.target.tagName != 'BUTTON'){
        return;
    }
    let id = e.target.getAttribute('id');
    fetch(`https://all-books-softuni-252c0.firebaseio.com/furnitures/${id}.json`, {method: 'DELETE'})
        .then(res => res.json())
        .then(data => {
            redirect('all');
        })
        .catch(err => notificationsAlert(domELements.errorBox));
}

function renderDetails(id) {
    fetch(`https://all-books-softuni-252c0.firebaseio.com/furnitures/${id}.json`)
        .then(res => res.json())
        .then(data => {
            let parentDiv = router['/details'];
            parentDiv.innerHTML = detailsTemplate(data, id);
        })
}

function redirect(path) {
    history.pushState({}, '', path);
    routerFunc(path);
}

function renderHomePage() {

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let loadedDom = Object.keys(data).map(x => furnitureItemTemplate(x, data[x])).join('');

            furnitureList.innerHTML = loadedDom;
        })
}

function submitNewFurnichure(e) {
    e.preventDefault();
    let [make, model, year, description, price, image, material] = form.getElementsByTagName('input');

    if (make.value.length < 4 || model.value.length < 4) {
        notificationsAlert(domELements.errorBox);
        return;
    }
    if (year.value < 1950 || year.value > 2050) {
        notificationsAlert(domELements.errorBox);
        return;

    }
    if (description.value.length < 10) {
        notificationsAlert(domELements.errorBox);
        return;

    }
    if (price.value < 0) {
        notificationsAlert(domELements.errorBox);
        return;

    }
    if (image.value == '') {
        notificationsAlert(domELements.errorBox);
        return;

    }

    let obj = JSON.stringify({
        make: make.value,
        model: model.value,
        year: year.value,
        description: description.value,
        price: price.value,
        image: image.value,
        material: material.value
    });

    fetch(url, { method: 'POST', body: obj })
        .then(res => {
            notificationsAlert(domELements.loadingBox);
            redirect('all');
        })
        .catch(error => notificationsAlert(domELements.errorBox));
}

function onRouteChange(e) {

    if (e.target.tagName != 'A') {
        return;
    }

    e.preventDefault();
    let url = new URL(e.target.href)
    redirect(url.pathname);
}

routerFunc(location.pathname);
