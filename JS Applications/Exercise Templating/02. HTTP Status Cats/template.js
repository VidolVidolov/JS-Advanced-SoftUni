function renderCatTemplate() {
    let elements = {
        section: () => document.getElementById('allCats'),
    };

    Promise.all([
        getSkeleton('./catSkeleton.hbs'),
        getSkeleton('./catsSkeleton.hbs')
    ])
        .then(([singleCat, allCats]) => {
            Handlebars.registerPartial('cat', singleCat)
            let template = Handlebars.compile(allCats);
            let finishedSkeleton = template({ cats });
            elements.section().innerHTML = finishedSkeleton;
        })
        .catch(err => console.log(err));

    elements.section().addEventListener('click', buttonHandler);
}

function buttonHandler(e) {
    let button = e.target;
    if (button.className != 'showBtn') {
        return;
    }
    let parentOfTheButton = button.parentElement;
    let divToManipulate = parentOfTheButton.querySelector('.status');

    if (divToManipulate.style.display == 'none') {
        divToManipulate.style.display = 'block';
        button.innerText = 'Hide status code';
    } else {
        divToManipulate.style.display = 'none';
        button.innerText = 'Show status code';
    }
}

function getSkeleton(templateLocation) {
    return fetch(templateLocation).then(res => res.text());
}

renderCatTemplate();
