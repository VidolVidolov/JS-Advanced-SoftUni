function solution() {
    let [addGiftsSection, listOfGiftsSection, sentGiftsSection, discardedGiftsSection] = Array.from(document.querySelectorAll('section'));
    let addButton = addGiftsSection.querySelector('button');
    let inputName = addGiftsSection.querySelector('input');
    let listUl = listOfGiftsSection.querySelector('ul');
    let senttUl = sentGiftsSection.querySelector('ul');
    let discardedUl = discardedGiftsSection.querySelector('ul');



    addButton.addEventListener('click', (e) => {

        let listElement = document.createElement('li');
        listElement.setAttribute('class', 'gift');
        listElement.textContent = inputName.value;
        let sendButton = document.createElement('button');
        sendButton.setAttribute('id', 'sendButton');
        sendButton.innerText = 'Send';
        let discardButton = document.createElement('button');
        discardButton.setAttribute('id', 'discardButton');
        discardButton.innerText = 'Discard';

        listElement.appendChild(sendButton);
        listElement.appendChild(discardButton);

        listUl.appendChild(listElement);

        let sorted = Array.from(listUl.children).sort((a, b) => a.textContent.localeCompare(b.textContent));

        while (listUl.firstChild) {
            listUl.firstChild.remove();
        }
        sorted.forEach(x => listUl.appendChild(x));

        sendButton.addEventListener('click' , (e) => {
            sendButton.remove();
            discardButton.remove();
            let listItem = document.createElement('li');
            listItem.setAttribute('class', 'gift');
            listItem.textContent = `${listElement.textContent}`;
            listElement.remove();
            senttUl.appendChild(listItem);
        });

        discardButton.addEventListener('click' , (e) => {
            sendButton.remove();
            discardButton.remove();
            let listItem = document.createElement('li');
            listItem.setAttribute('class', 'gift');
            listItem.textContent = `${listElement.textContent}`;
            listElement.remove();
            discardedUl.appendChild(listItem);
        });

        inputName.value = '';
    })
}