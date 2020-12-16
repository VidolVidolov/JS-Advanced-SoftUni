export function extendContext(context) {

    context.loggedIn = checkLoggedIn();
    return context.loadPartials({
        'header': 'templates/header.hbs',
        'javaScriptPartial': 'templates/jsArticles.hbs',
        'csharpPartial': 'templates/cSharpArticles.hbs',
        'javaPartial': 'templates/javaArticles.hbs',
        'pytonPartial': 'templates/pytonArticles.hbs',
    })
}

export function saveUserData(email, id) {
    let user = {
        email,
        id,
    };
    localStorage.setItem('user', JSON.stringify(user));
}

export function checkLoggedIn() {
    let loggedIn = false;
    if (localStorage.getItem('user') != undefined) {
        loggedIn = true;
    }
    return loggedIn;
}

export function getUserData() {
    let { email, id } = JSON.parse(localStorage.getItem('user'));
    return {
        email,
        id,
    }
}