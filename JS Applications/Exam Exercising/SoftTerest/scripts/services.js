import { extendContext, saveUserData } from './common.js'

const apiKey = 'AIzaSyBR6c66U3hFuaZq7aWtdjFkUqELlcZS3-o';

export function getRegister(context) {

    extendContext(context)
        .then(function () {
            this.partial('templates/register.hbs');
        })
}

export function postRegister(context) {
    let { username, password, repeatPassword } = context.params;

    if (username.lenght < 3 || password.lenght < 3) {
        return;
    }

    if (password !== repeatPassword) {
        return;
    }

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email: username,
            password,
        })
    })
        .then(res => res.json())
        .then(data => {
            saveUserData(username, data.idToken);
            this.redirect('/');
        })
}

export function getLogin(context) {
    extendContext(context)
        .then(function () {
            this.partial('templates/login.hbs');
        })
}

export function postLogin(context) {
    let { username, password } = context.params;

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email: username,
            password,
        })
    })
        .then(res => res.json())
        .then(data => {
            saveUserData(data.email, data.idToken);
            this.redirect('/');
        })
}

export function logout(context) {
    localStorage.removeItem('user');
    this.redirect('/');
}