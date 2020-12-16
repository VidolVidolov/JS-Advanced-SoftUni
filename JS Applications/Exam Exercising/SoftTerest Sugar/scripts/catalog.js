import { extendContext, getUserData, success, errorFunc } from './common.js';

export async function home() {
    await extendContext(this);
    this.partial('templates/home.hbs');
}

export async function dashboard() {
    await extendContext(this);
    let res = await fetch('https://exam-prep-v3-default-rtdb.firebaseio.com/SoftTerest.json');
    let data = await res.json();

    this.ideas = Object.keys(data).map(id => ({ id, ...data[id] }));
    this.ideas.sort((a, b) => b.likes - a.likes);
    this.partial('templates/dashboard.hbs');
}

export async function create() {
    await extendContext(this);
    this.partial('templates/create.hbs');
}

export async function createPost() {
    let { title, description, imageUrl } = this.params;

    if (title.length < 6 || description.length < 10) {
        errorFunc('Title length should be more than 6 symbols and the description lenght should be more than 10 symbols!');
        return;
    }
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {

    } else {
        errorFunc('The image link shoul start with either http:// or https://');
        return;
    }

    let obj = {
        title,
        description,
        imageUrl,
        creator: getUserData().email,
        likes: 0,
        comments: [0],
    };

    let res = await fetch(`https://exam-prep-v3-default-rtdb.firebaseio.com/SoftTerest.json?auth=${getUserData().token}`, {
        method: 'POST',
        body: JSON.stringify(obj),
    })
    let data = await res.json();
    if (data['error'] != undefined) {
        errorFunc(data['error'].message);
        return;
    } else {
        success('Successfully created idea!');
    }
    let title1 = document.getElementById('title');
    title1.value = '';
    let description1 = document.getElementById('description');
    description1.value = '';
    let image = document.getElementById('imageUrl');
    image.value = '';
}

export async function details() {
    let id = location.href.split('/').pop();
    await extendContext(this);
    let res = await fetch(`https://exam-prep-v3-default-rtdb.firebaseio.com/SoftTerest/${id}.json`);
    let data = await res.json();
    this.data = data;
    this.id = id;
    this.comments = data.comments.filter(x => x != 0);
    if (data.creator == getUserData().email) {
        this.creator = true;
    }
    this.partial('templates/details.hbs');
}

export async function commentPost() {
    let { newComment } = this.params;
    let response = await fetch(`https://exam-prep-v3-default-rtdb.firebaseio.com/SoftTerest/${this.params.id}.json`);
    let data = await response.json();
    let comments = data.comments;
    let comment = {
        creator: getUserData().email,
        comment: newComment,
    }
    comments.push(comment);

    let res = await fetch(`https://exam-prep-v3-default-rtdb.firebaseio.com/SoftTerest/${this.params.id}.json?auth=${getUserData().token}`, {
        method: 'PATCH',
        body: JSON.stringify({ comments }),
    });
    let data1 = await res.json();
    if (data1['error'] != undefined) {
        errorFunc(data['error'].message);
        return;
    }
    success('Successfully commented idea!');
    this.redirect(`#/details/${this.params.id}`);
}

export async function like() {
    let response = await fetch(`https://exam-prep-v3-default-rtdb.firebaseio.com/SoftTerest/${this.params.id}.json`);
    let data = await response.json();

    let likes = data.likes;
    likes++;

    let res = await fetch(`https://exam-prep-v3-default-rtdb.firebaseio.com/SoftTerest/${this.params.id}.json?auth=${getUserData().token}`, {
        method: 'PATCH',
        body: JSON.stringify({ likes }),
    });
    let data1 = await res.json();
    if (data1['error'] != undefined) {
        errorFunc(data['error'].message);
        return;
    }
    success('Successfully liked idea!');
    this.redirect(`#/details/${this.params.id}`);
}

export async function del() {
    let res = await fetch(`https://exam-prep-v3-default-rtdb.firebaseio.com/SoftTerest/${this.params.id}.json?auth=${getUserData().token}`, {
        method: 'DELETE',
    });
    success('Successfully deleted idea!');
    this.redirect('#/dashboard');
}

export async function profile() {
    await extendContext(this);
    this.email = getUserData().email;

    let res = await fetch(`https://exam-prep-v3-default-rtdb.firebaseio.com/SoftTerest.json`);
    let data = await res.json();
    let keysForUserIdeas = Object.keys(data).filter(x => data[x].creator == getUserData().email);
    this.ideas = keysForUserIdeas.map(key => data[key].title);
    this.ideasNumber = this.ideas.length;

    this.partial('templates/profile.hbs');
}