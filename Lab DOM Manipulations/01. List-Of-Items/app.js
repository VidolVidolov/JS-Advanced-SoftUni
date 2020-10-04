function addItem() {
    let unorderedListElement = document.getElementById('items');
    let info = document.getElementById('newItemText');

    let newList = document.createElement('li');
    newList.innerHTML = info.value;
    unorderedListElement.appendChild(newList);
    info.value = '';
}