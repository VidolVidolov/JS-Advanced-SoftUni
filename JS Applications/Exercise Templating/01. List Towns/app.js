function printAllTowns() {

    const elements = {
        input: () => document.getElementById('towns'),
        button: () => document.getElementById('btnLoadTowns'),
        root: () => document.getElementById('root'),
    }

    elements.button().addEventListener('click', handler);

    function handler(e) {
        e.preventDefault();
        let info = elements.input().value;
        let towns = info.split(/[, ]+/g).map(x => { return { town: x } });
        getTemplate()
            .then(skeleton => {
                let template = Handlebars.compile(skeleton);
                let finishedHTML = template({ towns });

                elements.root().innerHTML = finishedHTML;
            })
    }


    function getTemplate() {
        return fetch('./template.hbs').then(res => res.text());
    }

}

printAllTowns();