export async function extendContext(context) {
    context.loggedIn = checkLoggedIn();
    if (context.loggedIn == true) {
        context.email = getUserData().email;
    }

    return context.partials = {
        header: await context.load('templates/header.hbs'),
        footer: await context.load('templates/footer.hbs'),
        destination: await context.load('templates/destination.hbs'),
        myDestination: await context.load('templates/myDestination.hbs'),

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

export function success(message) {
    let box = document.getElementsByClassName('infoBox')[0];
    box.textContent = message;
    box.style.display = 'block';

    setTimeout(function () {
        box.style.display = 'none';
    }, 3000)
}

export function errorFunc(message) {
    let box = document.getElementsByClassName('errorBox')[0];
    box.textContent = message;
    box.style.display = 'block';

    setTimeout(function () {
        box.style.display = 'none';
    }, 3000)
}