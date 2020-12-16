$(() => {
    const elements = {
        scriptTemplate: () => document.getElementById('monkey-template'),
        rootDiv: () => document.querySelector('.monkeys'),
    }

    const template = Handlebars.compile(elements.scriptTemplate().innerHTML);

    const wholeHtml = template({ monkeys });
    elements.rootDiv().innerHTML = wholeHtml;

    elements.rootDiv().addEventListener('click', showMoreInfo);


    function showMoreInfo(e) {
        let button = e.target;
        if (button.tagName !== 'BUTTON') {
            return;
        }

        let paragrpah = button.parentElement.getElementsByTagName('p')[0];
        paragrpah.style.display == 'none' ? paragrpah.style.display = 'block' : paragrpah.style.display = 'none';

    }




})