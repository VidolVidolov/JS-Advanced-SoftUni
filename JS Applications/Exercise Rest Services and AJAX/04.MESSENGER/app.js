function attachEvents() {
    const url = 'https://rest-messanger.firebaseio.com/messanger.json';
    let authorInput = document.getElementById('author');
    let messageInput = document.getElementById('content');
    let sendButton = document.getElementById('submit');
    let refreshButton = document.getElementById('refresh');
    let textArea = document.getElementById('messages');


    sendButton.addEventListener('click', sendMessage);
    refreshButton.addEventListener('click', () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                textArea.textContent = ''; // so when refresh is clicked the text area refreshes :)
               let keys = Object.keys(data);
               [...keys].forEach(x => textArea.textContent += `${data[x].author}: ${data[x].content}\n`);
            });
    })

    function sendMessage() {
        let obj = {
            author: authorInput.value,
            content: messageInput.value,
        };
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
        });

        authorInput.value = '';
        messageInput.value = '';
    }
}


attachEvents();