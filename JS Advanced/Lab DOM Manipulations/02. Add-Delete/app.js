function addItem() {
    let unorderedListElement = document.getElementById('items');
    let info = document.getElementById('newText');
    let spanElement = document.createElement('a');
    spanElement.setAttribute('href','#');
    spanElement.innerHTML = '[Delete]';
    spanElement.addEventListener('click', () => {
        spanElement.parentElement.remove();
    })
    let newList = document.createElement('li');
    newList.innerText = info.value;
    newList.appendChild(spanElement);
    unorderedListElement.appendChild(newList);
    info.value = '';
}