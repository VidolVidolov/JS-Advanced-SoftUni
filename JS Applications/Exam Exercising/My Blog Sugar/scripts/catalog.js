import { extendContext, getUserData } from "./common.js";


export async function home() {
    await extendContext(this);

    if (this.loggedIn) {
        let res = await fetch('https://for-exam-prep-v2.firebaseio.com/MyBlog.json');
        let data = await res.json();
        this.posts = Object.keys(data).map(id => ({ id, ...data[id], creator: getUserData().email == data[id].creator }));
    }

    this.partial('templates/home.hbs');
}

export async function createPost() {
    let { title, category, content } = this.params;

    let obj = {
        title,
        category,
        content,
        creator: getUserData().email,
    };

    let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/MyBlog.json?auth=${getUserData().token}`, {
        method: 'POST',
        body: JSON.stringify(obj),
    });
    let data = await res.json();
    this.redirect('/');
}

export async function details() {
    let id = location.href.split('/')[5];
    await extendContext(this);
    let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/MyBlog/${id}.json`);
    let data = await res.json();
    this.data = data;
    this.id = id;

    this.partial('templates/details.hbs');
}

export async function edit() {
    await extendContext(this);
    if (this.loggedIn) {
        let res = await fetch('https://for-exam-prep-v2.firebaseio.com/MyBlog.json');
        let data = await res.json();
        this.posts = Object.keys(data).map(id => ({ id, ...data[id], creator: getUserData().email == data[id].creator }));
    }
    let id = location.href.split('/')[5];
    let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/MyBlog/${id}.json`);
    let data = await res.json();
    this.data = data;
    this.id = id;
    this.partial('templates/edit.hbs');
}

export async function editPost() {
    let id = location.href.split('/')[5];
    let { title, category, content } = this.params;
    let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/MyBlog/${id}.json?auth=${getUserData().token}`, {
        method: 'PATCH',
        body: JSON.stringify({ title, category, content }),
    });
    this.redirect('/');
}

export async function del() {
    let id = location.href.split('/')[5];
    let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/MyBlog/${id}.json?auth=${getUserData().token}`, {
        method: 'DELETE'
    });
    this.redirect('/');
}