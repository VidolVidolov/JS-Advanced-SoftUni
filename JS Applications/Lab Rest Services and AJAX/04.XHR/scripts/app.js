function loadRepos() {
   let div = document.getElementById('res');
   let url = 'https://api.github.com/users/testnakov/repos';
   const httpRequest = new XMLHttpRequest();

   httpRequest.addEventListener('loadend', () => {
      div.innerText = httpRequest.responseText;
   });

   httpRequest.open('GET', url);
   httpRequest.send();
}