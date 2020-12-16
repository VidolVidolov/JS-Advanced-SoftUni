import { extendContext, saveUserData, success, errorFunc } from './common.js';

const apiKey = "AIzaSyB1moCydcnf5B-KSXp7pBujWJqoiC2Crzc"; // to change it :)


export async function register() {
    await extendContext(this);
    this.partial('templates/register.hbs');
}

export async function registerPost() {
    let { email, password, repeatPassword } = this.params;

    if (email.length < 3 || password.length < 3) {
        errorFunc('Email is to shord or the pass is too short!');
        return;
    }
    if (password != repeatPassword) {
        errorFunc('Passwords don\'t match');
        return;
    }

    let res = fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    let data = await (await res).json();
    if (data['error'] != undefined) {
        errorFunc(data['error'].message);
        return;
    }
    saveUserData(email, data.idToken);
    success('Successfully registered!');
    this.redirect('#/dashboard');
}

export async function login() {
    await extendContext(this);
    this.partial('templates/login.hbs');
}

export async function loginPost() {

    try {
        let { email, password } = this.params;

        if (email == '' || password.length < 6) {
            errorFunc('Email should be valid and so the pass');
            return;
        }

        let res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify({ email, password, returnSecureToken: true }),
        });
        let data = await res.json();
        if (data['error'] != undefined) {
            throw new Error(data['error'].message);
        }
        saveUserData(email, data.idToken);
        success('Successfully logged!');
        this.redirect('#/dashboard');
    } catch (error) {
        errorFunc(error);
    }

}

export function logout() {
    localStorage.removeItem('user');
    success('Successfully logged out!');
    this.redirect('/');
}