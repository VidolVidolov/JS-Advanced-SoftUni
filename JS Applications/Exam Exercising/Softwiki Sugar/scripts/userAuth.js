import { extendContext, saveUserData } from './common.js';

const apiKey = "AIzaSyB1moCydcnf5B-KSXp7pBujWJqoiC2Crzc"; // to change it :)


export async function register() {
    await extendContext(this);
    this.partial('templates/register.hbs');
}

export async function registerPost() {
    let { email, password, rePassword } = this.params;

    if (email == '' || password.length < 6) {
        return;
    }
    if (password != rePassword) {
        return;
    }

    let res = fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    let data = await (await res).json();

    saveUserData(email, data.idToken);
    this.redirect('/');
}

export async function login() {
    await extendContext(this);
    this.partial('templates/login.hbs');
}

export async function loginPost() {
    let { email, password } = this.params;

    if (email == '' || password.length < 6) {
        return;
    }

    let res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    let data = await res.json();

    saveUserData(email, data.idToken);
    this.redirect('/');
}

export function logout() {
    localStorage.removeItem('user');
    this.redirect('/');
}