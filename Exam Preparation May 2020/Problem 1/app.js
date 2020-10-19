function solve() {
    let allSections = document.querySelectorAll('section');
    let openSection = allSections.item(1);
    let inProgressSection = allSections.item(2);
    let completeSection = allSections.item(3);

    let form = document.getElementsByTagName('form').item(0);

    let openDiv = openSection.lastElementChild;
    let proGdiv = inProgressSection.lastElementChild;
    let completeDiv = completeSection.lastElementChild;

    let taskField = form.querySelector('#task');
    let descriptionField = form.querySelector('#description');
    let dateField = form.querySelector('#date');
    let addbutton = form.querySelector('#add');


    addbutton.addEventListener('click', handler);

    function handler(e) {
        e.preventDefault();
        if (taskField.value.length > 0 && descriptionField.value.length > 0 && dateField.value.length > 0) {
            let article = document.createElement('article');
            let h3 = document.createElement('h3');
            h3.textContent = taskField.value.trim();
            let p1 = document.createElement('p');
            p1.textContent = `Description: ${descriptionField.value.trim()}`;
            let p2 = document.createElement('p');
            p2.textContent = `Due Date: ${dateField.value.trim()}`;
            let div = document.createElement('div');
            div.setAttribute('class', 'flex');

            article.appendChild(h3);
            article.appendChild(p1);
            article.appendChild(p2);
            article.appendChild(div);

            let startButton = document.createElement('button');
            startButton.setAttribute('class', 'green');
            startButton.innerText = 'Start';

            let deleteButton = document.createElement('button');
            deleteButton.setAttribute('class', 'red');
            deleteButton.innerText = 'Delete';

            let finishButton = document.createElement('button');
            finishButton.setAttribute('class', 'orange');
            finishButton.innerText = 'Finish';

            article.lastElementChild.appendChild(startButton);
            article.lastElementChild.appendChild(deleteButton);

            let articleDiv = article.getElementsByClassName('flex').item(0);
            startButton.addEventListener('click', () => {
                startButton.remove();
                articleDiv.appendChild(finishButton);
                proGdiv.appendChild(article);
            });
            deleteButton.addEventListener('click', () => {
                article.remove();
            });
            finishButton.addEventListener('click', () => {
                article.lastElementChild.remove();
                completeDiv.appendChild(article);
            })

            openDiv.appendChild(article);

        }
    }
}
