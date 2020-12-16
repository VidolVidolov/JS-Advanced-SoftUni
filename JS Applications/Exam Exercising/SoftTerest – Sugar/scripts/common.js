export async function extendContext(context) {

    context.loggedIn = checkLoggedIn();
    return context.partials = {
        header: await context.load('templates/header.hbs'),
        idea: await context.load('templates/idea.hbs'),
        comment: await context.load('templates/comment.hbs'),
    };
}

export function saveUserData(email, idToken) {
    let user = {
        email,
        idToken,
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