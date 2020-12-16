let domElements = {
    ipnutTitle: () => document.getElementById('title'),
    inputAuthor: () => document.getElementById('author'),
    inputISBN: () => document.getElementById('isbn'),
    submitButton: () => document.querySelector('#addBook > button'),
    loadAllBooksButton: () => document.querySelector('#loadBooks'),
    tbody: () => document.querySelector('tbody'),
    editForm: () => document.querySelector('#editBook'),
    addFrom: () => document.querySelector('#addBook'),
    editInputTitle: () => document.querySelector('#editBook #edit-title'),
    editInputAuthor: () => document.querySelector('#editBook #edit-author'),
    editInputIsbn: () => document.querySelector('#editBook #edit-isbn'),
    editButtonInForm: () => document.querySelector('#editBook button'),
    tagsButton: () => document.querySelector('#edit-tags'),
    tags1: () => document.querySelector('#tag1'),
    txtArea: () => document.querySelector('#txtArea'),
    tagsButtonInForm: () => document.querySelector('#edit-tags #one'),
    deleteTags: () => document.querySelector('#edit-tags #two'),
    closeTagSection: () => document.querySelector('#edit-tags #close'),
    deleteTag: () => document.querySelector('#deleteTag'),
}

domElements.submitButton().addEventListener('click', (e) => addBook(e));
domElements.loadAllBooksButton().addEventListener('click', (e) => loadAllBooks(e));
// for buttons when adding and removing tags
domElements.tagsButtonInForm().addEventListener('click', (e) => handlerForAddingTags(e));
domElements.deleteTags().addEventListener('click', (e) => deleteTags(e));
domElements.closeTagSection().addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('edit-tags').style.display = 'none';
    document.getElementById('editBook').style.display = 'none';
    document.getElementById('addBook').style.display = 'block';
})
domElements.deleteTag().addEventListener('click', (e) => deleteCertainTag(e));
// it end here for listeners
let currentId = '';

// this is again for tags u can remvove it to test the original task
function deleteCertainTag(e) {
    e.preventDefault();
    let url = `https://books-exercise-d4c80.firebaseio.com/Books/${currentId}.json`;
    let inputTag = domElements.tags1();
    setTimeout(function () {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if(inputTag.value != '' && data.tags.includes(inputTag.value)){
                    let index = data.tags.indexOf(inputTag.value);
                    data.tags.splice(index, 1);
                    domElements.txtArea().textContent = `${data.tags.join('|')}`;
                    fetch(url, {method: 'PATCH', body: JSON.stringify({tags: data.tags})});
                    inputTag.value = '';
                }else {
                    window.alert('There is not such Tag');
                }
            })
            .catch(err => window.alert(err.message));
    }, 1000)

}

function handlerForAddingTags(e) {
    e.preventDefault();
    let url = `https://books-exercise-d4c80.firebaseio.com/Books/${currentId}.json`;

    let newTags = domElements.tags1();
    if (domElements.txtArea.textContent != '') {
        domElements.txtArea.textContent = '';
    }
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (newTags.value != '') {
                data.tags.push(newTags.value)
            }
            let obj = JSON.stringify({
                tags: data.tags,
            });
            domElements.txtArea().textContent = data.tags.join('|');
            domElements.txtArea().textContent += '|';
            fetch(url, { method: 'PATCH', body: obj });
            newTags.value = '';
        })

}

function tagsHandler() {
    let id = this.getAttribute('id');
    currentId = id;
    let url = `https://books-exercise-d4c80.firebaseio.com/Books/${id}.json`;
    let currForm = domElements.tagsButton();
    currForm.style.display = 'block';
    domElements.addFrom().style.display = 'none';
    domElements.editForm().style.display = 'none';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let tags = data.tags;
            domElements.txtArea().textContent = tags.join('|');
            if (domElements.txtArea.textContent !== 'Tags: ') {
                domElements.txtArea().textContent += '|';
            }
        })
}

