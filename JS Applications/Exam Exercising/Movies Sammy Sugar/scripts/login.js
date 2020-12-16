import {success, errorFunc, saveUserData} from './common.js';
const apiKey = 'AIzaSyCT1aAxnRXAEILPuFHWKG74coPT6MGw8wc';

export async function login() {
    let { email, password } = this.params;
    let res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    let data = await res.json();

    if (data.hasOwnProperty('error')) {
        errorFunc(data.error.message);
        return;
    }
    success('Successfully logged in!');
    saveUserData(data.email, data.idToken);
    this.redirect('/');
}