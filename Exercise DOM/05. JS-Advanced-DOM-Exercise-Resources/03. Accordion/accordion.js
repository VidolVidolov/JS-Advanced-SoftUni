function toggle() {
    let buttonElement = document.getElementsByClassName('button');
    let paragrpahElement = document.querySelector('#extra');
    if (buttonElement[0].innerHTML === 'More') {
        paragrpahElement.style.display = 'block';
        buttonElement[0].innerHTML = 'Less';
    } else {
        paragrpahElement.style.display = 'none';
        buttonElement[0].innerHTML = 'More';
    }
}