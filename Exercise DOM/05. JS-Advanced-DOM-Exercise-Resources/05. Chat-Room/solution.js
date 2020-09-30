function solve() {
   let button = document.getElementById('send');

   button.addEventListener('click', () => {
      let inputElement = document.getElementById('chat_input');
      let myMessage = document.createElement('div');
      myMessage.setAttribute('class', 'message my-message');
      let msg = inputElement.value;
      myMessage.innerHTML = msg;
      let chatBox = document.getElementById('chat_messages');
      chatBox.appendChild(myMessage);
      inputElement.value = '';
      inputElement.placeholder = "Enter your message here...";
   })
}


