import { extendContext, getUserData } from './common.js';

export async function home() {
    await extendContext(this);
    if (this.loggedIn) {
        let res = await fetch('https://exam-prep-v3-default-rtdb.firebaseio.com/SoftWiki.json');
        let data = await res.json();

        this.js = [];
        this.cSharp = [];
        this.java = [];
        this.pyton = [];

        Object.keys(data).forEach(id => {
            let info = data[id];

            if (info.category == 'JAVASCRIPT') {
                this.js.push({ id, ...info });
            } else if (info.category == 'C#') {
                this.cSharp.push({ id, ...info });
            } else if (info.category == 'JAVA') {
                this.java.push({ id, ...info });
            } else if (info.category == 'PYTON') {
                this.pyton.push({ id, ...info });
            }
        });

        this.js.sort((a,b) => b.title.localeCompare(a.title));
        this.cSharp.sort((a,b) => b.title.localeCompare(a.title));
        this.java.sort((a,b) => b.title.localeCompare(a.title));
        this.pyton.sort((a,b) => b.title.localeCompare(a.title));

        this.partial('templates/home.hbs');
    } else {
        this.partial('templates/register.hbs');
    }
}

export async function create() {
    await extendContext(this);
    this.partial('templates/create.hbs');
}

export async function createPost() {
    let { title, category, content } = this.params;

    let obj = {
        title,
        category: category.toUpperCase(),
        content,
        creator: getUserData().email,
    };

    let res = await fetch(`https://exam-prep-v3-default-rtdb.firebaseio.com/SoftWiki.json?auth=${getUserData().token}`, {
        method: 'POST',
        body: JSON.stringify(obj),
    });

    this.redirect('/');
}

export async function details() {
    let id = location.href.split('/').pop();
    await extendContext(this);

    let res = await fetch(`https://exam-prep-v3-default-rtdb.firebaseio.com/SoftWiki/${id}.json`);
    let data = await res.json();
    if (getUserData().email == data.creator) {
        this.creator = true;
    } else {
        this.creator = false;
    }
    this.data = data;
    this.id = id;

    this.partial('templates/details.hbs');
}

export async function edit() {
    let id = location.href.split('/').pop();
    await extendContext(this);

    let res = await fetch(`https://exam-prep-v3-default-rtdb.firebaseio.com/SoftWiki/${id}.json`);
    let data = await res.json();
    
    this.data = data;
    this.id = id;

    this.partial('templates/edit.hbs');
}

export async function editPost() {
    let id = location.href.split('/').pop();
    let { title, category, content } = this.params;

    let obj = {
        title,
        category: category.toUpperCase(),
        content,
    };

    let res = await fetch(`https://exam-prep-v3-default-rtdb.firebaseio.com/SoftWiki/${id}.json?auth=${getUserData().token}`, {
        method: 'PATCH',
        body: JSON.stringify(obj),
    });

    this.redirect(`/`);
}

export async function del(){
    let id = location.href.split('/').pop();
    let res = await fetch(`https://exam-prep-v3-default-rtdb.firebaseio.com/SoftWiki/${id}.json?auth=${getUserData().token}`, {
        method: 'DELETE',
    });
    this.redirect('/');
}