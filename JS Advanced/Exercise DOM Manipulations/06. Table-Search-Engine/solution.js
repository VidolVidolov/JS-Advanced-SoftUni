function solve() {
   let button = document.getElementById('searchBtn');
   button.addEventListener('click', handler);

   function handler() {
      let tbodyElements = document.getElementsByTagName('tbody')[0].children;
      let inputText = document.getElementById('searchField');
      Array.from(tbodyElements).forEach(tr => {
         tr.className = '';
         if (tr.innerText.includes(inputText.value)) {
            tr.className = 'select';
         }
      })
      inputText.value = '';
   }
}