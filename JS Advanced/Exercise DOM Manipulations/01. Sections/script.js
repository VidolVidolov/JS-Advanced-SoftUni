function create(words) {
   let innerDiv = document.getElementById('content');

   words.forEach(x => {
      let div = document.createElement('div');
      let paragraph = document.createElement('p');
      div.addEventListener('click', () => {
         paragraph.style.display = 'block';
      });
      paragraph.style.display = 'none';
      paragraph.innerText = x;
      div.appendChild(paragraph);
      innerDiv.appendChild(div);
   });
}