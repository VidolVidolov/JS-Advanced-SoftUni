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
    let box = document.getElementById('successBox');
    box.textContent = message;
    box.parentElement.style.display = 'block';

    setTimeout(function () {
        box.parentElement.style.display = 'none';
    }, 1000)
}

export function errorFunc(message) {
    let box = document.getElementById('error');
    box.children[0].textContent = message;
    box.style.display = 'block';

    setTimeout(function () {
        box.style.display = 'none';
    }, 1000)
}