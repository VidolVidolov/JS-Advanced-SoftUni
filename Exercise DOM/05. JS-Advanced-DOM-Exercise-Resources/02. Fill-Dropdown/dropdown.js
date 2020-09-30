function addItem() {
    let inputText = document.getElementById('newItemText')
    let text = inputText.value;
    let inputValue = document.getElementById('newItemValue');
    let valueText = inputValue.value;
    let menu = document.getElementById('menu');

    let option = document.createElement('option');
    option.innerHTML = text;
    option.value += valueText;
    menu.appendChild(option);
    inputText.value = '';
    inputValue.value = '';
}