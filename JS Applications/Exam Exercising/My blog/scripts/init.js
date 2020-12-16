
export const extendContext = function extendContext(context) {
    context.loggedIn = checkLoggedIn();

    if (!!context.loggedIn) {
        context.email = getUserData().email;
    }

    return context.loadPartials({
        'header': 'templates/header.hbs',
        'post': 'templates/post.hbs',
    })
}

export const saveUserData = function saveUserData(email, id) {
    let user = {
        email,
        id,
    };
    localStorage.setItem('user', JSON.stringify(user));
}

export const checkLoggedIn = function checkLoggedIn() {
    let loggedIn = false;
    if (localStorage.getItem('user') != undefined) {
        loggedIn = true;
    }
    return loggedIn;
}

export const getUserData = function getUserData() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!!user) {
        let { email, id } = user;
    } else {
        user = '';
    }
    return user;
}