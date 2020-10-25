function notify(message) {
    let msg = document.getElementById('notification');
    msg.innerText = message;
    msg.style.display = 'block';
    setTimeout(() => {
        msg.style.display = 'none';
    },2000)
}