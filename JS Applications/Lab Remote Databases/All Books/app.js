let buttonElement = document.getElementById('clicker');
let insertButton = document.getElementById('insert');
let changeButton = document.getElementById('change');
let changeAuthorButton = document.getElementById('changer');
let buttonGetID = document.getElementById('allID');
function toShow() {
    let textArea = document.getElementById('info');
    let inputData = document.getElementById('enter');
    let url = `https://all-books-softuni-252c0.firebaseio.com/Books/${inputData.value}.json`;
    textArea.style.display = 'block';
    fetch(url)
        .then(response => response.json())
        .then(data => textArea.textContent = `${data.author}: ${data.title}`);
}
function addToDatabase() {
    let author = document.getElementById('author');
    let title = document.getElementById('title');

    let url = 'https://all-books-softuni-252c0.firebaseio.com/Books/.json';
    let obj = {
        author: author.value,
        title: title.value,
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(obj),
    });

    author.value = '';
    title.value = '';
}

function changeTheInfo() {
    let id = document.getElementById('identification');
    let title = document.getElementById('titleTochage');
    let author = document.getElementById('authorChange');

    let url = `https://all-books-softuni-252c0.firebaseio.com/Books/${id.value}.json`;
    let obj = {
        author: author.value,
        title: title.value,
    };
    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(obj),
    });
    author.value = '';
    id.value = '';
    title.value = '';
}

function changeAuthor() {
    let id = document.getElementById('idToPass');
    let author = document.getElementById('authorToChange');
    let url = `https://all-books-softuni-252c0.firebaseio.com/Books/${id.value}.json`;

    let obj = {
        author: author.value,
    };
    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(obj),
    });
    author.value = '';
    id.value = '';
}

function getIDs() {
    let url = 'https://all-books-softuni-252c0.firebaseio.com/Books.json';
    let textArea = document.getElementById('id');

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let str = ''
            Object.keys(data).forEach(x => str += `${x}\n`);
            textArea.textContent = str;
        })
        .catch(err => console.log(err));

}
buttonElement.addEventListener('click', toShow);
insertButton.addEventListener('click', addToDatabase);
changeButton.addEventListener('click', changeTheInfo);
changeAuthorButton.addEventListener('click', changeAuthor);
buttonGetID.addEventListener('click', getIDs);