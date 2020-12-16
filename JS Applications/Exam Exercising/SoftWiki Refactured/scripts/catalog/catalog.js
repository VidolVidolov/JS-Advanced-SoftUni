import { extendContext, getUserData } from '../Helpers/helpers.js';

export function home(context) {

    fetch('https://for-exampreps.firebaseio.com/Wiki.json')
        .then(res => res.json())
        .then(data => {
            context.js = [];
            context.cSharp = [];
            context.java = [];
            context.pyton = [];
            Object.keys(data).forEach(key => {
                let info = data[key];
                let obj = { key, ...data[key] };
                if (info.category == 'JavaScript') {
                    context.js.push(obj);
                } else if (info.category == 'cSharp') {
                    context.cSharp.push(obj);
                } else if (info.category == 'Java') {
                    context.java.push(obj);
                } else if (info.category == 'Pyton') {
                    context.pyton.push(obj);
                }
            })
            extendContext(context)
                .then(function () {
                    this.partial('templates/home.hbs');
                })
        })

}


export function getCreatePost(context) {

    extendContext(context)
        .then(function () {
            this.partial('templates/create.hbs');
        })
}

export function postCreatePost(context) {
    let { title, category, content } = context.params;
    let user = getUserData().email;
    let obj = {
        title,
        category,
        content,
        creator: user,
    };

    fetch('https://for-exampreps.firebaseio.com/Wiki.json', {
        method: 'POST',
        body: JSON.stringify(obj),
    })
        .then(res => {
            this.redirect('#/home');
        })
}

export function getDetails(context) {
    let id = location.href.split('/')[5];

    fetch(`https://for-exampreps.firebaseio.com/Wiki/${id}.json`)
        .then(res => res.json())
        .then(data => {
            context.data = data;
            context.id = id;
            context.creator = getUserData().email == data.creator;
            extendContext(context)
                .then(function () {
                    this.partial('templates/details.hbs');
                })
        })

}

export function getEdit(context) {
    let id = location.href.split('/')[5];

    fetch(`https://for-exampreps.firebaseio.com/Wiki/${id}.json`)
        .then(res => res.json())
        .then(data => {
            context.data = data;
            context.id = id;
            extendContext(context)
                .then(function () {
                    this.partial('templates/edit.hbs');
                })
        })
}

export function postEdit(context) {
    let id = location.href.split('/')[5];

    let { title, category, content } = context.params;
    let obj = {
        title,
        category,
        content,
    }
    fetch(`https://for-exampreps.firebaseio.com/Wiki/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify(obj),
    })
        .then(res => {
            this.redirect(`#/details/${id}`);
        })
}

export function del(context) {
    let id = location.href.split('/')[5];
    fetch(`https://for-exampreps.firebaseio.com/Wiki/${id}.json`, {
        method: 'DELETE',
    })
        .then(res => this.redirect('#/home'));
}