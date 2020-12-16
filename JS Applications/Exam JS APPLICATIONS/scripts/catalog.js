import { errorFunc, extendContext, getUserData, success } from './common.js';


export async function home() {
    await extendContext(this);
    let res = await fetch(`https://exam-softuni-9169d-default-rtdb.firebaseio.com/Destinations.json`);
    let data = await res.json();

    this.destinations = Object.keys(data).map(id => ({ id, ...data[id] }));
    this.partial('templates/home.hbs');
}

export async function addDestination() {
    await extendContext(this);
    this.partial('templates/create.hbs');
}

export async function addPost() {
    let { destination, city, duration, departureDate, imgUrl } = this.params;

    if (destination == '' || city == '' || duration == '' || departureDate == '' || imgUrl == '') {
        errorFunc('Fill in all the fields!')
        return;
    }

    let obj = {
        destination,
        city,
        duration,
        departureDate,
        imgUrl,
        creator: getUserData().email,
    };

    let res = await fetch(`https://exam-softuni-9169d-default-rtdb.firebaseio.com/Destinations.json?auth=${getUserData().token}`, {
        method: 'POST',
        body: JSON.stringify(obj),
    });
    let data = await res.json();
    if (data['error'] != undefined) {
        errorFunc(data['error'].message);
        return;
    }
    success('Successfully added destination!');
    this.redirect('/');
}

export async function details() {
    let id = location.href.split('/').pop();
    await extendContext(this);

    let res = await fetch(`https://exam-softuni-9169d-default-rtdb.firebaseio.com/Destinations/${id}.json`);
    let data = await res.json();
    if (data.creator === getUserData().email) {
        this.creator = true;
    }
    this.data = data;
    this.id = id;
    this.partial('templates/details.hbs');
}

export async function edit() {
    let id = location.href.split('/').pop();
    await extendContext(this);

    let res = await fetch(`https://exam-softuni-9169d-default-rtdb.firebaseio.com/Destinations/${id}.json`);
    let data = await res.json();
    if (data['error'] != undefined) {
        errorFunc(data['error'].message);
        return;
    }
    this.data = data;
    this.id = id;
    this.partial('templates/edit.hbs');
}

export async function editPost() {
    let id = location.href.split('/').pop();
    let { destination, city, duration, departureDate, imgUrl } = this.params;

    if (destination == '' || city == '' || duration == '' || departureDate == '' || imgUrl == '') {
        return;
    }

    let obj = {
        destination,
        city,
        duration,
        departureDate,
        imgUrl,
    };

    let res = await fetch(`https://exam-softuni-9169d-default-rtdb.firebaseio.com/Destinations/${id}.json?auth=${getUserData().token}`, {
        method: 'PATCH',
        body: JSON.stringify(obj),
    });
    let data = await res.json();
    success('Successfully edited destination!');
    this.redirect(`#/details/${id}`);
}

export async function myDestinations() {
    let res = await fetch(`https://exam-softuni-9169d-default-rtdb.firebaseio.com/Destinations.json`);
    let data = await res.json();

    this.destinations = Object.keys(data).map(id => ({ id, ...data[id] }));
    this.destinations = this.destinations.filter(x => x.creator == getUserData().email);
    await extendContext(this);
    this.partial('templates/dashboard.hbs');
}

export async function del() {
    let id = location.href.split('/').pop();
    let res = await fetch(`https://exam-softuni-9169d-default-rtdb.firebaseio.com/Destinations/${id}.json?auth=${getUserData().token}`, {
        method: 'DELETE',
    });
    success('Successfully deleted the destination!');
    this.redirect('#/myDestinations');
}