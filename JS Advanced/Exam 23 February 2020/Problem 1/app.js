function solve() {
   let authorInput =document.querySelector('#creator');
   let titleInput =document.querySelector('#title');
   let categoryInput =document.querySelector('#category');
   let contentInput = document.querySelector('#content');
   let buttonCreate = document.querySelector('.btn.create');
   let siteContnetSection = document.querySelector('main > section');
   let archiveSection = document.querySelector('.archive-section > ul');

   buttonCreate.addEventListener('click', (e) => {
      e.preventDefault();
      let article = document.createElement('article'); // article to attach to Articles section
      let heading = document.createElement('h1');
      heading.textContent = safe_tags(titleInput.value);
      let paragraphCategory = document.createElement('p');
      paragraphCategory.innerHTML = `Category: <strong>${safe_tags(`${categoryInput.value}`)}</strong>`;
      let paragraphCreator = document.createElement('p');
      paragraphCreator.innerHTML = `Creator: <strong>${safe_tags(authorInput.value)}</strong>`;
      let paragraphContent = document.createElement('p');
      paragraphContent.textContent = contentInput.value;

      article.appendChild(heading);
      article.appendChild(paragraphCategory);
      article.appendChild(paragraphCreator);
      article.appendChild(paragraphContent);

      let divForButtons = document.createElement('div');
      divForButtons.setAttribute('class', 'buttons');
      let deleteButton = document.createElement('button');
      deleteButton.setAttribute('class', 'btn delete');
      deleteButton.innerText = 'Delete';
      let archiveButton = document.createElement('button');
      archiveButton.setAttribute('class', 'btn archive');
      archiveButton.innerText = 'Archive';

      divForButtons.appendChild(deleteButton);
      divForButtons.appendChild(archiveButton);

      article.appendChild(divForButtons);

      siteContnetSection.appendChild(article);

      archiveButton.addEventListener('click', (e) => {
         article.remove();
         let listElement = document.createElement('li');
         listElement.textContent = `${heading.textContent}`;
         archiveSection.appendChild(listElement);

         let sort = Array.from(archiveSection.children).sort((a, b) => {
            let A = a.textContent;
            let B = b.textContent;
            return A.localeCompare(B);
         });

         while(archiveSection.firstChild){
            archiveSection.firstChild.remove();
         }
         sort.forEach(x => archiveSection.appendChild(x));
      });

      deleteButton.addEventListener('click', (e) => {
         article.remove();
      })
   })

   function safe_tags(str) {
      return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
  }
}
