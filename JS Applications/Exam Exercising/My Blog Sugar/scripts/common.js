export async function extendContext(context) {
    context.loggedIn = checkLoggedIn();
    if (context.loggedIn == true) {
        context.email = getUserData().email;
    }

    return context.partials = {
        header: await context.load('templates/header.hbs'),
        post: await context.load('templates/post.hbs'),
        // edit: await context.load('templates/edit.hbs'),
    }
}

export function saveUserData(email, token) {
    let user = {
        email,
        token,
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
    let { email, token } = JSON.parse(localStorage.getItem('user'));
    return {
        email,
        token,
    }
}