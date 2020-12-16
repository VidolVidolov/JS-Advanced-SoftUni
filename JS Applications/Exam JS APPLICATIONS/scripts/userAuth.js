import { errorFunc, extendContext, saveUserData, success } from './common.js';

const apiKey = "AIzaSyBLnF1bl_BE8Nc5YdJTgvhUAzVsnN0jOms"; // to change it :)


export async function register() {
    await extendContext(this);
    this.partial('templates/register.hbs');
}

export async function registerPost() {
    let { email, password, rePassword } = this.params;

    if (email == '' || password == '' || !email.includes('@')) {
        errorFunc('Invalid mail or password');
        return;
    }
    if (password != rePassword) {
        errorFunc('Passwords don\'t match!');
        return;
    }

    let res = fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    let data = await (await res).json();
    if(data['error'] != undefined){
        errorFunc(data['error'].message);
        return;
    }
    saveUserData(email, data.idToken);
    let mail = document.getElementById('email');
    let pass = document.getElementById('password');
    let rePass = document.getElementById('rePassword');

    mail.value = '';
    pass.value = '';
    rePass.value = '';
    success('User registration successful.');
    this.redirect('/');
}

export async function login() {
    await extendContext(this);
    this.partial('templates/login.hbs');
}

export async function loginPost() {
    let { email, password } = this.params;

    if (email == '' || password == '' || !email.includes('@')) {
        errorFunc('Invalid mail or password');
        return;
    }

    let res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    let data = await res.json();
    if(data.idToken == undefined){
        errorFunc('Check your password again!')
        return;
    }
    saveUserData(email, data.idToken);

    let mail = document.getElementById('email');
    let pass = document.getElementById('password');

    mail.value = '';
    pass.value = '';
    success('Login successful.');
    this.redirect('/');
}

export function logout() {
    localStorage.removeItem('user');
    success('Logout successful.');
    this.redirect('#/login');
}