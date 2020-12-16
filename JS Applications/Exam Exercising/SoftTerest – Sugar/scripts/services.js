import { extendContext, saveUserData } from './common.js'

const apiKey = 'AIzaSyBR6c66U3hFuaZq7aWtdjFkUqELlcZS3-o';

export async function getRegister(context) {

    await extendContext(context)
    this.partial('templates/register.hbs');

}

export async function postRegister() {
    try {
        let { username, password, repeatPassword } = this.params;

        if (username.lenght < 3 || password.lenght < 3) {
            return;
        }

        if (password !== repeatPassword) {
            return;
        }
        let res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify({
                email: username,
                password,
            })
        })
        let data = res.json();
        saveUserData(data.email, data.idToken);
        this.redirect('/');

    } catch (error) {
        console.log(error);
    }


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