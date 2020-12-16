import { extendContext, getUserData } from './common.js';

export function getCreate(context) {
    extendContext(context)
        .then(function () {
            this.partial('templates/create.hbs');
        })
}


export function postCreate(context) {
    let { title, description, imageURL } = context.params;
    let creator = getUserData().email;
    let idea = {
        title,
        description,
        imageUrl: imageURL,
        creator,
        likes: 0,

    };

    fetch(`https://for-exampreps.firebaseio.com/ideas.json`, {
        method: 'POST',
        body: JSON.stringify(idea),
    })
        .then(res => {
            this.redirect('/');
        })
}

export function details(context) {
    let id = location.href.split('/')[5];
    let user = getUserData().email;
    fetch(`https://for-exampreps.firebaseio.com/ideas/${id}.json`)
        .then(res => res.json())
        .then(data => {
            context.creator = user == data.creator;
            context.id = id;
            context.data = data;
            extendContext(context)
                .then(function () {
                    this.partial('templates/details.hbs');
                })
        })

}

export function del(context) {
    let id = location.href.split('/')[5];
    fetch(`https://for-exampreps.firebaseio.com/ideas/${id}.json`, {
        method: 'DELETE',
    })
        .then(res => {
            this.redirect('/');
        })
}

export function like(context) {
    let id = location.href.split('/')[5];
    let likes = 0;
    fetch(`https://for-exampreps.firebaseio.com/ideas/${id}.json`)
        .then(res => res.json())
        .then(data => {
            likes = data.likes;
            likes++;
            fetch(`https://for-exampreps.firebaseio.com/ideas/${id}.json`, {
                method: 'PATCH',
                body: JSON.stringify({ likes })
            })
                .then(res => {
                    this.redirect(`#/details/${id}`);
                })
        })
}

export function comment(context) {
    let { newComment } = context.params;
    console.log(context);
    let id = location.href.split('/')[5];
    fetch(`https://for-exampreps.firebaseio.com/ideas/${id}.json`)
        .then(res => res.json())
        .then(data => {
            let comments = [];
            if (data.comments == undefined) {
                comments.push(newComment);
            } else {
                data.comments.push(newComment);
                comments = data.comments;
            }
            fetch(`https://for-exampreps.firebaseio.com/ideas/${id}.json`, {
                method: 'PATCH',
                body: JSON.stringify({ comments })
            })
                .then(res => {
                    this.redirect(`#/details/${id}`);
                })
        })
}

export function profile(context) {
    extendContext(context)
        .then(function () {
            this.partial('templates/profile.hbs');
        })
}

export async function home(context) {

    let res = await fetch('https://for-exampreps.firebaseio.com/ideas.json');
    let data = await res.json();

    if (data == null) {
        context.ideas = [];
    } else {
        context.ideas = Object.keys(data).map(id => ({ id, ...data[id] }));
    }
    await extendContext(context);
    this.partial('templates/homeGuest.hbs');
}