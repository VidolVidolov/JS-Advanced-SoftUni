const conteiner = document.getElementById('contacts');

const htmlString = document.getElementById('template').innerHTML;
Handlebars.registerPartial('contactsPartial', htmlString);

const htmlStrings = document.getElementById('templateForall').innerHTML;

// const allCards = contacts.map(contact => template(contact)).join('');
const contactsTemplate = Handlebars.compile(htmlStrings);
const allCards = contactsTemplate({ contacts });

conteiner.innerHTML = allCards;

let wholeDoc = document.getElementById('contacts');

wholeDoc.addEventListener('click', (e) => {

    if(!Array.from(e.target.classList).includes('detailsBtn')){
        return;
    }
    let parent = e.target.parentElement;
    let info = parent.querySelector('.details');
    
    if (info.style.display != 'block') {
        info.style.display = 'block';
    } else {
        info.style.display = '';
    }
}) 