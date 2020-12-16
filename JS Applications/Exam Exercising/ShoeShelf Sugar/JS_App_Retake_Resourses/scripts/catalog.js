import { extendContext, saveUserData, getUserData } from './common.js';

const apiKey = "AIzaSyCT1aAxnRXAEILPuFHWKG74coPT6MGw8wc";

export async function home() {
    await extendContext(this);

    if (this.loggedIn) {
        let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Shoes.json`);
        let data = await res.json();
        if (data == undefined) {
            this.shoes = [];
        } else {
            this.shoes = Object.keys(data).map(id => ({ id, ...data[id] }));
            this.shoes.sort((a,b) => b.bought.length - a.bought.length)
        }
    }
    this.partial('templates/home.hbs');
}

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
    this.redirect('#/login');
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

export async function createOffer() {
    await extendContext(this);
    this.partial('templates/create.hbs');
}

export async function createOfferPost() {
    let { name, price, imageUrl, description, brand } = this.params;

    let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Shoes.json?auth=${getUserData().token}`, {
        method: 'POST',
        body: JSON.stringify({ name, price, imageUrl, description, brand, creator: getUserData().email, bought: [getUserData().email] }),
    });
    let data = await res.json();
    this.redirect('/');
}

export async function details() {
    let id = location.href.split('/')[5];
    await extendContext(this);
    let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Shoes/${id}.json`);
    let data = await res.json();
    this.shoe = data;
    this.id = id;
    if (data.creator == getUserData().email) {
        this.creator = true;
    }
    if(data.bought.includes(getUserData().email)){
        this.bought = true;
    }
    this.partial('templates/details.hbs');
}

export async function edit() {
    let id = location.href.split('/')[5];
    await extendContext(this);
    let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Shoes/${id}.json`);
    let data = await res.json();
    this.shoe = data;
    this.id = id;

    this.partial('templates/edit.hbs');
}

export async function editPost() {
    let id = location.href.split('/')[5];
    let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Shoes/${id}.json?auth=${getUserData().token}`, {
        method: 'PATCH',
        body: JSON.stringify(this.params),
    });
    this.redirect(`#/details/${id}`);
}

export async function del() {
    let id = location.href.split('/')[5];
    let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Shoes/${id}.json?auth=${getUserData().token}`, {
        method: 'DELETE',
    });
    this.redirect(`/`);
}

export async function buy() {
    let id = location.href.split('/')[5];
    let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Shoes/${id}.json`);
    let data = await res.json();

    let bought = data.bought.slice();
    bought.push(getUserData().email);

    let res1 = await fetch(`https://for-exam-prep-v2.firebaseio.com/Shoes/${id}.json?auth=${getUserData().token}`, {
        method: 'PATCH',
        body: JSON.stringify({ bought }),
    });
    this.redirect(`#/details/${id}`);

}
