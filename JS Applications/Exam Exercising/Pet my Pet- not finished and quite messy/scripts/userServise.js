import { extendContext, saveUserData } from './common.js'

let apiKey = "AIzaSyCT1aAxnRXAEILPuFHWKG74coPT6MGw8wc";

export async function getRegister(context) {
    await extendContext(context);
    this.partial('templates/register.hbs');
}

export async function postRegister() {
    let { email, password } = this.params;
    let user = { email, password }
    let res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify(user),
        returnSecureToken: true,
    });
    let data = await res.json();
    saveUserData(data.email, data.idToken);
    this.redirect('/');
}


export async function getLogin(context) {
    await extendContext(context);
    this.partial('templates/login.hbs');
}


export async function postLogin() {
    let { email, password } = this.params;
    let user = { email, password }
    let res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify(user),
        returnSecureToken: true,
    });
    let data = await res.json();
    saveUserData(data.email, data.idToken);
    this.redirect('/');
}

export function logout(){
    localStorage.removeItem('user');
    this.redirect('/');
}