function deleteTags(e) {
    e.preventDefault();
    let url = `https://books-exercise-d4c80.firebaseio.com/Books/${currentId}.json`;
    setTimeout(function () {
        fetch(url, { method: 'PATCH', body: JSON.stringify({ tags: ['Tags:'] }) })
            .then(data => domElements.txtArea().textContent = '')
            .catch(err => window.alert(err.message));
    }, 1000)

}
// the functions with the tags end here

function loadAllBooks(e) {
    let url = 'https://books-exercise-d4c80.firebaseio.com/Books.json';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (domElements.tbody.innerHTML != '') {
                domElements.tbody().innerHTML = '';
            }
            let keys = Object.keys(data);
            keys.forEach(element => {
                let currElement = createDomElements('tr', '', {}, {},
                    createDomElements('td', data[element].title, {}, {}, []),
                    createDomElements('td', data[element].author, {}, {}, []),
                    createDomElements('td', data[element].isbn, {}, {}, []),
                    createDomElements('td', '', {}, {},
                        createDomElements('button', 'Edit', { id: element }, { 'click': editHandler }, []),
                        createDomElements('button', 'Delete', { id: element }, { 'click': deleteHandler }, [])),
                    createDomElements('td', '[View tags]', { id: element, class: 'tag' }, { 'click': tagsHandler }, []));
                domElements.tbody().appendChild(currElement);
            })
        })
        .catch(err => window.alert(err.message));
}

function editHandler() {
    let id = this.getAttribute('id');
    let url = `https://books-exercise-d4c80.firebaseio.com/Books/${id}.json`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let editForm = domElements.editForm();
            editForm.style.display = 'block';
            domElements.addFrom().style.display = 'none';
            document.getElementById('edit-tags').style.display = 'none';

            let title = domElements.editInputTitle();
            let author = domElements.editInputAuthor();
            let isbn = domElements.editInputIsbn();
            let button = domElements.editButtonInForm();

            title.value = data.title;
            author.value = data.author;
            isbn.value = data.isbn;

            button.addEventListener('click', (e) => {
                e.preventDefault();
                let editUrl = `https://books-exercise-d4c80.firebaseio.com/Books/${id}.json`;
                fetch(editUrl, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        author: author.value,
                        title: title.value,
                        isbn: isbn.value,
                    })
                })
                    .then(res => {
                        window.alert('Successfully edited the info!');
                        domElements.editForm().style.display = 'none';
                        domElements.addFrom().style.display = 'block';
                        loadAllBooks();
                    })
                    .catch(err => window.alert(err.message));
            })
        })
        .catch(err => console.log(err.message));
}

function deleteHandler() {
    let id = this.getAttribute('id');
    let deleteUrl = `https://books-exercise-d4c80.firebaseio.com/Books/${id}.json`;

    let r = confirm("You will delete the book. Are you sure?");
    if (r == true) {
        fetch(deleteUrl, { method: 'DELETE' })
            .then(res => loadAllBooks())
            .catch(err => window.alert(err.message));
    }

}
function addBook(e) {
    e.preventDefault();
    let title = domElements.ipnutTitle();
    let author = domElements.inputAuthor();
    let isbn = domElements.inputISBN();
    let url = 'https://books-exercise-d4c80.firebaseio.com/Books.json';

    if (title.value != '' && author.value != '' & isbn.value != '') {
        let obj = JSON.stringify({
            tags: ['Tags: '],
            author: author.value,
            title: title.value,
            isbn: isbn.value,
        });
        title.value = '';
        author.value = '';
        isbn.value = '';
        fetch(url, { method: 'POST', body: obj })
            .then(data => {
                window.alert('successfully created new Book! Click again LOAD ALL BOOKS button to see the added Book!');
            })
            .catch(err => window.alert(err.message));
    }
}

function createDomElements(type, text, attributes, events, ...children) {

    const domElement = document.createElement(type);

    if (text != '') {
        domElement.textContent = text;
    }

    Object.entries(attributes)
        .forEach(([key, value]) => domElement.setAttribute(key, value));
    Object.entries(events)
        .forEach(([event, handler]) => domElement.addEventListener(event, handler));
    domElement.append(...children);

    return domElement;
}